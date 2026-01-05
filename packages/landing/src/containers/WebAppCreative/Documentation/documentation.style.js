import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const Section = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${themeGet("colors.light", "#f8f9fa")};
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media only screen and (max-width: 768px) {
    position: relative;
    min-height: 100vh;
  }
`;

export const DocumentationWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
`;

export const Header = styled.header`
  text-align: center;
  padding: 24px 40px;
  background: ${themeGet("colors.white", "#ffffff")};
  border-bottom: 1px solid rgba(15, 35, 52, 0.08);
  flex-shrink: 0;

  @media only screen and (max-width: 768px) {
    padding: 20px;
  }
`;

export const SplitLayout = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.sidebarWidth || 350}px 1fr;
  gap: 0;
  flex: 1;
  overflow: hidden;
  height: 100%;
  position: relative;

  @media only screen and (max-width: 1024px) {
    grid-template-columns: ${(props) =>
        Math.min(props.sidebarWidth || 350, 300)}px 1fr;
  }

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    height: auto;
    flex-direction: column;
  }
`;

export const Sidebar = styled.aside`
  background: linear-gradient(
    180deg,
    ${themeGet("colors.white", "#ffffff")} 0%,
    ${themeGet("colors.light", "#f8f9fa")} 100%
  );
  border-right: 1px solid rgba(15, 35, 52, 0.08);
  padding: 0;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  /* Hide scrollbar but keep functionality */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  @media only screen and (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid rgba(15, 35, 52, 0.08);
    height: 300px;
    flex-shrink: 0;
  }
`;

export const ResizeHandle = styled.div`
  position: absolute;
  top: 0;
  right: -4px;
  width: 8px;
  height: 100%;
  cursor: col-resize;
  z-index: 10;
  background: ${(props) =>
    props.isResizing ? "rgba(2, 132, 137, 0.15)" : "transparent"};
  transition: background 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.isResizing ? "rgba(2, 132, 137, 0.15)" : "rgba(2, 132, 137, 0.1)"};
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: ${(props) => (props.isResizing ? "0px" : "2px")};
    transform: translateY(-50%);
    width: ${(props) => (props.isResizing ? "5px" : "2px")};
    height: ${(props) => (props.isResizing ? "80px" : "40px")};
    background: ${(props) =>
      props.isResizing
        ? themeGet("colors.primary", "#028489")
        : "rgba(15, 35, 52, 0.2)"};
    border-radius: ${(props) => (props.isResizing ? "2px" : "1px")};
    transition: all 0.2s ease;
  }

  &:hover::after {
    background: ${(props) =>
      props.isResizing
        ? themeGet("colors.primary", "#028489")
        : themeGet("colors.primary", "#028489")};
    width: ${(props) => (props.isResizing ? "5px" : "4px")};
    height: ${(props) => (props.isResizing ? "80px" : "60px")};
    right: ${(props) => (props.isResizing ? "0px" : "1px")};
  }

  @media only screen and (max-width: 768px) {
    display: none;
  }

  /* Hide scrollbar but keep functionality */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

export const SidebarHeader = styled.div`
  padding: 28px 24px;
  background: ${themeGet("colors.white", "#ffffff")};
  border-bottom: 2px solid rgba(15, 35, 52, 0.08);
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
`;

export const SidebarTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${themeGet("colors.headingColor", "#0d0d0d")};
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: "";
    width: 4px;
    height: 20px;
    background: ${themeGet("colors.primary", "#028489")};
    border-radius: 2px;
    display: block;
  }
`;

export const SidebarSubtitle = styled.p`
  font-size: 13px;
  color: ${themeGet("colors.textColor", "#666666")};
  margin: 0;
  font-weight: 500;
`;

export const SortControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(15, 35, 52, 0.08);

  label {
    font-size: 13px;
    font-weight: 600;
    color: ${themeGet("colors.headingColor", "#0d0d0d")};
    white-space: nowrap;
  }
`;

export const SortSelect = styled.select`
  flex: 1;
  padding: 8px 12px;
  border: 1.5px solid rgba(15, 35, 52, 0.12);
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: ${themeGet("colors.headingColor", "#0d0d0d")};
  background: ${themeGet("colors.white", "#ffffff")};
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23028489' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 32px;

  &:hover {
    border-color: ${themeGet("colors.primary", "#028489")};
  }

  &:focus {
    outline: none;
    border-color: ${themeGet("colors.primary", "#028489")};
    box-shadow: 0 0 0 3px rgba(2, 132, 137, 0.1);
  }
`;

export const BlogList = styled.ul`
  list-style: none;
  padding: 16px 24px;
  margin: 0;
  flex: 1;
`;

export const BlogListItem = styled.li`
  margin-bottom: 4px;
  position: relative;
`;

