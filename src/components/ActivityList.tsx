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
  font-size: 1.1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 0.8rem;
    margin-right: 2rem;
  }
`;
const ListItemProgress = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
  color: green;
`;

type Props = {
  activities: { text: string; progress: number; timeStamp: Date }[];
};

const ActivityList: React.FC<Props> = ({ activities }) => {
  // 日付をフォーマットする関数
  const formatDate = (date: Date): string => {
    const month = date.getMonth() + 1; // 月は0から始まるため+1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0"); // 2桁に揃える
    return `${month}/${day} ${hours}:${minutes}`;
  };

  return (
    <ListContainer>
      {activities.map((activity, index) => (
        <ListItem key={index}>
          <div>
            <span>{formatDate(activity.timeStamp)}</span>
            {activity.text}
          </div>
          <ListItemProgress>{activity.progress}P</ListItemProgress>
        </ListItem>
      ))}
    </ListContainer>
  );
};

export default ActivityList;
