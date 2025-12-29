import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Button from "common/components/Button";
import {
  LeadsSection,
  LeadsHeader,
  LeadsTable,
  LeadsRow,
} from "../LeadsData/leadsData.style";

const PlanRow = styled(LeadsRow)`
  grid-template-columns: 0.8fr 1.5fr 1fr 1fr 1.2fr 0.8fr 1.2fr;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #95bf47;
    border-radius: 4px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid rgba(15, 35, 52, 0.08);

  h3 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: #0d0d0d;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #0d0d0d;
  }
`;

const FormSection = styled.div`
  margin-bottom: 28px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #0d0d0d;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(15, 35, 52, 0.1);
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  ${(props) => props.fullWidth && "grid-column: 1 / -1;"}
`;

const FormLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #0d0d0d;
  margin-bottom: 8px;

  .required {
    color: #dc3545;
    margin-left: 2px;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid rgba(15, 35, 52, 0.15);
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #95bf47;
    box-shadow: 0 0 0 3px rgba(149, 191, 71, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid rgba(15, 35, 52, 0.15);
  border-radius: 8px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #95bf47;
    box-shadow: 0 0 0 3px rgba(149, 191, 71, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid rgba(15, 35, 52, 0.15);
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #95bf47;
    box-shadow: 0 0 0 3px rgba(149, 191, 71, 0.1);
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: rgba(149, 191, 71, 0.05);
  border-radius: 8px;
  border: 1.5px solid rgba(149, 191, 71, 0.2);

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #95bf47;
  }

  label {
    margin: 0;
    cursor: pointer;
    font-weight: 500;
  }
`;

const BenefitsList = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BenefitItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1.5px solid rgba(15, 35, 52, 0.1);
  transition: all 0.2s;

  &:hover {
    border-color: #95bf47;
    background: #fafbfc;
  }
`;

const BenefitInput = styled(FormInput)`
  flex: 1;
  margin: 0;
`;

const RemoveButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 70px;

  &:hover {
    background: #c82333;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(220, 53, 69, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const AddBenefitButton = styled.button`
  background: #95bf47;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;

  &:hover {
    background: #7ea03a;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(149, 191, 71, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 2px solid rgba(15, 35, 52, 0.08);
  justify-content: flex-end;
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 13px;
  border: 1px solid #fcc;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.6s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const SubscriptionData = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    price: "",
    priceNote: "",
    description: "",
    badgeTone: "",
    badgeLabel: "",
    primaryCtaLabel: "Get Started",
    primaryCtaVariant: "primary",
    isCurrentDefault: false,
    benefits: [],
  });
  const pageSize = 5;

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/subscription-plans");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load subscription plans");
      }

      setPlans(data.plans || []);
      setCurrentPage(1);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load subscription plans");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingPlan(null);
    setSubmitError("");
    setFormData({
      code: "",
      name: "",
      price: "",
      priceNote: "",
      description: "",
      badgeTone: "",
      badgeLabel: "",
      primaryCtaLabel: "Get Started",
      primaryCtaVariant: "primary",
      isCurrentDefault: false,
      benefits: [],
    });
    setShowModal(true);
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setSubmitError("");
    setFormData({
      code: plan.code,
      name: plan.name,
      price: plan.price,
      priceNote: plan.priceNote || "",
      description: plan.description,
      badgeTone: plan.badgeTone || "",
      badgeLabel: plan.badgeLabel || "",
      primaryCtaLabel: plan.primaryCtaLabel,
      primaryCtaVariant: plan.primaryCtaVariant,
      isCurrentDefault: plan.isCurrentDefault,
      benefits: plan.benefits.map((b) => ({
        id: b.id,
        sortOrder: b.sortOrder,
        label: b.label,
      })),
    });
    setShowModal(true);
  };

  const handleDelete = async (planId) => {
    if (!confirm("Are you sure you want to delete this plan? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/subscription-plans/${planId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete plan");
      }

      await fetchPlans();
    } catch (err) {
      alert(err.message || "Failed to delete plan");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);

    try {
      const url = editingPlan
        ? `/api/admin/subscription-plans/${editingPlan.id}`
        : "/api/admin/subscription-plans";
      const method = editingPlan ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...(editingPlan ? {} : { code: formData.code }),
          name: formData.name,
          price: formData.price,
          priceNote: formData.priceNote || null,
          description: formData.description,
          badgeTone: formData.badgeTone || null,
          badgeLabel: formData.badgeLabel || null,
          primaryCtaLabel: formData.primaryCtaLabel,
          primaryCtaVariant: formData.primaryCtaVariant,
          isCurrentDefault: formData.isCurrentDefault,
          benefits: formData.benefits
            .filter((b) => b.label.trim() !== "")
            .map((b, index) => ({
              ...(b.id && { id: b.id }),
              sortOrder: b.sortOrder !== undefined ? b.sortOrder : index + 1,
              label: b.label.trim(),
            })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save plan");
      }

      setShowModal(false);
      await fetchPlans();
    } catch (err) {
      setSubmitError(err.message || "Failed to save plan");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddBenefit = () => {
    setFormData({
      ...formData,
      benefits: [
        ...formData.benefits,
        { sortOrder: formData.benefits.length + 1, label: "" },
      ],
    });
  };

  const handleRemoveBenefit = (index) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter((_, i) => i !== index),
    });
  };

  const handleBenefitChange = (index, field, value) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = { ...newBenefits[index], [field]: value };
    setFormData({ ...formData, benefits: newBenefits });
  };

  const totalPages = Math.max(1, Math.ceil(plans.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginatedPlans = plans.slice(startIndex, startIndex + pageSize);

  return (
    <LeadsSection>
      <LeadsHeader>
        <div>
          <Heading as="h3" content="Subscription Plans" />
          <Text
            as="span"
            content="Manage subscription plans and their benefits."
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span>Total plans: {plans.length}</span>
          <Button
            type="button"
            title="+ Create Plan"
            onClick={handleCreate}
            variant="extendedFab"
            colors="primaryWithBg"
            style={{
              height: 32,
              padding: "0 14px",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          />
        </div>
      </LeadsHeader>

      {error && (
        <Text
          as="p"
          content={error}
          style={{ color: "red", marginBottom: "12px", fontSize: 13 }}
        />
      )}

      <LeadsTable>
        <PlanRow className="header">
          <span>Code</span>
          <span>Name</span>
          <span>Price</span>
          <span>Badge</span>
          <span>Benefits</span>
          <span>Default</span>
          <span>Actions</span>
        </PlanRow>
        {loading ? (
          <PlanRow>
            <span>Loading...</span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </PlanRow>
        ) : plans.length === 0 ? (
          <PlanRow>
            <span>No plans yet. Create your first plan!</span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </PlanRow>
        ) : (
          paginatedPlans.map((plan) => (
            <PlanRow key={plan.id}>
              <span>{plan.code}</span>
              <span>{plan.name}</span>
              <span>
                {plan.price}
                {plan.priceNote && ` ${plan.priceNote}`}
              </span>
              <span>
                {plan.badgeLabel || "-"}
                {plan.badgeTone && ` (${plan.badgeTone})`}
              </span>
              <span>{plan.benefits?.length || 0} benefits</span>
              <span>{plan.isCurrentDefault ? "✓ Yes" : "No"}</span>
              <span style={{ display: "flex", gap: 6 }}>
                <Button
                  type="button"
                  title="Edit"
                  onClick={() => handleEdit(plan)}
                  variant="textButton"
                  colors="primary"
                  style={{ padding: "4px 8px", minWidth: 0, height: 28, fontSize: 12 }}
                />
                <Button
                  type="button"
                  title="Delete"
                  onClick={() => handleDelete(plan.id)}
                  variant="textButton"
                  colors="primary"
                  style={{
                    padding: "4px 8px",
                    minWidth: 0,
                    height: 28,
                    fontSize: 12,
                    color: "#dc3545",
                  }}
                />
              </span>
            </PlanRow>
          ))
        )}
      </LeadsTable>

      {plans.length > pageSize && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 12,
          }}
        >
          <Text
            as="span"
            content={`Page ${safePage} of ${totalPages}`}
            style={{ fontSize: 13 }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <Button
              type="button"
              title="Prev"
              variant="textButton"
              colors="primary"
              disabled={safePage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              style={{ padding: "4px 10px", minWidth: 0, height: 30 }}
            />
            <Button
              type="button"
              title="Next"
              variant="textButton"
              colors="primary"
              disabled={safePage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              style={{ padding: "4px 10px", minWidth: 0, height: 30 }}
            />
          </div>
        </div>
      )}

      {showModal && (
        <ModalOverlay onClick={() => !submitting && setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3>{editingPlan ? "Edit Subscription Plan" : "Create New Plan"}</h3>
              <CloseButton
                onClick={() => !submitting && setShowModal(false)}
                disabled={submitting}
              >
                ×
              </CloseButton>
            </ModalHeader>

            {submitError && <ErrorMessage>{submitError}</ErrorMessage>}

            <form onSubmit={handleSubmit}>
              <FormSection>
                <SectionTitle>Basic Information</SectionTitle>
                <FormGrid>
                  {!editingPlan && (
                    <FormGroup>
                      <FormLabel>
                        Code <span className="required">*</span>
                      </FormLabel>
                      <FormInput
                        type="text"
                        value={formData.code}
                        onChange={(e) =>
                          setFormData({ ...formData, code: e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '') })
                        }
                        required
                        placeholder="e.g., free, growth, enterprise"
                        disabled={submitting}
                      />
                    </FormGroup>
                  )}
                  <FormGroup fullWidth={!editingPlan}>
                    <FormLabel>
                      Name <span className="required">*</span>
                    </FormLabel>
                    <FormInput
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      placeholder="e.g., Free Plan, Growth Plan"
                      disabled={submitting}
                    />
                  </FormGroup>
                </FormGrid>

                <FormGrid>
                  <FormGroup>
                    <FormLabel>
                      Price <span className="required">*</span>
                    </FormLabel>
                    <FormInput
                      type="text"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      required
                      placeholder="e.g., $0, $79, $199/month"
                      disabled={submitting}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Price Note</FormLabel>
                    <FormInput
                      type="text"
                      value={formData.priceNote}
                      onChange={(e) =>
                        setFormData({ ...formData, priceNote: e.target.value })
                      }
                      placeholder="e.g., per month, billed annually"
                      disabled={submitting}
                    />
                  </FormGroup>
                </FormGrid>

                <FormGroup>
                  <FormLabel>
                    Description <span className="required">*</span>
                  </FormLabel>
                  <FormTextarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    placeholder="Describe what this plan offers..."
                    disabled={submitting}
                  />
                </FormGroup>
              </FormSection>

              <FormSection>
                <SectionTitle>Badge & Call-to-Action</SectionTitle>
                <FormGrid>
                  <FormGroup>
                    <FormLabel>Badge Tone</FormLabel>
                    <FormSelect
                      value={formData.badgeTone}
                      onChange={(e) =>
                        setFormData({ ...formData, badgeTone: e.target.value })
                      }
                      disabled={submitting}
                    >
                      <option value="">None</option>
                      <option value="success">Success (Green)</option>
                      <option value="attention">Attention (Yellow/Orange)</option>
                      <option value="info">Info (Blue)</option>
                    </FormSelect>
                  </FormGroup>
                  {formData.badgeTone && (
                    <FormGroup>
                      <FormLabel>Badge Label</FormLabel>
                      <FormInput
                        type="text"
                        value={formData.badgeLabel}
                        onChange={(e) =>
                          setFormData({ ...formData, badgeLabel: e.target.value })
                        }
                        placeholder="e.g., Popular, Best Value"
                        disabled={submitting}
                      />
                    </FormGroup>
                  )}
                </FormGrid>

                <FormGrid>
                  <FormGroup>
                    <FormLabel>
                      CTA Label <span className="required">*</span>
                    </FormLabel>
                    <FormInput
                      type="text"
                      value={formData.primaryCtaLabel}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          primaryCtaLabel: e.target.value,
                        })
                      }
                      required
                      placeholder="e.g., Get Started, Upgrade Now"
                      disabled={submitting}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>
                      CTA Variant <span className="required">*</span>
                    </FormLabel>
                    <FormSelect
                      value={formData.primaryCtaVariant}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          primaryCtaVariant: e.target.value,
                        })
                      }
                      required
                      disabled={submitting}
                    >
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                      <option value="plain">Plain</option>
                    </FormSelect>
                  </FormGroup>
                </FormGrid>
              </FormSection>

              <FormSection>
                <SectionTitle>Plan Benefits</SectionTitle>
                <BenefitsList>
                  {formData.benefits.map((benefit, index) => (
                    <BenefitItem key={index}>
                      <BenefitInput
                        type="text"
                        value={benefit.label}
                        onChange={(e) =>
                          handleBenefitChange(index, "label", e.target.value)
                        }
                        placeholder={`Benefit ${index + 1}...`}
                        disabled={submitting}
                      />
                      <RemoveButton
                        type="button"
                        onClick={() => handleRemoveBenefit(index)}
                        disabled={submitting}
                      >
                        Remove
                      </RemoveButton>
                    </BenefitItem>
                  ))}
                </BenefitsList>
                <AddBenefitButton
                  type="button"
                  onClick={handleAddBenefit}
                  disabled={submitting}
                >
                  + Add Benefit
                </AddBenefitButton>
              </FormSection>

              <FormSection>
                <CheckboxGroup>
                  <input
                    type="checkbox"
                    checked={formData.isCurrentDefault}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isCurrentDefault: e.target.checked,
                      })
                    }
                    id="isDefault"
                    disabled={submitting}
                  />
                  <FormLabel htmlFor="isDefault" style={{ margin: 0 }}>
                    Set as default/recommended plan
                  </FormLabel>
                </CheckboxGroup>
              </FormSection>

              <ActionButtons>
                <Button
                  type="button"
                  title="Cancel"
                  onClick={() => setShowModal(false)}
                  variant="textButton"
                  colors="primary"
                  style={{ padding: "10px 20px" }}
                  disabled={submitting}
                />
                <Button
                  type="submit"
                  title={editingPlan ? "Update Plan" : "Create Plan"}
                  variant="extendedFab"
                  colors="primaryWithBg"
                  style={{ padding: "10px 24px", minWidth: 140 }}
                  disabled={submitting}
                >
                  {submitting && <LoadingSpinner />}
                  {editingPlan ? "Update Plan" : "Create Plan"}
                </Button>
              </ActionButtons>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </LeadsSection>
  );
};

export default SubscriptionData;
