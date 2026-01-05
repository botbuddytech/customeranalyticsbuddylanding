import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const BlogSection = styled.div`
  text-align: left;
  margin-top: 24px;
`;

export const BlogHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
  position: sticky;
  top: 0;
  background: #ffffff;
  z-index: 10;
  padding: 24px 36px 20px 36px;
  margin-top: -40px;
  margin-left: -36px;
  margin-right: -36px;
  border-bottom: 1px solid rgba(15, 35, 52, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  /* Cover the gap created by negative margin-top */
  &::before {
    content: '';
    position: absolute;
    top: -40px;
    left: 0;
    right: 0;
    height: 40px;
    background: #ffffff;
  }

  h3 {
    font-size: 24px;
    font-weight: 700;
    color: ${themeGet('colors.headingColor', '#0d0d0d')};
    margin: 0;
  }

  @media (max-width: 768px) {
    margin-top: -24px;
    margin-left: -20px;
    margin-right: -20px;
    padding: 20px 20px 16px 20px;

    &::before {
      top: -24px;
      height: 24px;
    }
  }
`;

export const BlogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const BlogCard = styled.div`
  background: #ffffff;
  border: 1px solid rgba(15, 35, 52, 0.08);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  gap: 20px;
  align-items: flex-start;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: ${themeGet('colors.primary', '#028489')};
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const BlogCardImage = styled.div`
  width: 120px;
  height: 120px;
  min-width: 120px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(15, 35, 52, 0.08);
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
    min-width: 100%;
  }
`;

export const BlogCardBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0; /* Allow text truncation */
`;

export const BlogCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
`;

export const BlogCardTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: ${themeGet('colors.headingColor', '#0d0d0d')};
  margin: 0;
  flex: 1;
`;

export const BlogCardMeta = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 12px;
  color: ${themeGet('colors.textColor', '#666666')};
`;

export const BlogCardContent = styled.p`
  font-size: 14px;
  color: ${themeGet('colors.textColor', '#666666')};
  margin: 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`;

export const EditContentButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1.5px solid ${themeGet('colors.primary', '#028489')};
  background: transparent;
  color: ${themeGet('colors.primary', '#028489')};
  font-family: inherit;
  width: 100%;
  margin-top: 12px;

  &:hover {
    background: ${themeGet('colors.primary', '#028489')};
    color: white;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(2, 132, 137, 0.1);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999 !important;
  padding: 20px;
  padding-top: 100px; /* Safe distance from navbar */
  backdrop-filter: blur(4px);

  /* Ensure modal is always above navbar, regardless of scroll state */
  & > * {
    z-index: 99999 !important;
  }

  @media (max-width: 768px) {
    padding-top: 80px; /* Smaller navbar on mobile */
  }
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 1200px;
  width: 100%;
  max-height: calc(90vh - 100px); /* Account for navbar space */
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 99999 !important;

  /* Hide scrollbar but keep functionality */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  @media (max-width: 1280px) {
    max-width: 95%;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 24px;
    max-height: calc(90vh - 80px); /* Account for smaller navbar on mobile */
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(15, 35, 52, 0.08);

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: ${themeGet('colors.headingColor', '#0d0d0d')};
    margin: 0;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${themeGet('colors.textColor', '#666666')};
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  position: relative;
  z-index: 100000 !important;
  pointer-events: auto;

  &:hover {
    background: rgba(15, 35, 52, 0.08);
    color: ${themeGet('colors.headingColor', '#0d0d0d')};
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: ${themeGet('colors.headingColor', '#0d0d0d')};
  margin-bottom: 8px;

  .optional {
    font-weight: 400;
    color: ${themeGet('colors.textColor', '#666666')};
    font-size: 12px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid rgba(15, 35, 52, 0.16);
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${themeGet('colors.primary', '#028489')};
    box-shadow: 0 0 0 3px rgba(2, 132, 137, 0.1);
  }

  &::placeholder {
    color: ${themeGet('colors.textColor', '#999999')};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid rgba(15, 35, 52, 0.16);
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  min-height: 200px;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${themeGet('colors.primary', '#028489')};
    box-shadow: 0 0 0 3px rgba(2, 132, 137, 0.1);
  }

  &::placeholder {
    color: ${themeGet('colors.textColor', '#999999')};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(15, 35, 52, 0.08);
`;

export const ActionButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-family: inherit;

  &.primary {
    background: ${themeGet('colors.primary', '#028489')};
    color: white;

    &:hover:not(:disabled) {
      background: ${themeGet('colors.primaryHover', '#027275')};
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &.danger {
    background: #ef4444;
    color: white;

    &:hover:not(:disabled) {
      background: #dc2626;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &.secondary {
    background: rgba(15, 35, 52, 0.06);
    color: ${themeGet('colors.headingColor', '#0d0d0d')};

    &:hover {
      background: rgba(15, 35, 52, 0.12);
    }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${themeGet('colors.textColor', '#666666')};

  p {
    font-size: 16px;
    margin: 0;
  }
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 40px;
  color: ${themeGet('colors.textColor', '#666666')};
`;

export const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ImageUploadLeft = styled.div`
  flex: 1;
  min-width: 300px;
`;

export const ImagePreviewRight = styled.div`
  flex: 1;
  min-width: 300px;
`;

export const ImageUploadArea = styled.div`
  border: 2px dashed ${themeGet('colors.primary', '#028489')};
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  background: ${props => props.isDragging ? 'rgba(2, 132, 137, 0.05)' : 'rgba(2, 132, 137, 0.02)'};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  user-select: none;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(2, 132, 137, 0.05);
    border-color: ${themeGet('colors.primaryHover', '#027275')};
  }

  input[type="file"] {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    cursor: pointer;
    z-index: 1;
  }
`;

export const ImageUploadIcon = styled.div`
  font-size: 48px;
  color: ${themeGet('colors.primary', '#028489')};
  margin-bottom: 12px;
`;

export const ImageUploadText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${themeGet('colors.headingColor', '#0d0d0d')};
  margin-bottom: 8px;
`;

export const ImageUploadHint = styled.div`
  font-size: 13px;
  color: ${themeGet('colors.textColor', '#666666')};
  margin-bottom: 4px;
`;

export const ImageSizeInfo = styled.div`
  font-size: 12px;
  color: ${themeGet('colors.textColor', '#999999')};
  margin-top: 8px;
  padding: 8px 12px;
  background: rgba(15, 35, 52, 0.04);
  border-radius: 6px;
  display: inline-block;
`;

export const ImagePreviewContainer = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid rgba(15, 35, 52, 0.08);
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 415px;
  height: 280px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 415px;
    height: auto;
    aspect-ratio: 415 / 280;
  }
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const ImagePreviewOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  gap: 12px;

  ${ImagePreviewContainer}:hover & {
    opacity: 1;
  }
`;

export const RemoveImageButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background: #ef4444;
  color: white;
  font-family: inherit;

  &:hover {
    background: #dc2626;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
  }
`;

export const ImageUploadLabel = styled.label`
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid ${themeGet('colors.primary', '#028489')};
  background: ${themeGet('colors.primary', '#028489')};
  color: white;
  font-family: inherit;
  margin-top: 16px;

  &:hover {
    background: ${themeGet('colors.primaryHover', '#027275')};
    border-color: ${themeGet('colors.primaryHover', '#027275')};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(2, 132, 137, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ImageUploadInput = styled.input`
  display: none;
`;

