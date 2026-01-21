import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const BlogPageSection = styled.section`
  padding-top: 100px; /* Account for navbar */
  padding-bottom: 60px;
  min-height: calc(100vh - 100px);
  
  @media screen and (max-width: 768px) {
    padding-top: 80px;
    padding-bottom: 40px;
  }
`;

export const BlogContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  
  @media screen and (max-width: 768px) {
    padding: 0 16px;
  }
`;

export const BlogHeader = styled.div`
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 2px solid rgba(15, 35, 52, 0.1);
`;

export const BlogTitle = styled.h1`
  font-size: 42px;
  font-weight: 700;
  line-height: 1.2;
  color: ${themeGet('colors.headingColor', '#0d0d0d')};
  margin: 0 0 16px 0;
  
  @media screen and (max-width: 768px) {
    font-size: 32px;
  }
  
  @media screen and (max-width: 480px) {
    font-size: 28px;
  }
`;

export const BlogMeta = styled.div`
  display: flex;
  gap: 24px;
  font-size: 14px;
  color: ${themeGet('colors.textColor', '#666666')};
  
  @media screen and (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const BlogImage = styled.div`
  width: 100%;
  margin-bottom: 32px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  background: #f8f9fa;
  
  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }
`;

export const BlogImagePlaceholder = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf0 100%);
  border: 2px dashed rgba(15, 35, 52, 0.16);
  color: ${themeGet('colors.textColor', '#999999')};
  font-size: 16px;
`;

export const BlogContent = styled.div`
  font-size: 18px;
  line-height: 1.8;
  color: ${themeGet('colors.textColor', '#484848')};
  word-wrap: break-word;
  
  /* Markdown paragraph styles */
  p {
    margin: 0 0 20px 0;
    line-height: 1.8;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  /* Markdown heading styles */
  h1, h2, h3, h4, h5, h6 {
    margin: 32px 0 16px 0;
    color: ${themeGet('colors.headingColor', '#0d0d0d')};
    font-weight: 700;
    line-height: 1.3;
    
    &:first-child {
      margin-top: 0;
    }
  }
  
  h1 {
    font-size: 36px;
    margin-top: 0;
  }
  
  h2 {
    font-size: 30px;
    border-bottom: 2px solid rgba(15, 35, 52, 0.1);
    padding-bottom: 8px;
  }
  
  h3 {
    font-size: 26px;
  }
  
  h4 {
    font-size: 22px;
  }
  
  h5 {
    font-size: 20px;
  }
  
  h6 {
    font-size: 18px;
  }
  
  /* Markdown list styles */
  ul, ol {
    margin: 20px 0;
    padding-left: 28px;
  }
  
  li {
    margin: 10px 0;
    line-height: 1.8;
  }
  
  ul {
    list-style-type: disc;
  }
  
  ol {
    list-style-type: decimal;
  }
  
  /* Markdown code styles */
  code {
    background: rgba(15, 35, 52, 0.08);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 16px;
    font-family: 'Courier New', monospace;
    color: ${themeGet('colors.primary', '#028489')};
  }
  
  pre {
    background: rgba(15, 35, 52, 0.05);
    padding: 20px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 24px 0;
    border-left: 4px solid ${themeGet('colors.primary', '#028489')};
    
    code {
      background: transparent;
      padding: 0;
      color: ${themeGet('colors.textColor', '#484848')};
    }
  }
  
  /* Markdown link styles */
  a {
    color: ${themeGet('colors.primary', '#028489')};
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: all 0.2s ease;
    
    &:hover {
      border-bottom-color: ${themeGet('colors.primary', '#028489')};
    }
  }
  
  /* Markdown blockquote styles */
  blockquote {
    border-left: 4px solid ${themeGet('colors.primary', '#028489')};
    padding-left: 20px;
    margin: 24px 0;
    color: ${themeGet('colors.textColor', '#666666')};
    font-style: italic;
    background: rgba(2, 132, 137, 0.05);
    padding: 20px;
    border-radius: 4px;
  }
  
  /* Markdown table styles */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 24px 0;
    font-size: 16px;
  }
  
  th, td {
    border: 1px solid rgba(15, 35, 52, 0.1);
    padding: 12px;
    text-align: left;
  }
  
  th {
    background: rgba(15, 35, 52, 0.05);
    font-weight: 600;
    color: ${themeGet('colors.headingColor', '#0d0d0d')};
  }
  
  tr:nth-child(even) {
    background: rgba(15, 35, 52, 0.02);
  }
  
  /* Markdown horizontal rule */
  hr {
    border: none;
    border-top: 2px solid rgba(15, 35, 52, 0.1);
    margin: 40px 0;
  }
  
  /* Markdown strong and emphasis */
  strong {
    font-weight: 700;
    color: ${themeGet('colors.headingColor', '#0d0d0d')};
  }
  
  em {
    font-style: italic;
  }
`;

export const VideoContainer = styled.div`
  width: 100%;
  margin-bottom: 32px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;
