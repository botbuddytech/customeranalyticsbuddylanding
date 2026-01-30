import { Parallax } from 'react-parallax';
import styled from 'styled-components';
import { rgba } from 'polished';
import { themeGet } from '@styled-system/theme-get';

const Section = styled(Parallax)`
  background-color: #f7f9ff; /* different background */
  padding-top: 90px;
  padding-bottom: 90px;
  overflow: unset !important;
  @media (max-width: 1024px) {
    padding-top: 60px;
    padding-bottom: 60px;
  }
`;

export default Section;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr; /* text left, image right */
  align-items: center;
  gap: 40px;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
  @media (max-width: 768px) {
    display: block;
  }
`;

export const Figure = styled.figure`
  margin: 0;
  position: relative;
  .preview-card {
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 10px 30px ${rgba('#50637e', 0.12)};
    padding: 18px;
  }
  .generating-badge {
    position: absolute;
    top: -20px;
    left: 40px;
    background: ${rgba('#5b6cff', 0.95)};
    color: #ffffff;
    border-radius: 9999px;
    padding: 10px 16px;
    font-weight: 700;
    box-shadow: 0 10px 24px ${rgba('#5b6cff', 0.35)};
  }
`;

export const Content = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 10px 30px ${rgba('#50637e', 0.12)};
  @media (max-width: 768px) {
    text-align: center;
    padding: 24px;
  }
  .subtitle {
    color: ${themeGet('colors.primary')};
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: -0.005em;
  }
  h2 {
    color: ${themeGet('colors.headingColor')};
    font-weight: 800;
    font-size: 36px;
    line-height: 1.25;
    letter-spacing: -0.03em;
    max-width: 520px;
  }
  .description {
    color: ${themeGet('colors.textColor')};
    font-weight: 500;
    font-size: 16px;
    line-height: 2;
    max-width: 520px;
  }
  .explore {
    margin-top: 30px;
    button {
      background-color: ${themeGet('colors.primary')};
      border: 1px solid ${themeGet('colors.primary')};
      border-radius: 10px;
      color: ${themeGet('colors.white')};
    }
  }
`;

export const Features = styled.ul`
  gap: 15px;
  display: grid;
  margin-top: 20px;
  text-align: left;
  li {
    color: ${themeGet('colors.textColor')};
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 17px;
    line-height: 21px;
    i {
      color: #3fdbb1;
      margin-right: 15px;
    }
  }
`;


