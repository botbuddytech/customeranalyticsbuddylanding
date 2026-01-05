import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const AdminWrapper = styled.section`
  padding: 120px 0 80px;
  background-color: #f8f9fa;
  min-height: 100vh;
  position: relative;

  @media (max-width: 768px) {
    padding: 100px 0 60px;
  }
`;

const AdminShell = styled.div`
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 0;
  align-items: flex-start;
  position: relative;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  background: linear-gradient(180deg, #1a1f2e 0%, #0f1419 100%);
  border-radius: 0;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  padding: 0;
  position: sticky;
  top: 80px;
  height: calc(100vh - 160px);
  min-height: 600px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  h3 {
    margin: 0;
    padding: 28px 24px 24px;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    letter-spacing: 0.5px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 16px 12px;
    flex: 1;
  }

  li {
    margin-bottom: 4px;
  }

  button {
    width: 100%;
    text-align: left;
    background: transparent;
    border: none;
    padding: 14px 16px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.2s ease;
    position: relative;
    border-left: 3px solid transparent;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 0.95);
    }

    &:active {
      transform: scale(0.98);
    }
  }

  button span.label {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    flex: 1;
  }

  button span.label svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    opacity: 0.7;
    transition: opacity 0.2s ease;
  }

  button:hover span.label svg {
    opacity: 1;
  }

  button.active {
    background: rgba(149, 191, 71, 0.15);
    color: #95bf47;
    border-left-color: #95bf47;
    font-weight: 600;
  }

  button.active span.label svg {
    opacity: 1;
  }

  button span.badge {
    font-size: 10px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 12px;
    background: rgba(149, 191, 71, 0.2);
    color: #95bf47;
    border: 1px solid rgba(149, 191, 71, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  button.active span.badge {
    background: rgba(149, 191, 71, 0.3);
    border-color: rgba(149, 191, 71, 0.5);
  }

  @media (max-width: 991px) {
    position: relative;
    top: 0;
    height: auto;
    min-height: auto;
    border-radius: 16px;
    margin-bottom: 24px;
  }
`;

const AdminContent = styled.div`
  background: #ffffff;
  padding: 40px 36px;
  border-radius: 0 20px 20px 0;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  width: 100%;
  height: calc(100vh - 160px);
  min-height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  position: sticky;
  top: 80px;

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

  h2 {
    color: ${themeGet('colors.headingColor', '#0d0d0d')};
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  p.description {
    color: ${themeGet('colors.textColor')};
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 24px;
  }

  @media (max-width: 991px) {
    border-radius: 16px;
    position: relative;
    top: 0;
    height: auto;
    min-height: auto;
  }

  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

export { AdminWrapper, AdminShell, Sidebar, AdminContent };

