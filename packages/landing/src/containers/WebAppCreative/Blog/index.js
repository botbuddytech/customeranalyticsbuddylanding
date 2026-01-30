import React, { useEffect, useState } from 'react';
import Container from 'common/components/UI/Container';
import Heading from 'common/components/Heading';
import Loader from 'common/components/Loader';
import BlogCard from './BlogCard';

import { Section, SectionHeading, Grid } from './blog.style';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  const fetchLatestBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blogs?limit=3');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to load blogs');
      }

      setBlogs(data.blogs || []);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load blogs');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <Section id="blog">
        <Container width="1400px">
          <SectionHeading>
            <Heading content="Blogs" />
          </SectionHeading>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
            <Loader text="Loading blogs..." size="small" />
          </div>
        </Container>
      </Section>
    );
  }

  if (error) {
    return (
      <Section id="blog">
        <Container width="1400px">
          <SectionHeading>
            <Heading content="Blogs" />
          </SectionHeading>
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>
            <p>{error}</p>
          </div>
        </Container>
      </Section>
    );
  }

  if (blogs.length === 0) {
    return (
      <Section id="blog">
        <Container width="1400px">
          <SectionHeading>
            <Heading content="Blogs" />
          </SectionHeading>
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>
            <p>No blogs available yet.</p>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section id="blog">
      <Container width="1400px">
        <SectionHeading>
          <Heading content="Blogs" />
        </SectionHeading>
        <Grid>
          {blogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Blog;

