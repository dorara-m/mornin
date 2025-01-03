import React, { useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 0.5rem;
  width: 70%;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

type Props = {
  onAddActivity: (activity: string) => void;
};

const ActivityInput: React.FC<Props> = ({ onAddActivity }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddClick = () => {
    if (inputValue.trim() !== "") {
      onAddActivity(inputValue);
      setInputValue("");
    }
  };

  return (
    <InputContainer>
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="朝活内容を入力..."
      />
      <Button onClick={handleAddClick}>追加</Button>
    </InputContainer>
  );
};

export default ActivityInput;
