import React from "react";
import styled from "styled-components";

const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem auto;
  width: 90%;
`;

const ListItem = styled.li`
  background-color: #f9f9f9;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

type Props = {
  activities: string[];
};

const ActivityList: React.FC<Props> = ({ activities }) => {
  return (
    <ListContainer>
      {activities.map((activity, index) => (
        <ListItem key={index}>{activity}</ListItem>
      ))}
    </ListContainer>
  );
};

export default ActivityList;
