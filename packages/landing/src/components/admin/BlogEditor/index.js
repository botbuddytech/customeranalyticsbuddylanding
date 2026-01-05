import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  EditorContainer,
  EditorHeader,
  EditorTitle,
  BackButton,
  EditorWrapper,
  EditorPane,
  EditorTextarea,
  PreviewPane,
  PreviewContent,
  EditorActions,
  SaveButton,
  CancelButton,
  LoadingState,
  ErrorMessage,
} from "./blogEditor.style";

const BlogEditor = ({ blogId }) => {
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`/api/admin/blogs/${blogId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load blog");
      }

      setBlog(data.blog);
      setContent(data.blog.content || "");
    } catch (err) {
      setError(err.message || "Failed to load blog");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!blog) return;

    try {
      setSaving(true);
      setError("");
      setSuccess(false);

      const response = await fetch(`/api/admin/blogs/${blog.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: blog.title,
          content: content,
          youtubeUrl: blog.youtubeUrl || "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save blog");
      }

      setSuccess(true);

      // Notify parent window to refresh if opened in a new tab
      if (window.opener) {
        try {
          window.opener.postMessage({ type: 'BLOG_UPDATED', blogId: blog.id }, '*');
        } catch (e) {
          console.log('Could not notify parent window');
        }
        // Wait a moment to show success, then close
        setTimeout(() => {
          window.close();
        }, 500);
      } else {
        setTimeout(() => {
          router.push("/admin/blogs");
        }, 500);
      }
    } catch (err) {
      console.error('Save error:', err);
      setError(err.message || "Failed to save blog");
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // If opened in a new tab, close it; otherwise redirect
    if (window.opener) {
      window.close();
    } else {
      router.push("/admin/blogs");
    }
  };

  if (loading) {
    return (
      <EditorContainer>
        <LoadingState>Loading blog...</LoadingState>
      </EditorContainer>
    );
  }

  if (error && !blog) {
    return (
      <EditorContainer>
        <ErrorMessage>{error}</ErrorMessage>
        <BackButton onClick={handleCancel}>← Back to Blogs</BackButton>
      </EditorContainer>
    );
  }

  if (!blog) {
    return (
      <EditorContainer>
        <ErrorMessage>Blog not found</ErrorMessage>
        <BackButton onClick={handleCancel}>← Back to Blogs</BackButton>
      </EditorContainer>
    );
  }

  return (
    <EditorContainer>
      <EditorHeader>
        <div>
          <EditorTitle>{blog.title}</EditorTitle>
          <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#666" }}>
            Edit content with Markdown support
          </p>
        </div>
        <BackButton onClick={handleCancel}>← Back to Blogs</BackButton>
      </EditorHeader>

      {error && (
        <ErrorMessage style={{ marginBottom: "16px" }}>{error}</ErrorMessage>
      )}

      {success && (
        <div
          style={{
            padding: "12px 16px",
            background: "#d4edda",
            color: "#155724",
            borderRadius: "8px",
            marginBottom: "16px",
            fontSize: "14px",
          }}
        >
          Blog saved successfully! Closing...
        </div>
      )}

      <EditorWrapper>
        <EditorPane>
          <div
            style={{
              padding: "12px",
              background: "#f5f5f5",
              borderBottom: "1px solid #ddd",
              fontSize: "12px",
              fontWeight: "600",
              color: "#666",
            }}
          >
            EDITOR
          </div>
          <EditorTextarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your Markdown content here..."
          />
        </EditorPane>

        <PreviewPane>
          <div
            style={{
              padding: "12px",
              background: "#f5f5f5",
              borderBottom: "1px solid #ddd",
              fontSize: "12px",
              fontWeight: "600",
              color: "#666",
            }}
          >
            PREVIEW
          </div>
          <PreviewContent>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content || "*No content yet. Start typing in the editor...*"}
            </ReactMarkdown>
          </PreviewContent>
        </PreviewPane>
      </EditorWrapper>

      <EditorActions>
        <CancelButton onClick={handleCancel} disabled={saving}>
          Cancel
        </CancelButton>
        <SaveButton onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </SaveButton>
      </EditorActions>
    </EditorContainer>
  );
};

export default BlogEditor;

