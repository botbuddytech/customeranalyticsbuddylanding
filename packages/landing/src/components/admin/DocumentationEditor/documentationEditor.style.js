import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const EditorContainer = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
`;

export const EditorHeader = styled.div`
  max-width: 1400px;
  margin: 0 auto 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 20px 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const EditorTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${themeGet('colors.headingColor', '#0d0d0d')};
  margin: 0;
`;

export const BackButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(15, 35, 52, 0.16);
  background: white;
  color: ${themeGet('colors.headingColor', '#0d0d0d')};
  font-family: inherit;

  &:hover {
    background: rgba(15, 35, 52, 0.06);
  }
`;

export const EditorWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  height: calc(100vh - 200px);
  min-height: 600px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
    min-height: 400px;
  }
`;

export const EditorPane = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const EditorTextarea = styled.textarea`
  flex: 1;
  padding: 20px;
  border: none;
  outline: none;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  resize: none;
  color: ${themeGet('colors.textColor', '#484848')};
  background: white;
`;

export const PreviewPane = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const PreviewContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  font-size: 16px;
  line-height: 1.8;
  color: ${themeGet('colors.textColor', '#484848')};

  /* Markdown styles */
  p {
    margin: 0 0 16px 0;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 24px 0 12px 0;
    color: ${themeGet('colors.headingColor', '#0d0d0d')};
    font-weight: 700;
  }

  h1 { font-size: 32px; }
  h2 { font-size: 28px; }
  h3 { font-size: 24px; }
  h4 { font-size: 20px; }

  ul, ol {
    margin: 16px 0;
    padding-left: 24px;
  }

  li {
    margin: 8px 0;
  }

  code {
    background: rgba(15, 35, 52, 0.08);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 14px;
    font-family: 'Courier New', monospace;
  }

  pre {
    background: rgba(15, 35, 52, 0.05);
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 16px 0;

    code {
      background: transparent;
      padding: 0;
    }
  }

  a {
    color: ${themeGet('colors.primary', '#028489')};
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: all 0.2s ease;

    &:hover {
      border-bottom-color: ${themeGet('colors.primary', '#028489')};
    }
  }

  blockquote {
    border-left: 4px solid ${themeGet('colors.primary', '#028489')};
    padding-left: 16px;
    margin: 16px 0;
    color: ${themeGet('colors.textColor', '#666666')};
    font-style: italic;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
  }

  th, td {
    border: 1px solid rgba(15, 35, 52, 0.1);
    padding: 8px 12px;
    text-align: left;
  }

  th {
    background: rgba(15, 35, 52, 0.05);
    font-weight: 600;
  }
`;

export const EditorActions = styled.div`
  max-width: 1400px;
  margin: 20px auto 0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: white;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SaveButton = styled.button`
  padding: 10px 24px;
  border-radius: 6px;
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
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(15, 35, 52, 0.16);
  background: white;
  color: ${themeGet('colors.headingColor', '#0d0d0d')};
  font-family: inherit;

  &:hover:not(:disabled) {
    background: rgba(15, 35, 52, 0.06);
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
  padding: 16px;
  background: #fee;
  color: #c33;
  border-radius: 8px;
  margin: 20px auto;
  max-width: 1400px;
  text-align: center;
  font-size: 14px;
`;
