import React, { useState } from "react";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Button from "common/components/Button";
import Input from "common/components/Input";
import Container from "common/components/UI/Container";

const FreeArticle = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");

    if (!formData.email) {
      setStatusMessage("Please enter your email.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/free-article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to save your email. Please try again."
        );
      }

      setStatusMessage(
        data.message ||
          "Thanks! We will send the free article to your email shortly."
      );
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatusMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      id="free_article"
      style={{
        padding: "120px 0",
        backgroundColor: "#ffffff",
      }}
    >
      <Container>
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
          }}
        >
          <div
            className="contact-header"
            style={{ textAlign: "center", marginBottom: "40px" }}
          >
            <Text
              content="Free Article"
              style={{
                color: "#95bf47",
                fontSize: "16px",
                fontWeight: "600",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "15px",
              }}
            />
            <Heading
              content="Get Your Free Customer Analytics Article"
              style={{
                color: "#0f2137",
                fontSize: "40px",
                fontWeight: "700",
                marginBottom: "20px",
                lineHeight: "1.2",
              }}
            />
            <Text
              content="Share your email (and optionally a few details) and we’ll send you our free guide on understanding your Shopify customers."
              style={{
                color: "#5a6c7d",
                fontSize: "18px",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: "1.6",
              }}
            />
          </div>

          <div
            className="contact-form-card"
            style={{
              background: "#ffffff",
              padding: "40px 32px",
              borderRadius: "20px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                <Input
                  inputType="text"
                  name="name"
                  placeholder="Your Name (optional)"
                  value={formData.name}
                  onChange={(value) => handleInputChange("name", value)}
                  style={{
                    width: "100%",
                    padding: "15px 20px",
                    border:
                      focusedField === "name"
                        ? "2px solid #95bf47"
                        : "2px solid #e8ecf0",
                    borderRadius: "10px",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                    background: "#ffffff",
                  }}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                />
                <Input
                  inputType="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(value) => handleInputChange("email", value)}
                  style={{
                    width: "100%",
                    padding: "15px 20px",
                    border:
                      focusedField === "email"
                        ? "2px solid #95bf47"
                        : "2px solid #e8ecf0",
                    borderRadius: "10px",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                    background: "#ffffff",
                  }}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <Input
                inputType="text"
                name="subject"
                placeholder="What would you like to learn? (optional)"
                value={formData.subject}
                onChange={(value) => handleInputChange("subject", value)}
                style={{
                  width: "100%",
                  padding: "15px 20px",
                  border:
                    focusedField === "subject"
                      ? "2px solid #95bf47"
                      : "2px solid #e8ecf0",
                  borderRadius: "10px",
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                  background: "#ffffff",
                }}
                onFocus={() => setFocusedField("subject")}
                onBlur={() => setFocusedField(null)}
              />

              <Input
                inputType="textarea"
                name="message"
                placeholder="Tell us a bit about your store (optional)"
                value={formData.message}
                onChange={(value) => handleInputChange("message", value)}
                style={{
                  width: "100%",
                  padding: "15px 20px",
                  border:
                    focusedField === "message"
                      ? "2px solid #95bf47"
                      : "2px solid #e8ecf0",
                  borderRadius: "10px",
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                  background: "#ffffff",
                  minHeight: "120px",
                  resize: "vertical",
                }}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
              />

              <Button
                type="submit"
                title={submitting ? "Sending..." : "Get Free Article"}
                colors="primaryWithBg"
                disabled={submitting}
                style={{
                  width: "100%",
                  marginTop: "10px",
                }}
              />

              {statusMessage && (
                <Text
                  as="p"
                  content={statusMessage}
                  style={{
                    marginTop: "12px",
                    fontSize: 14,
                    color: statusMessage.toLowerCase().includes("unable")
                      ? "#dc2626"
                      : "#0f9d58",
                  }}
                />
              )}
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FreeArticle;
