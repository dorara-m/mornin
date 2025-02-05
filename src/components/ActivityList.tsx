import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

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
  margin-left: 1rem;
  display: inline-block;
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
  width: 25px;
  height: 25px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #666;
  }
`;

const DateHeaderContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 2rem 0 1rem;
`;
const DateHeader = styled.h3`
  margin: 0;
  color: #666;
  font-size: 1.1rem;
`;
const CopyButton = styled.button`
  margin-left: 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.2rem 0.6rem;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e0e0e0;
  }
`;

interface Props {
  activities: {
    text: string;
    progress: number;
    timeStamp: string;
  }[];
  onDeleteActivity: (index: number) => void;
  level: number;
}

const ActivityList: React.FC<Props> = ({
  activities,
  onDeleteActivity,
  level,
}) => {
  const formatDate = (timestamp: string): string => {
    return dayjs(timestamp).format("H:mm");
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

  // 日付ごとのアクティビティをクリップボードにコピー
  const copyDayActivities = (
    activities: (typeof groupedActivities)[string]
  ) => {
    const totalPoints = activities.reduce(
      (sum, activity) => sum + activity.progress,
      0
    );

    const text = `本日の朝活\n${activities
      .map((activity) => `+${activity.progress} ${activity.text}`)
      .join("\n")}\n合計 ${totalPoints}点\n\n朝活Lv. ${level}`;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("以下をクリップボードにコピーしました\n\n" + text);
      })
      .catch((err) => {
        console.error("コピーに失敗しました:", err);
      });
  };

  return (
    <ListContainer>
      {Object.entries(groupedActivities)
        .sort(([dateA], [dateB]) => (dateB < dateA ? -1 : 1))
        .map(([date, dateActivities]) => (
          <React.Fragment key={date}>
            <DateHeaderContainer>
              <DateHeader>{formatDateHeader(date)}</DateHeader>
              <CopyButton onClick={() => copyDayActivities(dateActivities)}>
                <ContentCopyIcon sx={{ fontSize: 16, color: "#666" }} />
              </CopyButton>
            </DateHeaderContainer>
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
