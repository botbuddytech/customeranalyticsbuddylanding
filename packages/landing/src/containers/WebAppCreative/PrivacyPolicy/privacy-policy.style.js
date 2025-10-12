import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const Section = styled.section`
  padding: 80px 0;
  background: #fff;
  min-height: 100vh;
`;

export const ContentSection = styled.div`
  max-width: 800px;
  margin: 0 auto;
  
  h1 {
    font-size: 48px;
    font-weight: 700;
    line-height: 1.2;
    margin: 0 0 20px;
    color: ${themeGet('colors.headingColor')};
    text-align: center;
    
    @media screen and (max-width: 768px) {
      font-size: 36px;
    }
    
    @media screen and (max-width: 480px) {
      font-size: 28px;
    }
  }
  
  h2 {
    font-size: 28px;
    font-weight: 600;
    line-height: 1.3;
    margin: 40px 0 20px;
    color: ${themeGet('colors.headingColor')};
    
    @media screen and (max-width: 768px) {
      font-size: 24px;
    }
    
    @media screen and (max-width: 480px) {
      font-size: 20px;
    }
  }
  
  h3 {
    font-size: 22px;
    font-weight: 600;
    line-height: 1.4;
    margin: 30px 0 15px;
    color: ${themeGet('colors.headingColor')};
    
    @media screen and (max-width: 768px) {
      font-size: 20px;
    }
    
    @media screen and (max-width: 480px) {
      font-size: 18px;
    }
  }
  
  p {
    font-size: 16px;
    line-height: 1.8;
    margin: 0 0 20px;
    color: ${themeGet('colors.textColor')};
    
    @media screen and (max-width: 480px) {
      font-size: 15px;
      line-height: 1.7;
    }
  }
  
  ul {
    margin: 0 0 20px;
    padding-left: 20px;
    
    li {
      font-size: 16px;
      line-height: 1.8;
      margin: 0 0 10px;
      color: ${themeGet('colors.textColor')};
      
      @media screen and (max-width: 480px) {
        font-size: 15px;
        line-height: 1.7;
      }
    }
  }
  
  /* Style for the last updated text */
  p:first-of-type {
    text-align: center;
    font-style: italic;
    color: ${themeGet('colors.textColor')};
    opacity: 0.8;
    margin-bottom: 40px;
  }
`;

export const SitemapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin: 40px 0;
  
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

export const SitemapSection = styled.div`
  h2 {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.3;
    margin: 0 0 20px;
    color: ${themeGet('colors.headingColor')};
    border-bottom: 2px solid #95bf47;
    padding-bottom: 10px;
    
    @media screen and (max-width: 768px) {
      font-size: 20px;
    }
  }
`;

export const SitemapList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SitemapItem = styled.li`
  margin-bottom: 20px;
  padding: 15px;
  background: #ffffff;
  border: 1px solid #e8ecf0;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #95bf47;
    box-shadow: 0 4px 12px rgba(149, 191, 71, 0.1);
    transform: translateY(-2px);
  }
  
  a {
    text-decoration: none;
    color: ${themeGet('colors.headingColor')};
    font-size: 18px;
    font-weight: 600;
    
    &:hover {
      color: #95bf47;
    }
  }
  
  p {
    margin: 8px 0 0 0;
    font-size: 14px;
    color: ${themeGet('colors.textColor')};
    line-height: 1.5;
  }
`;
