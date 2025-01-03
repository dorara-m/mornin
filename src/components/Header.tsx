import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: #4caf50;
  color: white;
  text-align: center;
  padding: 1rem;
  font-size: 1.5rem;
`;

const Header: React.FC = () => {
  return <HeaderContainer>朝活アプリ</HeaderContainer>;
};

export default Header;
