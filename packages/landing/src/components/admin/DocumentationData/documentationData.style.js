import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const DocumentationSection = styled.div`
  text-align: left;
  margin-top: 24px;
`;

export const DocumentationHeader = styled.div`
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

export const DocumentationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DocumentationCard = styled.div`
  background: #ffffff;
  border: 1px solid rgba(15, 35, 52, 0.08);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  gap: 24px;
  align-items: flex-start;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: ${themeGet('colors.primary', '#028489')};
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const DocumentationCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
  flex-wrap: wrap;
`;

export const DocumentationCardTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: ${themeGet('colors.headingColor', '#0d0d0d')};
  margin: 0;
  flex: 1;
`;

export const DocumentationCardMeta = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 12px;
  color: ${themeGet('colors.textColor', '#666666')};
`;

export const DocumentationCardContent = styled.p`
  font-size: 14px;
  color: ${themeGet('colors.textColor', '#666666')};
  margin: 0 0 16px 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
  backdrop-filter: blur(4px);
  padding-top: 100px;

  @media (max-width: 768px) {
    padding-top: 80px;
  }
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 800px;
  width: 100%;
  max-height: calc(90vh - 100px);
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
  position: relative;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 20px;
    max-height: calc(90vh - 80px);
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
