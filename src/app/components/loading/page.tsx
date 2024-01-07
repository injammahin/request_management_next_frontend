import React from "react";
import styled from "@emotion/styled";
import { BeatLoader } from "react-spinners";
import { LoaderSizeMarginProps } from "react-spinners/helpers/props";

interface LoadingSpinnerProps extends LoaderSizeMarginProps {
  loading: boolean;
}

const StyledSpinnerContainer = styled.div<{ loading: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  opacity: ${(props) => (props.loading ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  loading,
  size,
  margin,
}) => {
  return (
    <StyledSpinnerContainer loading={loading}>
      <BeatLoader
        color={"blue"}
        loading={loading}
        size={size || 15}
        margin={margin}
      />
    </StyledSpinnerContainer>
  );
};

export default LoadingSpinner;
