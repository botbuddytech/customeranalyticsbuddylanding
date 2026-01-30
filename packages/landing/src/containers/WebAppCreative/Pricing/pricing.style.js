import styled from 'styled-components';
import { rgba } from 'polished';
import { themeGet } from '@styled-system/theme-get';

export const Section = styled.div`
  background-color: #95bf47;
  padding-top: 70px;
  padding-bottom: 130px;
  @media screen and (max-width: 1024px) {
    padding-top: 50px;
    padding-bottom: 110px;
  }
  @media screen and (max-width: 768px) {
    padding-top: 40px;
    padding-bottom: 60px;
  }
  @media screen and (max-width: 480px) {
    padding-bottom: 60px;
    padding-top: 40px;
  }
`;

export const SectionHeading = styled.div`
  max-width: 580px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-bottom: 25px;
  h2 {
    color: ${themeGet('colors.white')};
    font-weight: 700;
    font-size: 26px;
    line-height: 36px;
    letter-spacing: -0.2px;
    @media screen and (max-width: 480px) {
      font-size: 24px;
    }
  }
`;

export const SwitcherWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  button {
    background-color: transparent;
    border: 0;
    color: ${themeGet('colors.textColorLight')};
    cursor: pointer;
    padding: 0;
    font-family: Inter, sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
  }
  .switcher {
    background-color: #3fdbb1;
    border-radius: 16.5px;
    cursor: pointer;
    margin: 0 10px;
    height: 30px;
    width: 50px;
    position: relative;
  }
  .switcher-button {
    background-color: #fff;
    border-radius: 50%;
    height: 23px;
    width: 23px;
    position: absolute;
    top: 50%;
    transform: translate(3px, -50%);
    transition: all 0.3s ease-in-out 0s;
    &.right {
      transform: translate(24px, -50%);
    }
  }
`;

export const Grid = styled.div`
  gap: 20px;
  display: grid;
  grid-template-columns: ${props => {
    const count = props.itemCount || 1;
    // If only one item, center it with max-width
    if (count === 1) {
      return '1fr';
    }
    // If 2 items, use 2 columns
    if (count === 2) {
      return 'repeat(2, 1fr)';
    }
    // If 3 items, use 3 columns
    if (count === 3) {
      return 'repeat(3, 1fr)';
    }
    // 4 or more items, use 4 columns
    return 'repeat(4, 1fr)';
  }};
  justify-content: center;
  justify-items: ${props => props.itemCount === 1 ? 'center' : 'stretch'};
  max-width: ${props => {
    const count = props.itemCount || 1;
    // Center single item with reasonable max-width
    if (count === 1) {
      return '400px';
    }
    return '100%';
  }};
  margin: ${props => props.itemCount === 1 ? '0 auto' : '0'};
  
  @media screen and (max-width: 1024px) {
    gap: 16px;
    grid-template-columns: ${props => {
      const count = props.itemCount || 1;
      if (count === 1) {
        return '1fr';
      }
      return 'repeat(2, 1fr)';
    }};
    max-width: ${props => {
      const count = props.itemCount || 1;
      if (count === 1) {
        return '400px';
      }
      return '100%';
    }};
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 24px;
    max-width: 100%;
  }
`;

export const PriceTable = styled.div`
  background-color: ${themeGet('colors.white')};
  color: ${themeGet('colors.headingColor')};
  box-shadow: 0px 25px 70px rgba(64, 106, 157, 0.06);
  border-radius: 20px;
  padding: 28px 24px;
  text-align: center;
  @media (max-width: 1024px) {
    padding: 24px;
  }
  @media (max-width: 768px) {
    padding: 20px 16px;
  }
  @media (max-width: 480px) {
    padding: 24px;
  }
  h2 {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 36px;
    line-height: 44px;
    letter-spacing: -0.16px;
    margin-bottom: 25px;
    @media (min-width: 567px) and (max-width: 768px) {
      font-size: 32px;
      margin-bottom: 15px;
    }
  }
  h5 {
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    margin-bottom: 10px;
  }
  p {
    color: ${themeGet('colors.headingColor')};
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    line-height: 1.67;
  }
  .features {
    margin: 8px 0 12px;
    padding: 0;
    list-style: none;
    text-align: center;
    li {
      color: ${themeGet('colors.headingColor')};
      font-size: 14px;
      line-height: 1.6;
      padding: 4px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      .icon {
        color: ${themeGet('colors.primary')};
        display: inline-flex;
        align-items: center;
      }
    }
  }
  .rates {
    font-size: 12px;
    line-height: 1.4;
    color: ${themeGet('colors.headingColor')};
    opacity: 0.8;
    margin-bottom: 8px;
  }
  figure { display: none; }
  button {
    border-radius: 10px;
    font-weight: 700;
    font-size: 15px;
    line-height: 1.6;
    letter-spacing: -0.16px;
    @media (min-width: 567px) and (max-width: 768px) {
      font-size: 14px;
      padding: 10px;
      min-height: 40px;
    }
    @media (max-width: 480px) {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }
  a {
    color: ${themeGet('colors.headingColor')};
    font-size: 14px;
    line-height: 42px;
    font-weight: 700;
    margin-top: 15px;
    display: inline-flex;
  }
  &.active {
    /* keep as hook for future emphasis */
  }
`;
