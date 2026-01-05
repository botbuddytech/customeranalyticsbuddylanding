import React from 'react';
import { Icon } from 'react-icons-kit';
import { image } from 'react-icons-kit/feather/image';
import { PlaceholderContainer, PlaceholderIcon, PlaceholderText } from './blog.style';

/**
 * BlogImagePlaceholder Component
 * Displays a placeholder with an error icon when blog images fail to load
 * Fixed dimensions: 415x280px (matches blog image dimensions)
 */
const BlogImagePlaceholder = ({ alt = 'Image not available' }) => {
  return (
    <PlaceholderContainer>
      <PlaceholderIcon>
        <Icon icon={image} size={64} />
      </PlaceholderIcon>
      <PlaceholderText>Image not available</PlaceholderText>
    </PlaceholderContainer>
  );
};

export default BlogImagePlaceholder;

