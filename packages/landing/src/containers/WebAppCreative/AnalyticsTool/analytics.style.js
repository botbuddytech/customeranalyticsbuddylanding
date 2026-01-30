import { Parallax } from 'react-parallax';
import styled from 'styled-components';
import { rgba } from 'polished';
import { themeGet } from '@styled-system/theme-get';
import parallaxBg from 'common/assets/image/webAppCreative/parallax-1.png';
import polygon from 'common/assets/image/webAppCreative/polygon.png';

const Section = styled(Parallax)`
  /* Section background per request */
  background-color: #95bf47;
  padding-top: 100px;
  padding-bottom: 100px;
  overflow: unset !important;
  @media (max-width: 1280px) {
    padding-top: 60px;
    padding-bottom: 60px;
  }
  @media (max-width: 1024px) {
    padding-top: 60px;
    padding-bottom: 80px;
  }
  @media (max-width: 768px) {
    padding-top: 40px;
    padding-bottom: 60px;
  }
  .react-parallax-bgimage {
    z-index: 10;
  }
  .container {
    @media (min-width: 768px) {
      /* position: relative;
      ::after {
        background: transparent url(${polygon?.src}) no-repeat;
        content: '';
        right: 0;
        position: absolute;
        width: 104px;
        height: 104px;
        z-index: 1;
        top: -80px;
      } */
    }
    @media (min-width: 1024px) {
      ::after {
        top: -95px;
      }
    }
    @media (min-width: 1280px) {
      ::after {
        top: -100px;
      }
    }
    @media (min-width: 1440px) {
      ::after {
        top: -140px;
      }
    }
  }
  .react-parallax-content {
    z-index: 10;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  gap: 40px;
  @media (max-width: 1024px) {
    gap: 30px;
    grid-template-columns: 1fr 1fr;
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
  img {
    @media (min-width: 567px) and (max-width: 768px) {
      max-width: 80%;
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

export const Content = styled.div`
  margin-left: 0;
  margin-top: 0;
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 10px 30px ${rgba('#50637e', 0.12)};
  @media (max-width: 1280px) {
    margin-left: 0;
  }
  @media (max-width: 1024px) {
    margin-left: 0;
    margin-top: 0;
  }
  @media (max-width: 768px) {
    margin: 15px 0 0;
    text-align: center;
    padding: 24px;
  }
  .subtitle {
    color: ${themeGet('colors.primary')};
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: -0.005em;
    @media (min-width: 769px) and (max-width: 1024px) {
      font-size: 15px;
      line-height: 2;
    }
  }
  h2 {
    color: ${themeGet('colors.headingColor')};
    font-weight: 800;
    font-size: 40px;
    line-height: 1.25;
    letter-spacing: -0.03em;
    max-width: 480px;
    @media (max-width: 1280px) {
      font-size: 32px;
    }
    @media (max-width: 1024px) {
      font-size: 28px;
      line-height: 1.5;
    }
    @media (max-width: 768px) {
      margin-left: auto;
      margin-right: auto;
      max-width: 500px;
    }
    @media (max-width: 480px) {
      font-size: 24px;
    }
  }
  .description {
    color: ${themeGet('colors.textColor')};
    font-weight: 500;
    font-size: 16px;
    line-height: 2;
    max-width: 460px;
    @media (max-width: 768px) {
      margin-left: auto;
      margin-right: auto;
    }
  }
  .explore {
    margin-top: 40px;
    @media only screen and (min-width: 1024px) and (max-width: 1366px) {
      margin-top: 15px;
    }
    @media only screen and (max-width: 1024px) {
      margin-top: 30px;
    }
    button {
      background-color: ${themeGet('colors.primary')};
      border: 1px solid ${themeGet('colors.primary')};
      border-radius: 10px;
      color: ${themeGet('colors.white')};
      :hover {
        background-color: ${rgba('#108AFF', 0.85)};
        border-color: ${themeGet('colors.primary')};
        color: ${themeGet('colors.white')};
      }
    }
    i {
      line-height: 1;
      transform: translateX(0px);
      transition: 0.3s ease 0s;
    }
    &:hover i {
      transform: translateX(3px);
    }
  }
`;

export const Features = styled.ul`
  gap: 15px;
  display: grid;
  margin-top: 30px;
  text-align: left;
  @media only screen and (max-width: 480px) {
    gap: 10px;
  }
  @media only screen and (max-width: 768px) {
    max-width: 350px;
    margin-left: auto;
    margin-right: auto;
  }
  li {
    color: ${themeGet('colors.textColor')};
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 17px;
    line-height: 21px;
    @media only screen and (max-width: 480px) {
      font-size: 15px;
      line-height: 18px;
    }
    i {
      color: #3fdbb1;
      margin-right: 15px;
      @media only screen and (max-width: 480px) {
        margin-right: 6px;
      }
    }
  }
`;

export default Section;
