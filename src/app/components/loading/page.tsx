import React from "react";
import styled from "@emotion/styled";
import { BeatLoader } from "react-spinners";
import { LoaderSizeMarginProps } from "react-spinners/helpers/props";

interface LoadingSpinnerProps extends LoaderSizeMarginProps {
  loading: boolean;
}

const StyledSpinnerContainer = styled.div<{ loading: boolean }>`
  display: ${(props) => (props.loading ? "block" : "none")};
`;

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  loading,
  size,
  margin,
}) => {
  return (
    <StyledSpinnerContainer loading={loading}>
      <BeatLoader
        color={"#36D7B7"}
        loading={loading}
        size={size || 15}
        margin={margin}
      />
    </StyledSpinnerContainer>
  );
};

export default LoadingSpinner;
