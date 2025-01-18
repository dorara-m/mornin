import React from "react";
import styled from "styled-components";
import Container from "./Container";

const HeaderContainer = styled.header`
  background-color: #4caf50;
  color: white;
  text-align: center;
  padding: 1rem 0;
  font-size: 2rem;
  font-weight: bold;
`;

const HeaderSubText = styled.div`
  margin-top: 0.2rem;
  font-size: 0.8rem;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Container>
        <div>もーにん</div>
        <HeaderSubText>Morning Activity Tracker</HeaderSubText>
      </Container>
    </HeaderContainer>
  );
};

export default Header;
