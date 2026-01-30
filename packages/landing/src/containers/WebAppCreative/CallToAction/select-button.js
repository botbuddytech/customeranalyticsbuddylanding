import React from 'react';
import * as Select from '@radix-ui/react-select';
import { styled } from '@stitches/react';
import { violet, mauve, blackA } from '@radix-ui/colors';
import { TriangleDownIcon } from '@radix-ui/react-icons';

export const SelectButton = () => (
  <Select.Root>
    <SelectTrigger aria-label="Food">
      <Select.Value placeholder="Start for Free" />
    </SelectTrigger>
    {/* No dropdown content; acts as a primary CTA button */}
  </Select.Root>
);

const SelectTrigger = styled(Select.SelectTrigger, {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  padding: '0 40px',
  fontSize: '1rem',
  minHeight: '65px',
  lineHeight: 1,
  gap: 2,
  backgroundColor: '#ffffff',
  color: '#0F2137',
  cursor: 'pointer',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  '&:hover': { backgroundColor: '#ffffff' },
  '&:focus': { boxShadow: `none` },
  '@media (min-width: 1025px) and (max-width: 1280px)': {
    minHeight: '55px',
    padding: '0 25px',
  },
  '@media (max-width: 768px)': {
    minHeight: '50px',
    padding: '0 20px'
  },
  '@media (max-width: 480px)': {
    padding: '0 30px !important'
  },
});

const SelectIcon = styled(Select.SelectIcon, {
  color: '#0F2137',
});

const SelectContent = styled(Select.Content, {
  overflow: 'hidden',
  backgroundColor: '#fff',
  borderRadius: 10,
  boxShadow: '0px 3px 8px 0px rgb(43 83 135 / 8%)',
  fontSize: '1rem',
  padding: '10px',
  width: 'var(--radix-select-trigger-width)',
  cursor: 'pointer',
});

const SelectViewport = styled(Select.Viewport, {
  padding: 5,
});

const SelectItem = React.forwardRef(({ children, ...props }, forwardedRef) => {
  return (
    <StyledItem {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
    </StyledItem>
  );
});

const StyledItem = styled(Select.Item, {
  fontSize: "16px",
  lineHeight: "1.33",
  fontWeight: "700",
  color: '#0F2137',
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  position: 'relative',
  userSelect: 'none',

  '&[data-disabled]': {
    color: mauve.mauve8,
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    outline: 'none',
    backgroundColor: 'rgba(0,0,0,0.08)',
    color: 'black',
  },
});

export default SelectButton;