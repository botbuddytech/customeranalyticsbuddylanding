import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Heading from "common/components/Heading";
import Button from "common/components/Button";
import {
  DocumentationSection,
  DocumentationHeader,
  DocumentationList,
  DocumentationCard,
  DocumentationCardHeader,
  DocumentationCardTitle,
  DocumentationCardMeta,
  DocumentationCardContent,
  EditContentButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  CloseButton,
  FormGroup,
  Label,
  Input,
  TextArea,
  ButtonGroup,
  ActionButton,
  EmptyState,
  LoadingState,
} from "./documentationData.style";

const DocumentationData = () => {
  const router = useRouter();
  const [documentation, setDocumentation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [editorTabOpen, setEditorTabOpen] = useState(false);
  const [editorWindow, setEditorWindow] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    youtubeUrl: "",
  });

  const fetchDocumentation = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/documentation");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load documentation");
      }

      setDocumentation(data.documentation || []);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load documentation");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocumentation();
  }, [fetchDocumentation]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingDoc(null);
    setFormData({
      title: "",
      content: "",
      youtubeUrl: "",
    });
    setEditorTabOpen(false);
    if (editorWindow) {
      editorWindow.close();
      setEditorWindow(null);
    }
  }, [editorWindow]);

  // Listen for documentation update messages from editor window
  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.data && event.data.type === 'DOCUMENTATION_UPDATED') {
        await fetchDocumentation();
        setEditorTabOpen(false);
        setEditorWindow(null);

        if (isModalOpen && editingDoc && editingDoc.id === event.data.docId) {
          try {
            const response = await fetch(`/api/admin/documentation/${editingDoc.id}`);
            const data = await response.json();
            if (data.documentation) {
              handleCloseModal();
            }
          } catch (err) {
            handleCloseModal();
          }
        }
      } else if (event.data && event.data.type === 'EDITOR_CLOSED_NO_SAVE') {
        setEditorTabOpen(false);
        setEditorWindow(null);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isModalOpen, editingDoc, handleCloseModal, fetchDocumentation]);

  // Check if editor window is closed
  useEffect(() => {
    if (!editorTabOpen || !editorWindow) return;

    const checkWindowClosed = setInterval(() => {
      if (editorWindow.closed) {
        setEditorTabOpen(false);
        setEditorWindow(null);
        clearInterval(checkWindowClosed);
      }
    }, 500);

    return () => clearInterval(checkWindowClosed);
  }, [editorTabOpen, editorWindow]);

  const handleOpenModal = (doc = null) => {
    if (doc) {
      setEditingDoc(doc);
      setFormData({
        title: doc.title || "",
        content: doc.content || "",
        youtubeUrl: doc.youtubeUrl || "",
      });
    } else {
      setEditingDoc(null);
      setFormData({
        title: "",
        content: "",
        youtubeUrl: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setSubmitting(true);
    setError("");

    try {
      const url = editingDoc
        ? `/api/admin/documentation/${editingDoc.id}`
        : "/api/admin/documentation";
      const method = editingDoc ? "PUT" : "POST";

      const payload = {
        title: formData.title,
        content: formData.content,
        youtubeUrl: formData.youtubeUrl || "",
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save documentation");
      }

      handleCloseModal();
      fetchDocumentation();
    } catch (err) {
      setError(err.message || "Failed to save documentation");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this documentation?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/documentation/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete documentation");
      }

      fetchDocumentation();
    } catch (err) {
      alert(err.message || "Failed to delete documentation");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <DocumentationSection>
        <LoadingState>Loading documentation...</LoadingState>
      </DocumentationSection>
    );
  }

  return (
    <>
      <Head>
        <style>{`
          .sticky-nav-active .web_app_creative_navbar {
            z-index: 9999 !important;
          }
        `}</style>
      </Head>
      <DocumentationSection>
        <DocumentationHeader>
          <div>
            <Heading as="h3" content="Documentation Management" />
            <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#666" }}>
              Manage your documentation articles
            </p>
          </div>
          <Button
            title="+ Add New Documentation"
            onClick={() => handleOpenModal()}
          />
        </DocumentationHeader>

        {error && (
          <div
            style={{
              padding: "12px",
              background: "#fee",
              color: "#c33",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {documentation.length === 0 ? (
          <EmptyState>
            <p>No documentation yet. Create your first article to get started!</p>
          </EmptyState>
        ) : (
          <DocumentationList>
            {documentation.map((doc) => (
              <DocumentationCard key={doc.id}>
                <div style={{ flex: 1 }}>
                  <DocumentationCardHeader>
                    <DocumentationCardTitle>{doc.title}</DocumentationCardTitle>
                    <DocumentationCardMeta>
                      <span>{formatDate(doc.createdAt)}</span>
                      <ActionButton
                        className="secondary"
                        onClick={() => handleOpenModal(doc)}
                        style={{ padding: "6px 12px", fontSize: "12px" }}
                      >
                        Edit
                      </ActionButton>
                      <ActionButton
                        className="danger"
                        onClick={() => handleDelete(doc.id)}
                        style={{ padding: "6px 12px", fontSize: "12px" }}
                      >
                        Delete
                      </ActionButton>
                    </DocumentationCardMeta>
                  </DocumentationCardHeader>
                  <DocumentationCardContent>{doc.content}</DocumentationCardContent>
                  <EditContentButton
                    onClick={() => {
                      const newWindow = window.open(`/admin/documentation/edit/${doc.id}`, '_blank');
                      if (newWindow) {
                        setEditorTabOpen(true);
                        setEditorWindow(newWindow);
                      }
                    }}
                  >
                    Update Content
                  </EditContentButton>
                </div>
              </DocumentationCard>
            ))}
          </DocumentationList>
        )}

        {isModalOpen && (
          <ModalOverlay onClick={handleCloseModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <h2>{editingDoc ? "Edit Documentation" : "Create New Documentation"}</h2>
                <CloseButton onClick={handleCloseModal}>×</CloseButton>
              </ModalHeader>

              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>
                    Title <span style={{ color: "#dc3545" }}>*</span>
                  </Label>
                  <Input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter documentation title"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>
                    Content <span style={{ color: "#dc3545" }}>*</span>
                  </Label>
                  <TextArea
                    value={formData.content}
                    onChange={(e) =>
                      handleInputChange("content", e.target.value)
                    }
                    placeholder="Enter documentation content (supports markdown)"
                    required
                  />
                  <EditContentButton
                    type="button"
                    onClick={async () => {
                      if (!formData.title) {
                        setError("Please enter a title before opening the full editor.");
                        return;
                      }

                      let currentEditingDoc = editingDoc;

                      // If creating a new documentation, create a draft first
                      if (!currentEditingDoc) {
                        setSubmitting(true);
                        try {
                          const response = await fetch("/api/admin/documentation", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              title: formData.title,
                              content: formData.content || "",
                              youtubeUrl: formData.youtubeUrl || "",
                            }),
                          });

                          const data = await response.json();

                          if (!response.ok) {
                            throw new Error(data.message || "Failed to create draft documentation");
                          }

                          currentEditingDoc = data.documentation;
                          setEditingDoc(data.documentation);
                          setFormData((prev) => ({
                            ...prev,
                          }));
                        } catch (err) {
                          setError(err.message || "Failed to create draft documentation");
                          setSubmitting(false);
                          return;
                        } finally {
                          setSubmitting(false);
                        }
                      }

                      // Open editor with the documentation ID
                      const editorWindow = window.open(`/admin/documentation/edit/${currentEditingDoc.id}`, '_blank');
                      if (editorWindow) {
                        setEditorTabOpen(true);
                        setEditorWindow(editorWindow);
                      }
                    }}
                  >
                    Edit Content in Full Editor
                  </EditContentButton>
                </FormGroup>

                <FormGroup>
                  <Label>
                    YouTube Video URL{" "}
                    <span className="optional">(optional)</span>
                  </Label>
                  <Input
                    type="url"
                    value={formData.youtubeUrl}
                    onChange={(e) =>
                      handleInputChange("youtubeUrl", e.target.value)
                    }
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </FormGroup>

                {error && (
                  <div
                    style={{
                      padding: "12px",
                      background: "#fee",
                      color: "#c33",
                      borderRadius: "8px",
                      marginBottom: "16px",
                      fontSize: "14px",
                    }}
                  >
                    {error}
                  </div>
                )}

                <ButtonGroup>
                  <ActionButton
                    type="button"
                    className="secondary"
                    onClick={handleCloseModal}
                    disabled={submitting}
                  >
                    Cancel
                  </ActionButton>
                  <ActionButton
                    type="submit"
                    className="primary"
                    disabled={submitting || editorTabOpen}
                  >
                    {editorTabOpen ? (
                      <>
                        <span style={{ marginRight: "8px" }}>⏳</span>
                        Saving in Editor...
                      </>
                    ) : submitting ? (
                      editingDoc
                        ? "Updating..."
                        : "Creating..."
                    ) : editingDoc ? (
                      "Update Documentation"
                    ) : (
                      "Create Documentation"
                    )}
                  </ActionButton>
                </ButtonGroup>
              </form>
            </ModalContent>
          </ModalOverlay>
        )}
      </DocumentationSection>
    </>
  );
};

export default DocumentationData;
