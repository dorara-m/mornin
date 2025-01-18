import React, { useState } from "react";
import styled from "styled-components";
import { media } from "../utils/media";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 40px 0;
`;

const TextInput = styled.input`
  padding: 10px;
  font-size: 1rem;
  width: calc(100% - 60px);
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const NumberInput = styled.input`
  padding: 10px;
  font-size: 1rem;
  width: 60px;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
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

  return (
    <InputContainer>
      <TextInput
        type="text"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        placeholder="朝活内容を入力..."
      />
      <NumberInput
        type="number"
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        min="1"
      />
      <Button onClick={handleSubmit}>GO</Button>
    </InputContainer>
  );
};

export default ActivityInput;
