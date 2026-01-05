import React, { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Loader from "common/components/Loader";
import {
  Section,
  DocumentationWrapper,
  Header,
  SplitLayout,
  Sidebar,
  ResizeHandle,
  SidebarHeader,
  SidebarTitle,
  SidebarSubtitle,
  SortControl,
  SortSelect,
  BlogList,
  BlogListItem,
  BlogListButton,
  ContentArea,
  ContentTitle,
  ContentText,
  VideoContainer,
  EmptyState,
  ShareButton,
} from "./documentation.style";

const Documentation = () => {
  const router = useRouter();
  const { topic } = router.query;
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState("oldest"); // "newest" or "oldest"
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("docs-sidebar-width");
      return saved ? parseInt(saved, 10) : 350;
    }
    return 350;
  });
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef(null);

  // Fetch blog list (titles only)
  useEffect(() => {
    fetchBlogList();
  }, []);

  // Load blog from URL or select first one
  useEffect(() => {
    if (blogs.length > 0 && !contentLoading) {
      if (topic) {
        if (
          !selectedBlog ||
          (selectedBlog.slug !== topic && selectedBlog.id.toString() !== topic)
        ) {
          fetchBlogContent(topic);
        }
      } else if (!selectedBlog) {
        // Auto-select first blog if no topic in URL (after sorting)
        const sorted = [...blogs].sort((a, b) =>
          sortOrder === "newest" ? b.id - a.id : a.id - b.id
        );
        if (sorted.length > 0) {
          handleBlogSelect(sorted[0]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogs, topic, sortOrder]);

  const fetchBlogList = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/blogs");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load blogs");
      }

      const fetchedBlogs = data.blogs || [];
      setBlogs(fetchedBlogs);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogContent = async (slugOrId) => {
    try {
      setContentLoading(true);
      const response = await fetch(`/api/blogs/${slugOrId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load blog content");
      }

      setSelectedBlog(data.blog);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load blog content");
    } finally {
      setContentLoading(false);
    }
  };

  const handleBlogSelect = (blog) => {
    const slug = blog.slug || blog.id;
    // Update URL without page reload using slug
    router.push(`/documentation?topic=${slug}`, undefined, { shallow: true });
    fetchBlogContent(slug);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Sort blogs based on selected order (by ID)
  const sortedBlogs = [...blogs].sort((a, b) => {
    if (sortOrder === "newest") {
      return b.id - a.id; // Highest ID first (newest)
    } else {
      return a.id - b.id; // Lowest ID first (oldest)
    }
  });

  // Resize handlers
  const MIN_SIDEBAR_WIDTH = 250;
  const MAX_SIDEBAR_WIDTH = 600;

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      setIsResizing(true);
      resizeRef.current = {
        startX: e.clientX,
        startWidth: sidebarWidth,
      };
    },
    [sidebarWidth]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isResizing || !resizeRef.current) return;

      const deltaX = e.clientX - resizeRef.current.startX;
      const newWidth = resizeRef.current.startWidth + deltaX;
      const clampedWidth = Math.max(
        MIN_SIDEBAR_WIDTH,
        Math.min(MAX_SIDEBAR_WIDTH, newWidth)
      );

      setSidebarWidth(clampedWidth);
    },
    [isResizing]
  );

  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
      if (typeof window !== "undefined") {
        localStorage.setItem("docs-sidebar-width", sidebarWidth.toString());
      }
      resizeRef.current = null;
    }
  }, [isResizing, sidebarWidth]);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const handleShare = async () => {
    if (!selectedBlog) return;

    const slug = selectedBlog.slug || selectedBlog.id;
    const url = `${window.location.origin}/documentation?topic=${slug}`;

    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("Link copied to clipboard!");
    }
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;

    // Handle different YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
    }

    return null;
  };

  const renderContent = () => {
    if (contentLoading) {
      return <Loader text="Loading content..." />;
    }

    if (!selectedBlog) {
      return (
        <EmptyState>
          <p>Select a topic from the sidebar to view documentation.</p>
        </EmptyState>
      );
    }

    const embedUrl = getYouTubeEmbedUrl(selectedBlog.youtubeUrl);

    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "24px",
          }}
        >
          <ContentTitle>{selectedBlog.title}</ContentTitle>
          <ShareButton onClick={handleShare} title="Share this topic">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 13.442C14.389 13.442 13.82 13.654 13.36 14.01L7.36 10.677C7.42 10.46 7.45 10.23 7.45 10C7.45 9.77 7.42 9.54 7.36 9.323L13.31 6.023C13.78 6.41 14.37 6.64 15 6.64C16.38 6.64 17.5 5.52 17.5 4.14C17.5 2.76 16.38 1.64 15 1.64C13.62 1.64 12.5 2.76 12.5 4.14C12.5 4.37 12.53 4.6 12.59 4.817L6.64 8.117C6.17 7.73 5.58 7.5 4.95 7.5C3.57 7.5 2.45 8.62 2.45 10C2.45 11.38 3.57 12.5 4.95 12.5C5.58 12.5 6.17 12.27 6.64 11.883L12.64 15.216C12.58 15.433 12.55 15.66 12.55 15.89C12.55 17.24 13.66 18.35 15.01 18.35C16.36 18.35 17.47 17.24 17.47 15.89C17.47 14.54 16.36 13.43 15.01 13.43L15 13.442Z"
                fill="currentColor"
              />
            </svg>
          </ShareButton>
        </div>
        {embedUrl && (
          <VideoContainer>
            <iframe
              src={embedUrl}
              title={selectedBlog.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </VideoContainer>
        )}
        <ContentText>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {selectedBlog.content}
          </ReactMarkdown>
        </ContentText>
      </>
    );
  };

  if (loading) {
    return (
      <Section>
        <DocumentationWrapper>
          <Loader text="Loading documentation..." size="large" />
        </DocumentationWrapper>
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <DocumentationWrapper>
          <EmptyState>
            <p>Error: {error}</p>
          </EmptyState>
        </DocumentationWrapper>
      </Section>
    );
  }

  return (
    <Section>
      <DocumentationWrapper>
        <Header>
          <Heading content="Documentation" />
          <Text content="Welcome to the Customer Analytics Buddy documentation" />
        </Header>

        <SplitLayout sidebarWidth={sidebarWidth}>
          <Sidebar>
            <ResizeHandle
              onMouseDown={handleMouseDown}
              isResizing={isResizing}
            />
            <SidebarHeader>
              <SidebarTitle>Documentation</SidebarTitle>
              <SidebarSubtitle>
                {blogs.length} {blogs.length === 1 ? "topic" : "topics"}{" "}
                available
              </SidebarSubtitle>
              {blogs.length > 0 && (
                <SortControl>
                  <label htmlFor="sort-select">Sort:</label>
                  <SortSelect
                    id="sort-select"
                    value={sortOrder}
                    onChange={handleSortChange}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </SortSelect>
                </SortControl>
              )}
            </SidebarHeader>
            {blogs.length === 0 ? (
              <EmptyState>
                <p>No documentation available yet.</p>
              </EmptyState>
            ) : (
              <BlogList>
                {sortedBlogs.map((blog) => (
                  <BlogListItem key={blog.id}>
                    <BlogListButton
                      active={
                        selectedBlog?.id === blog.id ||
                        selectedBlog?.slug === blog.slug
                      }
                      onClick={() => handleBlogSelect(blog)}
                    >
                      {blog.title}
                    </BlogListButton>
                  </BlogListItem>
                ))}
              </BlogList>
            )}
          </Sidebar>

          <ContentArea>{renderContent()}</ContentArea>
        </SplitLayout>
      </DocumentationWrapper>
    </Section>
  );
};

export default Documentation;
