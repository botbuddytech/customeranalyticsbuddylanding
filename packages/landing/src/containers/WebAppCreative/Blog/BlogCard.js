import React, { useState } from 'react';
import { Icon } from 'react-icons-kit';
import { arrowRight } from 'react-icons-kit/feather/arrowRight';
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import Link from 'common/components/Link';
import BlogImagePlaceholder from './BlogImagePlaceholder';
import { Article } from './blog.style';
import { Fade } from 'react-awesome-reveal';

// Import single fallback blog image
import post1 from 'common/assets/image/webAppCreative/post1.png';

const FALLBACK_IMAGE = post1;

const BlogCard = ({ blog, index }) => {
  const [imageError, setImageError] = useState(false);
  const [fallbackError, setFallbackError] = useState(false);
  
  // Use blog image if available, otherwise use fallback
  const imageSrc = blog.imageUrl || FALLBACK_IMAGE;

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

  const handleImageError = (e) => {
    // If blog image fails, try fallback
    if (!imageError && e.target.src !== FALLBACK_IMAGE) {
      setImageError(true);
      e.target.src = FALLBACK_IMAGE;
    } else if (imageError && !fallbackError) {
      // Fallback also failed, show placeholder
      setFallbackError(true);
      e.target.style.display = 'none';
    }
  };

  return (
    <Fade direction='up' triggerOnce delay={index * 100}>
      <Article>
        <div style={{
          width: '415px',
          height: '280px',
          overflow: 'hidden',
          borderRadius: '12px',
          position: 'relative',
        }}>
          {imageError && fallbackError ? (
            // Both image and fallback failed, show placeholder
            <BlogImagePlaceholder alt={blog.title} />
          ) : (
            <img 
              src={imageError ? FALLBACK_IMAGE : imageSrc} 
              alt={blog.title}
              onError={handleImageError}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          )}
        </div>
        <Text content={formatDate(blog.updatedAt || blog.createdAt)} />
        <Heading as="h4" content={blog.title} />
        <Link 
          href={`/blog/${blog.slug}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read More <Icon icon={arrowRight} />
        </Link>
      </Article>
    </Fade>
  );
};

export default BlogCard;

