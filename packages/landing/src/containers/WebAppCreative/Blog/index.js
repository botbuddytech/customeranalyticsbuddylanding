import React, { useEffect, useState } from 'react';
import { Icon } from 'react-icons-kit';
import { arrowRight } from 'react-icons-kit/feather/arrowRight';
import Container from 'common/components/UI/Container';
import Heading from 'common/components/Heading';
import NextImage from 'common/components/NextImage';
import Text from 'common/components/Text';
import Link from 'common/components/Link';
import Loader from 'common/components/Loader';

// Import fallback blog images
import post1 from 'common/assets/image/webAppCreative/post1.png';
import post2 from 'common/assets/image/webAppCreative/post2.png';
import post3 from 'common/assets/image/webAppCreative/post3.png';

import { Section, SectionHeading, Grid, Article } from './blog.style';
import { Fade } from 'react-awesome-reveal';

// Fallback images array - cycle through available images
const FALLBACK_IMAGES = [post1, post2, post3];

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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
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
          {blogs.map((blog, index) => {
            // Cycle through fallback images based on index
            const fallbackImage = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
            
            return (
              <Fade key={blog.id} direction='up' triggerOnce delay={index * 100}>
                <Article>
                  <NextImage 
                    src={fallbackImage} 
                    alt={blog.title}
                    width={415}
                    height={280}
                  />
                  <Text content={formatDate(blog.updatedAt || blog.createdAt)} />
                  <Heading as="h4" content={blog.title} />
                  <Link 
                    href={`/documentation?topic=${blog.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More <Icon icon={arrowRight} />
                  </Link>
                </Article>
              </Fade>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
};

export default Blog;

