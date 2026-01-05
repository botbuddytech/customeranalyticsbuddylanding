import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Heading from "common/components/Heading";
import Button from "common/components/Button";
import {
  BlogSection,
  BlogHeader,
  BlogList,
  BlogCard,
  BlogCardImage,
  BlogCardBody,
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
  ImageUploadContainer,
  ImageUploadLeft,
  ImagePreviewRight,
  ImageUploadArea,
  ImageUploadIcon,
  ImageUploadText,
  ImageUploadHint,
  ImageSizeInfo,
  ImagePreviewContainer,
  ImagePreview,
  ImagePreviewOverlay,
  RemoveImageButton,
  ImageUploadInput,
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
    imageUrl: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null); // Store selected file for later upload

  const fetchBlogs = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingBlog(null);
    setFormData({
      title: "",
      content: "",
      youtubeUrl: "",
      imageUrl: "",
    });
    setImagePreview(null);
    setSelectedImageFile(null); // Clear selected file
    setEditorTabOpen(false);
    if (editorWindow) {
      editorWindow.close();
      setEditorWindow(null);
    }
  }, [editorWindow]);

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
  }, [isModalOpen, editingBlog, handleCloseModal, fetchBlogs]);

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

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title || "",
        content: blog.content || "",
        youtubeUrl: blog.youtubeUrl || "",
        imageUrl: blog.imageUrl || "",
      });
      setImagePreview(blog.imageUrl || null);
    } else {
      setEditingBlog(null);
      setFormData({
        title: "",
        content: "",
        youtubeUrl: "",
        imageUrl: "",
      });
      setImagePreview(null);
    }
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Only JPEG, PNG, WEBP, and GIF are allowed.");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError("File size exceeds 5MB limit.");
      return;
    }

    setError("");
    setSelectedImageFile(file); // Store file for later upload

    // Convert file to base64 for preview only (not uploading yet)
    const reader = new FileReader();
    
    reader.onloadend = () => {
      const base64String = reader.result;
      setImagePreview(base64String); // Show preview from base64
    };

    reader.onerror = () => {
      setError("Failed to read image file");
      setSelectedImageFile(null);
      setImagePreview(null);
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
    }));
    setImagePreview(null);
    setSelectedImageFile(null); // Clear selected file
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
      let imageUrl = formData.imageUrl;

      // If a new image file was selected, upload it first
      if (selectedImageFile) {
        setUploadingImage(true);
        try {
          // Convert file to base64 for upload
          const base64String = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(selectedImageFile);
          });

          // Upload to server
          const response = await fetch("/api/admin/blogs/upload-image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              imageBase64: base64String,
              fileName: selectedImageFile.name,
              blogId: editingBlog?.id || null,
            }),
          });

          if (!response.ok) {
            let errorMessage = "Failed to upload image";
            try {
              const errorData = await response.json();
              errorMessage = errorData.message || errorMessage;
            } catch (e) {
              errorMessage = response.statusText || errorMessage;
            }
            throw new Error(errorMessage);
          }

          const data = await response.json();
          imageUrl = data.url;
          setUploadingImage(false);
        } catch (err) {
          setUploadingImage(false);
          setError(err.message || "Failed to upload image");
          setSubmitting(false);
          return;
        }
      }

      const url = editingBlog
        ? `/api/admin/blogs/${editingBlog.id}`
        : "/api/admin/blogs";
      const method = editingBlog ? "PUT" : "POST";

      // Include oldImageUrl for deletion if image changed
      const payload = {
        title: formData.title,
        content: formData.content,
        youtubeUrl: formData.youtubeUrl || "",
        imageUrl: imageUrl || "",
        ...(editingBlog && editingBlog.imageUrl !== imageUrl
          ? { oldImageUrl: editingBlog.imageUrl }
          : {}),
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
        throw new Error(data.message || "Failed to save blog");
      }

      handleCloseModal();
      fetchBlogs();
      setSelectedImageFile(null); // Clear selected file after successful submission
    } catch (err) {
      setError(err.message || "Failed to save blog");
    } finally {
      setSubmitting(false);
      setUploadingImage(false);
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
    <>
      <Head>
        <style>{`
          /* Ensure modal is always above navbar - override any sticky navbar z-index */
          [class*="sticky"], 
          .sticky-nav-active,
          .web_app_creative_navbar,
          [style*="z-index: 9999"],
          [style*="z-index:9999"] {
            z-index: 9999 !important;
          }
        `}</style>
      </Head>
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
              <BlogCardImage>
                {blog.imageUrl ? (
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999',
                    fontSize: '12px',
                  }}>
                    No Image
                  </div>
                )}
              </BlogCardImage>
              <BlogCardBody>
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
              </BlogCardBody>
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
                <EditContentButton
                  type="button"
                  onClick={async () => {
                    if (editingBlog) {
                      // For existing blog, open editor directly
                      const editorWindow = window.open(`/admin/blogs/edit/${editingBlog.id}`, '_blank');
                      if (editorWindow) {
                        setEditorTabOpen(true);
                        setEditorWindow(editorWindow);
                      }
                    } else {
                      // For new blog, create a draft first
                      if (!formData.title || !formData.title.trim()) {
                        setError("Please enter a title before opening the editor.");
                        return;
                      }

                      try {
                        setSubmitting(true);
                        // Create a draft blog with current data
                        const response = await fetch("/api/admin/blogs", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            title: formData.title,
                            content: formData.content || "",
                            youtubeUrl: formData.youtubeUrl || "",
                            imageUrl: formData.imageUrl || "",
                          }),
                        });

                        const data = await response.json();

                        if (!response.ok) {
                          throw new Error(data.message || "Failed to create draft blog");
                        }

                        // Set the editing blog to the newly created draft
                        setEditingBlog(data.blog);
                        setFormData((prev) => ({
                          ...prev,
                          // Keep all form data
                        }));

                        // Open editor with the new blog ID
                        const editorWindow = window.open(`/admin/blogs/edit/${data.blog.id}`, '_blank');
                        if (editorWindow) {
                          setEditorTabOpen(true);
                          setEditorWindow(editorWindow);
                        }
                      } catch (err) {
                        setError(err.message || "Failed to create draft blog");
                      } finally {
                        setSubmitting(false);
                      }
                    }
                  }}
                >
                  Edit Content in Full Editor
                </EditContentButton>
              </FormGroup>

              <FormGroup>
                <Label>
                  Blog Image{" "}
                  <span className="optional">(optional)</span>
                </Label>
                <ImageSizeInfo style={{ marginBottom: '16px', display: 'block' }}>
                  Recommended size: 415 × 280 pixels (images will be displayed at this size)
                </ImageSizeInfo>
                <ImageUploadContainer>
                  <ImageUploadLeft>
                    <label htmlFor="image-upload" style={{ display: 'block', cursor: 'pointer' }}>
                      <ImageUploadArea isDragging={false}>
                        <ImageUploadIcon>📷</ImageUploadIcon>
                        <ImageUploadText>
                          {uploadingImage ? "Uploading..." : "Click to select image"}
                        </ImageUploadText>
                        <ImageUploadHint>
                          Supports: JPEG, PNG, WEBP, GIF
                        </ImageUploadHint>
                        <ImageUploadHint style={{ marginTop: '8px', fontSize: '12px' }}>
                          Max size: 5MB
                        </ImageUploadHint>
                        <ImageUploadInput
                          id="image-upload"
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                          onChange={handleImageChange}
                          disabled={uploadingImage || submitting}
                        />
                      </ImageUploadArea>
                    </label>
                  </ImageUploadLeft>
                  <ImagePreviewRight>
                    {imagePreview ? (
                      <ImagePreviewContainer>
                        <ImagePreview src={imagePreview} alt="Blog Preview" />
                        <ImagePreviewOverlay>
                          <RemoveImageButton
                            type="button"
                            onClick={handleRemoveImage}
                          >
                            Remove Image
                          </RemoveImageButton>
                        </ImagePreviewOverlay>
                      </ImagePreviewContainer>
                    ) : (
                      <div style={{
                        width: '415px',
                        height: '280px',
                        border: '2px dashed rgba(15, 35, 52, 0.16)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#999',
                        fontSize: '14px',
                        background: '#f8f9fa',
                      }}>
                        No image selected
                      </div>
                    )}
                  </ImagePreviewRight>
                </ImageUploadContainer>
                {uploadingImage && (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '12px', 
                    fontSize: '14px', 
                    color: '#666',
                    background: 'rgba(2, 132, 137, 0.05)',
                    borderRadius: '8px',
                    marginTop: '16px'
                  }}>
                    ⏳ Uploading image... Please wait.
                  </div>
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
                  disabled={submitting || editorTabOpen || uploadingImage}
                >
                  {uploadingImage ? (
                    <>
                      <span style={{ marginRight: "8px" }}>⬆️</span>
                      Uploading Image...
                    </>
                  ) : editorTabOpen ? (
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
    </>
  );
};

export default BlogData;

