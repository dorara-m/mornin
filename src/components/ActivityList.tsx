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
  span {
    font-size: 0.8rem;
    color: #666;
    margin-right: 0.5rem;
  }
`;

type Props = {
  activities: { text: string; timeStamp: string }[];
};

const ActivityList: React.FC<Props> = ({ activities }) => {
  return (
    <ListContainer>
      {activities.map((activity, index) => (
        <ListItem key={index}>
          <span>{activity.timeStamp}</span>
          {activity.text}
        </ListItem>
      ))}
    </ListContainer>
  );
};

export default ActivityList;
