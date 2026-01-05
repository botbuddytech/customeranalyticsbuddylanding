import styled, { keyframes } from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

const dotPulse = keyframes`
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  min-height: 200px;
  width: 100%;
`;

export const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

export const SpinnerCircle = styled.div`
  position: relative;
  width: ${(props) => {
    switch (props.size) {
      case "small":
        return "48px";
      case "large":
        return "96px";
      default:
        return "64px";
    }
  }};
  height: ${(props) => {
    switch (props.size) {
      case "small":
        return "48px";
      case "large":
        return "96px";
      default:
        return "64px";
    }
  }};
  animation: ${rotate} 1.4s linear infinite;
`;

export const SpinnerDot = styled.div`
  position: absolute;
  width: ${(props) => {
    switch (props.size) {
      case "small":
        return "10px";
      case "large":
        return "18px";
      default:
        return "14px";
    }
  }};
  height: ${(props) => {
    switch (props.size) {
      case "small":
        return "10px";
      case "large":
        return "18px";
      default:
        return "14px";
    }
  }};
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${themeGet("colors.primary", "#028489")} 0%,
    ${themeGet("colors.primaryHover", "#027275")} 100%
  );
  box-shadow: 0 0 12px rgba(2, 132, 137, 0.5), 0 0 24px rgba(2, 132, 137, 0.3);
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: ${bounce} 1.4s ease-in-out infinite;
  animation-delay: ${(props) => props.delay || "0s"};

  &:nth-child(1) {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  &:nth-child(2) {
    top: 50%;
    right: 0;
    left: auto;
    transform: translateY(-50%);
  }

  &:nth-child(3) {
    bottom: 0;
    left: 50%;
    top: auto;
    transform: translateX(-50%);
  }
`;

export const LoaderText = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${themeGet("colors.textColor", "#666666")};
  text-align: center;
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  letter-spacing: 0.3px;
`;

export const LoaderDots = styled.span`
  display: inline-flex;
  gap: 2px;
  margin-left: 4px;

  span {
    display: inline-block;
    animation: ${dotPulse} 1.4s ease-in-out infinite;
    font-weight: 700;
    color: ${themeGet("colors.primary", "#028489")};
  }

  span:nth-child(1) {
    animation-delay: 0s;
  }

  span:nth-child(2) {
    animation-delay: 0.2s;
  }

  span:nth-child(3) {
    animation-delay: 0.4s;
  }
`;
