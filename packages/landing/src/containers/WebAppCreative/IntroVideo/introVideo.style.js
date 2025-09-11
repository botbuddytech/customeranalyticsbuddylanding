import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const Section = styled.section`
  padding: 30px 0 20px;
  background: #ffffff;
`;

export default Section;

export const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(18, 38, 63, 0.12);
  padding: 12px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  h2 {
    color: ${themeGet('colors.headingColor')};
    margin-bottom: 4px;
  }
  p {
    color: ${themeGet('colors.textColor')};
    margin: 0 auto 8px;
    max-width: 520px;
    font-size: 14px;
  }
`;

export const VideoWrap = styled.div`
  position: relative;
  max-width: 560px;
  margin: 0 auto;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,.1);
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;


