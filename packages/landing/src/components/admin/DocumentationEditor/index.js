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
} from "./documentationEditor.style";

const DocumentationEditor = ({ docId }) => {
  const router = useRouter();
  const [doc, setDoc] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (docId) {
      fetchDocumentation();
    }
  }, [docId]);

  const fetchDocumentation = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`/api/admin/documentation/${docId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load documentation");
      }

      setDoc(data.documentation);
      setContent(data.documentation.content || "");
    } catch (err) {
      setError(err.message || "Failed to load documentation");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!doc) return;

    try {
      setSaving(true);
      setError("");
      setSuccess(false);

      const response = await fetch(`/api/admin/documentation/${doc.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: doc.title,
          content: content,
          youtubeUrl: doc.youtubeUrl || "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save documentation");
      }

      setSuccess(true);

      // Notify parent window to refresh if opened in a new tab
      if (window.opener) {
        try {
          window.opener.postMessage({ type: 'DOCUMENTATION_UPDATED', docId: doc.id }, '*');
        } catch (e) {
          console.log('Could not notify parent window');
        }
        // Wait a moment to show success, then close
        setTimeout(() => {
          window.close();
        }, 500);
      } else {
        setTimeout(() => {
          router.push("/admin/documentation");
        }, 500);
      }
    } catch (err) {
      console.error('Save error:', err);
      setError(err.message || "Failed to save documentation");
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // If opened in a new tab, close it; otherwise redirect
    if (window.opener) {
      window.opener.postMessage({ type: 'EDITOR_CLOSED_NO_SAVE' }, '*');
      window.close();
    } else {
      router.push("/admin/documentation");
    }
  };

  if (loading) {
    return (
      <EditorContainer>
        <LoadingState>Loading documentation...</LoadingState>
      </EditorContainer>
    );
  }

  if (error && !doc) {
    return (
      <EditorContainer>
        <ErrorMessage>{error}</ErrorMessage>
        <BackButton onClick={handleCancel}>← Back to Documentation</BackButton>
      </EditorContainer>
    );
  }

  if (!doc) {
    return (
      <EditorContainer>
        <ErrorMessage>Documentation not found</ErrorMessage>
        <BackButton onClick={handleCancel}>← Back to Documentation</BackButton>
      </EditorContainer>
    );
  }

  return (
    <EditorContainer>
      <EditorHeader>
        <div>
          <EditorTitle>{doc.title}</EditorTitle>
          <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#666" }}>
            Edit content with Markdown support
          </p>
        </div>
        <BackButton onClick={handleCancel}>← Back to Documentation</BackButton>
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
          Documentation saved successfully! Closing...
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

export default DocumentationEditor;
