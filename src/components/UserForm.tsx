import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  margin: 5rem 0;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #45a049;
  }
`;

interface UserFormProps {
  onSubmit: (username: string, icon: string) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [icon, setIcon] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username, icon);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="ユーザー名※必須"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="アイコン画像URL（空も可）"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        />
        <p style={{ fontSize: "1rem", color: "#666" }}>
          ※アイコン画像urlは完全に公開されているurl（自分のサイトなど）でないと読み込めません。自信がなければ空にしてください。今後画像を自由にアップロードできるようにしますのでしばらくお待ち下さい。。
        </p>
        <Button type="submit">保存</Button>
      </Form>
    </FormContainer>
  );
};

export default UserForm;
