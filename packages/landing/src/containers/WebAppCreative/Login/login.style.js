import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const LoginWrapper = styled.section`
  padding: 120px 0 80px;
  background-color: #f8f9fa;
  min-height: 100vh;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    padding: 100px 0 60px;
  }
`;

const LoginForm = styled.form`
  background: #ffffff;
  padding: 50px 40px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  margin: 0 auto;

  .form-header {
    text-align: center;
    margin-bottom: 40px;

    h2 {
      color: ${themeGet('colors.headingColor')};
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 15px;
    }

    p {
      color: ${themeGet('colors.textColor')};
      font-size: 16px;
      line-height: 1.6;
    }
  }

  .form-group {
    margin-bottom: 25px;

    label {
      display: block;
      color: ${themeGet('colors.headingColor')};
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    input {
      width: 100%;
      padding: 15px 20px;
      border: 2px solid #e8ecf0;
      border-radius: 10px;
      font-size: 16px;
      transition: all 0.3s ease;
      background-color: #ffffff;

      &:focus {
        outline: none;
        border-color: ${themeGet('colors.primary')};
        box-shadow: 0 0 0 3px rgba(149, 191, 71, 0.1);
      }

      &::placeholder {
        color: #8a8a8a;
      }
    }
  }

  .forgot-password {
    text-align: right;
    margin-top: -15px;
    margin-bottom: 25px;

    a {
      color: ${themeGet('colors.primary')};
      font-size: 14px;
      font-weight: 600;
      transition: all 0.3s ease;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  button {
    width: 100%;
    margin-top: 10px;
  }

  .form-footer {
    text-align: center;
    margin-top: 30px;

    p {
      color: ${themeGet('colors.textColor')};
      font-size: 14px;

      a {
        color: ${themeGet('colors.primary')};
        font-weight: 700;
        margin-left: 5px;
        transition: all 0.3s ease;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

export { LoginWrapper, LoginForm };