export const BlogListButton = styled.button`
  width: 100%;
  text-align: left;
  padding: 12px 0;
  background: transparent;
  border: none;
  color: ${(props) =>
    props.active
      ? themeGet("colors.primary", "#028489")
      : themeGet("colors.headingColor", "#0d0d0d")};
  font-size: 15px;
  font-weight: ${(props) => (props.active ? 600 : 500)};
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: "";
    width: 3px;
    height: ${(props) => (props.active ? "20px" : "0px")};
    background: ${themeGet("colors.primary", "#028489")};
    border-radius: 0 2px 2px 0;
    position: absolute;
    left: -16px;
    transition: height 0.2s ease;
    opacity: ${(props) => (props.active ? 1 : 0)};
  }

  &:hover {
    color: ${themeGet("colors.primary", "#028489")};
    padding-left: ${(props) => (props.active ? "0" : "8px")};

    &::before {
      height: ${(props) => (props.active ? "20px" : "16px")};
      opacity: 1;
    }
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ContentArea = styled.div`
  background: ${themeGet("colors.white", "#ffffff")};
  padding: 40px;
  overflow-y: auto;
  height: 100%;

  @media only screen and (max-width: 768px) {
    padding: 30px 20px;
    height: auto;
    min-height: 400px;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;

    &:hover {
      background: #a8a8a8;
    }
  }
`;

export const ContentTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: ${themeGet("colors.headingColor", "#0d0d0d")};
  margin: 0 0 24px 0;
  line-height: 1.3;

  @media only screen and (max-width: 768px) {
    font-size: 24px;
  }
`;

export const ContentText = styled.div`
  font-size: 16px;
  line-height: 1.8;
  color: ${themeGet("colors.textColor", "#484848")};
  word-wrap: break-word;

  /* Markdown paragraph styles */
  p {
    margin: 0 0 16px 0;
    line-height: 1.8;

    &:last-child {
      margin-bottom: 0;
    }
  }

  /* Markdown heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 32px 0 16px 0;
    color: ${themeGet("colors.headingColor", "#0d0d0d")};
    font-weight: 700;
    line-height: 1.3;

    &:first-child {
      margin-top: 0;
    }
  }

  h1 {
    font-size: 32px;
    margin-top: 0;
  }

  h2 {
    font-size: 28px;
    border-bottom: 2px solid rgba(15, 35, 52, 0.1);
    padding-bottom: 8px;
  }

  h3 {
    font-size: 24px;
  }

  h4 {
    font-size: 20px;
  }

  h5 {
    font-size: 18px;
  }

  h6 {
    font-size: 16px;
  }

  /* Markdown list styles */
  ul,
  ol {
    margin: 16px 0;
    padding-left: 24px;
  }

  li {
    margin: 8px 0;
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
    font-size: 14px;
    font-family: "Courier New", monospace;
    color: ${themeGet("colors.primary", "#028489")};
  }

  pre {
    background: rgba(15, 35, 52, 0.05);
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 20px 0;
    border-left: 4px solid ${themeGet("colors.primary", "#028489")};

    code {
      background: transparent;
      padding: 0;
      color: ${themeGet("colors.textColor", "#484848")};
    }
  }

  /* Markdown link styles */
  a {
    color: ${themeGet("colors.primary", "#028489")};
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: all 0.2s ease;

    &:hover {
      border-bottom-color: ${themeGet("colors.primary", "#028489")};
    }
  }

  /* Markdown blockquote styles */
  blockquote {
    border-left: 4px solid ${themeGet("colors.primary", "#028489")};
    padding-left: 16px;
    margin: 20px 0;
    color: ${themeGet("colors.textColor", "#666666")};
    font-style: italic;
    background: rgba(2, 132, 137, 0.05);
    padding: 16px;
    border-radius: 4px;
  }

  /* Markdown table styles */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 14px;
  }

  th,
  td {
    border: 1px solid rgba(15, 35, 52, 0.1);
    padding: 12px;
    text-align: left;
  }

  th {
    background: rgba(15, 35, 52, 0.05);
    font-weight: 600;
    color: ${themeGet("colors.headingColor", "#0d0d0d")};
  }

  tr:nth-child(even) {
    background: rgba(15, 35, 52, 0.02);
  }

  /* Markdown horizontal rule */
  hr {
    border: none;
    border-top: 2px solid rgba(15, 35, 52, 0.1);
    margin: 32px 0;
  }

  /* Markdown strong and emphasis */
  strong {
    font-weight: 700;
    color: ${themeGet("colors.headingColor", "#0d0d0d")};
  }

  em {
    font-style: italic;
  }
`;

export const VideoContainer = styled.div`
  margin: 32px 0;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  background: #000;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${themeGet("colors.textColor", "#666666")};

  p {
    font-size: 16px;
    margin: 0;
  }
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 40px;
  color: ${themeGet("colors.textColor", "#666666")};
`;

export const ShareButton = styled.button`
  background: ${themeGet("colors.primary", "#028489")};
  color: ${themeGet("colors.white", "#ffffff")};
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  font-family: inherit;
  flex-shrink: 0;

  &:hover {
    background: ${themeGet("colors.primaryHover", "#027275")};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(2, 132, 137, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;
