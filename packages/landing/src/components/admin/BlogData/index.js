import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Heading from "common/components/Heading";
import Button from "common/components/Button";
import {
  BlogSection,
  BlogHeader,
  BlogList,
  BlogCard,
  BlogCardHeader,
  BlogCardTitle,
  BlogCardMeta,
  BlogCardContent,
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
} from "./blogData.style";

const BlogData = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [editorTabOpen, setEditorTabOpen] = useState(false);
  const [editorWindow, setEditorWindow] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    youtubeUrl: "",
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Listen for blog update messages from editor window
  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.data && event.data.type === 'BLOG_UPDATED') {
        // Refresh the blogs list when editor saves
        await fetchBlogs();
        
        // Close editor tab tracking
        setEditorTabOpen(false);
        setEditorWindow(null);
        
        // If modal is open and editing the same blog, refresh the form data and close modal
        if (isModalOpen && editingBlog && editingBlog.id === event.data.blogId) {
          try {
            const response = await fetch(`/api/admin/blogs/${editingBlog.id}`);
            const data = await response.json();
            if (data.blog) {
              // Close the modal since changes were saved in the editor
              handleCloseModal();
            }
          } catch (err) {
            console.error('Error refreshing blog:', err);
            // Still close the modal even if refresh fails
            handleCloseModal();
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isModalOpen, editingBlog, handleCloseModal]);

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

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/blogs");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load blogs");
      }

      setBlogs(data.blogs || []);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title || "",
        content: blog.content || "",
        youtubeUrl: blog.youtubeUrl || "",
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: "",
        content: "",
        youtubeUrl: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
    setFormData({
      title: "",
      content: "",
      youtubeUrl: "",
    });
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
      const url = editingBlog
        ? `/api/admin/blogs/${editingBlog.id}`
        : "/api/admin/blogs";
      const method = editingBlog ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save blog");
      }

      handleCloseModal();
      fetchBlogs();
    } catch (err) {
      setError(err.message || "Failed to save blog");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete blog");
      }

      fetchBlogs();
    } catch (err) {
      alert(err.message || "Failed to delete blog");
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
      <BlogSection>
        <LoadingState>Loading blogs...</LoadingState>
      </BlogSection>
    );
  }

  return (
    <BlogSection>
      <BlogHeader>
        <div>
          <Heading as="h3" content="Blog Management" />
          <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#666" }}>
            Manage your documentation blogs
          </p>
        </div>
        <Button
          title="+ Add New Blog"
          onClick={() => handleOpenModal()}
        />
      </BlogHeader>

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

      {blogs.length === 0 ? (
        <EmptyState>
          <p>No blogs yet. Create your first blog to get started!</p>
        </EmptyState>
      ) : (
        <BlogList>
          {blogs.map((blog) => (
            <BlogCard key={blog.id}>
              <BlogCardHeader>
                <BlogCardTitle>{blog.title}</BlogCardTitle>
                <BlogCardMeta>
                  <span>{formatDate(blog.createdAt)}</span>
                  <ActionButton
                    className="secondary"
                    onClick={() => handleOpenModal(blog)}
                    style={{ padding: "6px 12px", fontSize: "12px" }}
                  >
                    Edit
                  </ActionButton>
                  <ActionButton
                    className="danger"
                    onClick={() => handleDelete(blog.id)}
                    style={{ padding: "6px 12px", fontSize: "12px" }}
                  >
                    Delete
                  </ActionButton>
                </BlogCardMeta>
              </BlogCardHeader>
              <BlogCardContent>{blog.content}</BlogCardContent>
              <EditContentButton
                onClick={() => {
                  window.open(`/admin/blogs/edit/${blog.id}`, '_blank');
                }}
              >
                Update Content
              </EditContentButton>
            </BlogCard>
          ))}
        </BlogList>
      )}

      {isModalOpen && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>{editingBlog ? "Edit Blog" : "Create New Blog"}</h2>
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
                  placeholder="Enter blog title"
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
                  placeholder="Enter blog content (supports markdown)"
                  required
                />
                {editingBlog && (
                  <EditContentButton
                    type="button"
                    onClick={() => {
                      const editorWindow = window.open(`/admin/blogs/edit/${editingBlog.id}`, '_blank');
                      if (editorWindow) {
                        setEditorTabOpen(true);
                        setEditorWindow(editorWindow);
                      }
                    }}
                  >
                    Edit Content in Full Editor
                  </EditContentButton>
                )}
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
                    editingBlog
                      ? "Updating..."
                      : "Creating..."
                  ) : editingBlog ? (
                    "Update Blog"
                  ) : (
                    "Create Blog"
                  )}
                </ActionButton>
              </ButtonGroup>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </BlogSection>
  );
};

export default BlogData;

