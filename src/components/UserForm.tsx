import React, { useState } from "react";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const FormContainer = styled.div`
  margin: 2rem 0;
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
  padding: 0.5rem 2rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-left: auto;

  &:hover {
    background: #45a049;
  }
`;

const CancelButton = styled.button`
  margin-top: 3rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  svg {
    font-size: 20px;
  }
  &:hover {
    background: transparent;
    color: #45a049;
    svg {
      color: #45a049;
    }
  }
`;

interface UserFormProps {
  onSubmit: (username: string, icon: string) => void;
  onCancel?: () => void;
  initialUsername?: string;
  initialIcon?: string;
}

const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  onCancel,
  initialUsername = "",
  initialIcon = "",
}) => {
  const [username, setUsername] = useState(initialUsername);
  const [icon, setIcon] = useState(initialIcon);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setIcon(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username, icon);
    }
  };

  return (
    <div>
      {onCancel && (
        <CancelButton type="button" onClick={onCancel}>
          <ArrowBackIosIcon />
          <span>Back</span>
        </CancelButton>
      )}
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="ユーザー名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          <p style={{ fontSize: "1rem", color: "#666", margin: "0" }}>
            ※正方形の画像を選択してください
            <br />
            ↓画像プレビュー
          </p>
          {icon && (
            <img
              src={icon}
              alt="プレビュー"
              style={{
                maxWidth: "150px",
                borderRadius: "50%",
              }}
            />
          )}

          <Button type="submit">保存</Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default UserForm;
