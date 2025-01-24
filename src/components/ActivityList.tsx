import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const ListItem = styled.li`
  background-color: #f9f9f9;
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  padding-right: 2.5rem;
  font-size: 1.1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  font-weight: bold;
  position: relative;
`;
const ListItemDate = styled.span`
  font-size: 0.8rem;
  color: #999;
  margin-left: 0.5rem;
  display: inline-block;
  width: 5rem;
  text-align: center;
`;
const ListItemProgress = styled.span`
  margin-right: 1rem;
  font-size: 0.9rem;
  font-weight: bold;
  color: green;
`;
const DeleteButton = styled.button`
  position: absolute;
  right: 0.5rem;
  background-color: #999;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #666;
  }
`;

type Props = {
  activities: { text: string; progress: number; timeStamp: string }[];
  onDeleteActivity: (index: number) => void;
};

const DateHeader = styled.h3`
  margin: 1.5rem 0 0.5rem;
  color: #666;
  font-size: 1rem;
`;

const ActivityList: React.FC<Props> = ({ activities, onDeleteActivity }) => {
  const formatDate = (timestamp: string): string => {
    return dayjs(timestamp).format("M/D H:mm");
  };

  const formatDateHeader = (timestamp: string): string => {
    return dayjs(timestamp).format("M/D");
  };

  // アクティビティを日付でグループ化
  const groupedActivities = activities.reduce((groups, activity) => {
    const date = dayjs(activity.timeStamp).format("YYYY-MM-DD");
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {} as { [key: string]: typeof activities });

  return (
    <ListContainer>
      {Object.entries(groupedActivities)
        .sort(([dateA], [dateB]) => (dateB < dateA ? -1 : 1))
        .map(([date, dateActivities]) => (
          <React.Fragment key={date}>
            <DateHeader>{formatDateHeader(date)}</DateHeader>
            {dateActivities.map((activity, index) => (
              <ListItem key={`${date}-${index}`}>
                <ListItemProgress>{activity.progress}P</ListItemProgress>
                <div>
                  {activity.text}
                  <ListItemDate>{formatDate(activity.timeStamp)}</ListItemDate>
                </div>
                <DeleteButton onClick={() => onDeleteActivity(index)}>
                  ー
                </DeleteButton>
              </ListItem>
            ))}
          </React.Fragment>
        ))}
    </ListContainer>
  );
};

export default ActivityList;
