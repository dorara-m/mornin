import React from "react";
import styled from "styled-components";

const ProgressContainer = styled.div`
  background-color: #ddd;
  border-radius: 20px;
  margin-top: 2rem;
  height: 20px;
`;

const Progress = styled.div<{ progress: number }>`
  background-color: #4caf50;
  height: 100%;
  width: ${(props) => props.progress}%;
  border-radius: 20px;
  transition: width 0.3s ease;
`;

type Props = {
  progress: number;
};

const ProgressBar: React.FC<Props> = ({ progress }) => {
  return (
    <ProgressContainer>
      <Progress progress={progress} />
    </ProgressContainer>
  );
};

export default ProgressBar;
