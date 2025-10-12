import styled from 'styled-components';

const ContactWrapper = styled.section`
  padding: 80px 0;
  background-color: #f8f9fa;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const ContactForm = styled.div`
  background: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  .form-group {
    margin-bottom: 25px;
    
    input,
    textarea,
    select {
      width: 100%;
      padding: 15px 20px;
      border: 2px solid #e8ecf0;
      border-radius: 8px;
      font-size: 16px;
      transition: all 0.3s ease;
      background-color: #ffffff;
      
      &:focus {
        outline: none;
        border-color: #ec5555;
        box-shadow: 0 0 0 3px rgba(236, 85, 85, 0.1);
      }
      
      &::placeholder {
        color: #8a8a8a;
      }
    }
    
    textarea {
      resize: vertical;
      min-height: 120px;
    }
  }
  
  button {
    width: 100%;
    padding: 15px 30px;
    background: linear-gradient(135deg, #ec5555 0%, #d63e3e 100%);
    border: none;
    border-radius: 8px;
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(236, 85, 85, 0.3);
    }
  }
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const ContactInfo = styled.div`
  padding-right: 40px;
  
  h2 {
    color: #0f2137;
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 20px;
    line-height: 1.2;
  }
  
  p {
    color: #5a6c7d;
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 30px;
  }
  
  .contact-info {
    .contact-item {
      margin-bottom: 20px;
      padding: 15px 0;
      border-bottom: 1px solid #e8ecf0;
      
      &:last-child {
        border-bottom: none;
      }
      
      p {
        color: #0f2137;
        font-size: 16px;
        font-weight: 500;
        margin: 0;
      }
    }
  }
  
  @media (max-width: 768px) {
    padding-right: 0;
    margin-bottom: 40px;
    
    h2 {
      font-size: 28px;
    }
  }
`;

export { ContactWrapper, ContactForm, ContactInfo };
