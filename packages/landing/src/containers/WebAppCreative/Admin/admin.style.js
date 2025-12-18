import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const AdminWrapper = styled.section`
  padding: 120px 0 80px;
  background-color: #f8f9fa;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 100px 0 60px;
  }
`;

const AdminContent = styled.div`
  background: #ffffff;
  padding: 50px 40px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  text-align: center;

  h2 {
    color: ${themeGet('colors.headingColor')};
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  p {
    color: ${themeGet('colors.textColor')};
    font-size: 18px;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

export { AdminWrapper, AdminContent };
