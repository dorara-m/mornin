import React, { useState } from "react";
import styled from "styled-components";
import { media } from "../utils/media";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 40px 0;
  flex-wrap: wrap;
  ${media.tablet(`
    gap: 10px;
  `)}
`;

const TextInput = styled.input`
  padding: 10px;
  font-size: 1rem;
  flex-grow: 1;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const NumberInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 80px;
`;

const NumberInput = styled.input`
  padding: 10px 20px;
  font-size: 1rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

const StepButton = styled.button`
  position: absolute;
  padding: 0;
  width: 20px;
  height: 100%;
  border: none;
  background: none;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;

  &:hover {
    color: #4caf50;
  }

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const DecrementButton = styled(StepButton)`
  left: 2px;
`;

const IncrementButton = styled(StepButton)`
  right: 2px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  ${media.tablet(`
    width: auto;
    margin-top: 0;
  `)}

  &:hover {
    background-color: #45a049;
  }
`;

interface ActivityInputProps {
  onAddActivity: (activity: string, progress: number, date: string) => void;
}

const ActivityInput: React.FC<ActivityInputProps> = ({ onAddActivity }) => {
  const [activity, setActivity] = useState<string>("");
  const [progress, setProgress] = useState<number>(1);

  const handleSubmit = () => {
    if (activity.trim() === "" || progress <= 0) return;
    // localStorageで保存するため文字列として保存しておく
    const dateString = new Date().toLocaleString();
    onAddActivity(activity, progress, dateString);
    setActivity("");
    setProgress(1);
  };

  const handleIncrement = () => {
    setProgress((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setProgress((prev) => Math.max(1, prev - 1));
  };

  return (
    <InputContainer>
      <TextInput
        type="text"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        placeholder="朝活内容を入力..."
      />
      <NumberInputContainer>
        <DecrementButton onClick={handleDecrement} disabled={progress <= 1}>
          -
        </DecrementButton>
        <NumberInput
          type="number"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          min="1"
        />
        <IncrementButton onClick={handleIncrement}>+</IncrementButton>
      </NumberInputContainer>
      <Button onClick={handleSubmit}>GO</Button>
    </InputContainer>
  );
};

export default ActivityInput;
