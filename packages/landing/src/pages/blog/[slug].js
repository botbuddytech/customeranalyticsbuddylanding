import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ThemeProvider } from "styled-components";
import Sticky from "react-stickynode";
import { DrawerProvider } from "common/contexts/DrawerContext";
import { theme } from "common/theme/webAppCreative";
import ResetCSS from "common/assets/css/style";
import Navbar from "containers/WebAppCreative/Navbar";
import Footer from "containers/WebAppCreative/Footer";
import Loader from "common/components/Loader";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  GlobalStyle,
  ContentWrapper,
} from "containers/WebAppCreative/webAppCreative.style";
import {
  BlogPageSection,
  BlogContainer,
  BlogHeader,
  BlogTitle,
  BlogMeta,
  BlogImage,
  BlogContent,
  VideoContainer,
  BlogImagePlaceholder,
} from "containers/WebAppCreative/Blog/blogPage.style";

export default function BlogPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`/api/blogs/${slug}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Blog not found");
      }

      setBlog(data.blog);
    } catch (err) {
      setError(err.message || "Failed to load blog");
    } finally {
      setLoading(false);
    }
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : null;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <Head>
            <title>Loading Blog - Customer Analytics Buddy</title>
          </Head>
          <ResetCSS />
          <GlobalStyle />
          <ContentWrapper>
            <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
              <DrawerProvider>
                <Navbar />
              </DrawerProvider>
            </Sticky>
            <BlogPageSection>
              <BlogContainer>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "80px 20px",
                  }}
                >
                  <Loader text="Loading blog..." size="large" />
                </div>
              </BlogContainer>
            </BlogPageSection>
            <Footer />
          </ContentWrapper>
        </Fragment>
      </ThemeProvider>
    );
  }

  if (error || !blog) {
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <Head>
            <title>Blog Not Found - Customer Analytics Buddy</title>
          </Head>
          <ResetCSS />
          <GlobalStyle />
          <ContentWrapper>
            <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
              <DrawerProvider>
                <Navbar />
              </DrawerProvider>
            </Sticky>
            <BlogPageSection>
              <BlogContainer>
                <div
                  style={{
                    textAlign: "center",
                    padding: "80px 20px",
                    color: "#666",
                  }}
                >
                  <h2>Blog Not Found</h2>
                  <p>{error || "The blog you're looking for doesn't exist."}</p>
                </div>
              </BlogContainer>
            </BlogPageSection>
            <Footer />
          </ContentWrapper>
        </Fragment>
      </ThemeProvider>
    );
  }

  const embedUrl = getYouTubeEmbedUrl(blog.youtubeUrl);

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>{blog.title} - Customer Analytics Buddy</title>
          <meta
            name="description"
            content={`${blog.title} - Read our latest blog post about Customer Analytics Buddy.`}
          />
        </Head>
        <ResetCSS />
        <GlobalStyle />
        <ContentWrapper>
          <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
            <DrawerProvider>
              <Navbar />
            </DrawerProvider>
          </Sticky>
          <BlogPageSection>
            <BlogContainer>
              <BlogHeader>
                <BlogTitle>{blog.title}</BlogTitle>
                <BlogMeta>
                  <span>Published: {formatDate(blog.createdAt)}</span>
                  {blog.updatedAt !== blog.createdAt && (
                    <span>Updated: {formatDate(blog.updatedAt)}</span>
                  )}
                </BlogMeta>
              </BlogHeader>

              {blog.imageUrl && (
                <BlogImage>
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <BlogImagePlaceholder style={{ display: "none" }}>
                    <span>Image not available</span>
                  </BlogImagePlaceholder>
                </BlogImage>
              )}

              {embedUrl && (
                <VideoContainer>
                  <iframe
                    src={embedUrl}
                    title={blog.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </VideoContainer>
              )}

              <BlogContent>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {blog.content}
                </ReactMarkdown>
              </BlogContent>
            </BlogContainer>
          </BlogPageSection>
          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
}
