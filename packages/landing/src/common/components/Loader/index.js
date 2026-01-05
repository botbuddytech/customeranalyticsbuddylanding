import React from "react";
import {
  LoaderContainer,
  LoaderWrapper,
  SpinnerCircle,
  SpinnerDot,
  LoaderText,
  LoaderDots,
} from "./loader.style";

const Loader = ({ text, size = "medium" }) => {
  return (
    <LoaderContainer>
      <LoaderWrapper>
        <SpinnerCircle size={size}>
          <SpinnerDot size={size} delay="0s" />
          <SpinnerDot size={size} delay="0.2s" />
          <SpinnerDot size={size} delay="0.4s" />
        </SpinnerCircle>
        {text && (
          <LoaderText>
            {text}
            <LoaderDots>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </LoaderDots>
          </LoaderText>
        )}
      </LoaderWrapper>
    </LoaderContainer>
  );
};

export default Loader;
