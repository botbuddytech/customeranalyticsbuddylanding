import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const LeadsSection = styled.div`
  text-align: left;
  margin-top: 24px;
`;

export const LeadsHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 16px;

  h3 {
    font-size: 20px;
    font-weight: 700;
    color: ${themeGet('colors.headingColor', '#0d0d0d')};
    margin: 0;
  }

  span {
    font-size: 13px;
    color: ${themeGet('colors.textColor', '#666666')};
  }
`;

export const LeadsTable = styled.div`
  border-radius: 12px;
  border: 1px solid rgba(15, 35, 52, 0.06);
  background: #ffffff;
  overflow: hidden;
  font-size: 14px;
`;

export const LeadsRow = styled.div`
  display: grid;
  /* Narrower first column for ID, wider columns for email and date/time */
  grid-template-columns: 0.6fr 2fr 2fr;
  padding: 10px 14px;
  border-bottom: 1px solid rgba(15, 35, 52, 0.04);

  &:last-child {
    border-bottom: none;
  }

  &.header {
    font-weight: 600;
    background: rgba(15, 35, 52, 0.02);
  }

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

