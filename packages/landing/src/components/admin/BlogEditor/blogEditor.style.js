import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const EditorContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 24px;
  display: flex;
  flex-direction: column;
  background: #fafafa;
  box-sizing: border-box;
`;

export const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: wrap;
`;

export const EditorTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${themeGet('colors.headingColor', '#0d0d0d')};
  margin: 0;
`;

export const BackButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1.5px solid rgba(15, 35, 52, 0.16);
  background: white;
  color: ${themeGet('colors.headingColor', '#0d0d0d')};
  font-family: inherit;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: rgba(15, 35, 52, 0.06);
    border-color: ${themeGet('colors.primary', '#028489')};
    color: ${themeGet('colors.primary', '#028489')};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const EditorWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border: 1px solid rgba(15, 35, 52, 0.16);
  border-radius: 12px;
  overflow: hidden;
  background: white;
  flex: 1;
  min-height: 0;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

export const EditorPane = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(15, 35, 52, 0.16);

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid rgba(15, 35, 52, 0.16);
  }
`;

export const EditorTextarea = styled.textarea`
  flex: 1;
  width: 100%;
  padding: 20px;
  border: none;
  font-size: 14px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
  line-height: 1.6;
  resize: none;
  outline: none;
  background: white;
  color: ${themeGet('colors.headingColor', '#0d0d0d')};

  &::placeholder {
    color: ${themeGet('colors.textColor', '#999999')};
  }
`;

export const PreviewPane = styled.div`
  display: flex;
  flex-direction: column;
  background: #fafafa;
  overflow: hidden;
`;

export const PreviewContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  font-size: 14px;
  line-height: 1.8;
  color: ${themeGet('colors.headingColor', '#0d0d0d')};

  /* Markdown styling */
  h1, h2, h3, h4, h5, h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 700;
    color: ${themeGet('colors.headingColor', '#0d0d0d')};
  }

  h1 {
    font-size: 32px;
    border-bottom: 2px solid rgba(15, 35, 52, 0.08);
    padding-bottom: 8px;
  }

  h2 {
    font-size: 24px;
    border-bottom: 1px solid rgba(15, 35, 52, 0.08);
    padding-bottom: 6px;
  }

  h3 {
    font-size: 20px;
  }

  h4 {
    font-size: 18px;
  }

  p {
    margin-bottom: 16px;
    color: ${themeGet('colors.textColor', '#666666')};
  }

  ul, ol {
    margin-bottom: 16px;
    padding-left: 24px;
    color: ${themeGet('colors.textColor', '#666666')};
  }

  li {
    margin-bottom: 8px;
  }

  code {
    background: rgba(15, 35, 52, 0.08);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
    font-size: 13px;
    color: ${themeGet('colors.primary', '#028489')};
  }

  pre {
    background: rgba(15, 35, 52, 0.08);
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    margin-bottom: 16px;

    code {
      background: none;
      padding: 0;
      color: ${themeGet('colors.headingColor', '#0d0d0d')};
    }
  }

  blockquote {
    border-left: 4px solid ${themeGet('colors.primary', '#028489')};
    padding-left: 16px;
    margin: 16px 0;
    color: ${themeGet('colors.textColor', '#666666')};
    font-style: italic;
  }

  a {
    color: ${themeGet('colors.primary', '#028489')};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 16px;

    th, td {
      padding: 12px;
      border: 1px solid rgba(15, 35, 52, 0.16);
      text-align: left;
    }

    th {
      background: rgba(15, 35, 52, 0.06);
      font-weight: 600;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 16px 0;
  }

  hr {
    border: none;
    border-top: 1px solid rgba(15, 35, 52, 0.16);
    margin: 24px 0;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;

    &:hover {
      background: #a8a8a8;
    }
  }
`;

export const EditorActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid rgba(15, 35, 52, 0.08);
`;

export const SaveButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background: ${themeGet('colors.primary', '#028489')};
  color: white;
  font-family: inherit;

  &:hover:not(:disabled) {
    background: ${themeGet('colors.primaryHover', '#027275')};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1.5px solid rgba(15, 35, 52, 0.16);
  background: white;
  color: ${themeGet('colors.headingColor', '#0d0d0d')};
  font-family: inherit;

  &:hover:not(:disabled) {
    background: rgba(15, 35, 52, 0.06);
    border-color: ${themeGet('colors.primary', '#028489')};
    color: ${themeGet('colors.primary', '#028489')};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${themeGet('colors.textColor', '#666666')};
  font-size: 16px;
`;

export const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: #fee;
  color: #c33;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
`;

