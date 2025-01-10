import React, { useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const TextInput = styled.input`
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 10px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const NumberInput = styled.input`
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 10px;
  width: 100%;
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

  &:hover {
    background-color: #45a049;
  }
`;

interface ActivityInputProps {
  onAddActivity: (activity: string, progress: number, date: Date) => void;
}

const ActivityInput: React.FC<ActivityInputProps> = ({ onAddActivity }) => {
  const [activity, setActivity] = useState<string>("");
  const [progress, setProgress] = useState<number>(1);

  const handleSubmit = () => {
    if (activity.trim() === "" || progress <= 0) return;
    onAddActivity(activity, progress, new Date());
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
        placeholder="進捗度を入力..."
        min="1"
      />
      <Button onClick={handleSubmit}>送信</Button>
    </InputContainer>
  );
};

export default ActivityInput;
