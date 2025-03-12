import React, { useState } from "react";
import styled from "styled-components";
import Confetti from "canvas-confetti";
import Header from "./components/Header";
import ActivityInput from "./components/ActivityInput";
import ProgressBar from "./components/ProgressBar";
import ActivityList from "./components/ActivityList";
import Container from "./components/Container";
import UserForm from "./components/UserForm";
import EditIcon from "@mui/icons-material/Edit";

const LevelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 2rem;
`;

const UserIconContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
`;

const UserIcon = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const LevelText = styled.div`
  margin-top: 1rem;
  font-size: 3.5rem;
  font-weight: bold;
  color: #4caf50;
`;

const Username = styled.div`
  position: absolute;
  bottom: 8px;
  right: -16px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: bold;
`;

const EditButton = styled.button`
  position: absolute;
  top: 0;
  right: -40px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    background: #45a049;
  }

  & svg {
    font-size: 18px;
  }
`;

const App: React.FC = () => {
  // ローカルストレージからデータを取得する関数
  const getSavedActivities = (): {
    text: string;
    progress: number;
    timeStamp: string;
  }[] => {
    const saved = localStorage.getItem("mornin-activities");
    return saved ? JSON.parse(saved) : [];
  };
  const getSavedProgress = (): number => {
    const saved = localStorage.getItem("mornin-displayProgress");
    return saved ? Number(saved) : 0;
  };
  const getSavedLevel = (): number => {
    const saved = localStorage.getItem("mornin-level");
    return saved ? Number(saved) : 1;
  };

  const [activities, setActivities] = useState(getSavedActivities);
  const [displayProgress, setDisplayProgress] = useState(getSavedProgress);
  const [level, setLevel] = useState(getSavedLevel);
  const [username, setUsername] = useState(
    localStorage.getItem("mornin-username") || ""
  );
  const [userIcon, setUserIcon] = useState(
    localStorage.getItem("mornin-userIcon") || ""
  );
  const [showUserForm, setShowUserForm] = useState(!username || !userIcon);

  const getMaxProgress = (level: number): number => {
    return 4 + level; // レベル1で5、レベル2で6...
  };

  const handleAddActivity = (
    text: string,
    progress: number,
    timeStamp: string
  ) => {
    const maxProgress = getMaxProgress(level);
    let newProgress = 0;
    if (displayProgress + progress >= maxProgress) {
      // 進捗度がmaxを超えたとき = レベルアップしたとき
      newProgress = displayProgress + progress - maxProgress;
      setDisplayProgress(newProgress); // 表示上の進捗を調整（次のレベルに持ち越す）
      // レベルアップ
      const newLevel = level + 1;
      setLevel(newLevel);
      localStorage.setItem("mornin-level", newLevel.toString());

      // 紙吹雪をトリガー
      triggerConfetti();
    } else {
      // レベルアップしていないとき → いつも通り進捗を加算
      newProgress = displayProgress + progress;
      setDisplayProgress(newProgress);
    }
    localStorage.setItem("mornin-displayProgress", newProgress.toString());

    const activity = {
      text: text,
      progress: progress,
      timeStamp: timeStamp,
    };
    const newActivities = [activity, ...activities];
    setActivities(newActivities);
    localStorage.setItem("mornin-activities", JSON.stringify(newActivities));
  };

  const handleDeleteActivity = (index: number) => {
    // 削除するアクティビティを指定
    const activityToRemove = activities[index];
    // 削除したいアクティビティの進捗以外をフィルター処理 → 削除された配列ができる
    const newActivities = activities.filter((_, i) => i !== index);
    setActivities(newActivities);
    localStorage.setItem("mornin-activities", JSON.stringify(newActivities));

    // 削除されたアクティビティの進捗値を戻す
    let newProgress = displayProgress - activityToRemove.progress;
    // 進捗が負の値になった場合、レベルを減少させる
    let newLevel = level;
    while (newProgress < 0 && newLevel > 1) {
      newLevel -= 1; // レベルを下げる
      newProgress += getMaxProgress(newLevel); // 前のレベルの最大進捗を追加
    }
    // レベルと進捗を更新
    setDisplayProgress(newProgress >= 0 ? newProgress : 0); // 最小値は0
    setLevel(newLevel);
    localStorage.setItem("mornin-displayProgress", newProgress.toString());
    localStorage.setItem("mornin-level", newLevel.toString());
  };

  const triggerConfetti = () => {
    Confetti({
      origin: { y: 0.7 },
      particleCount: 150, // Confettiの数
      spread: 100, // 広がり
      startVelocity: 30, // 初速
      gravity: 1, // 落下の速度
      scalar: 1.2, // 形のスケール
    });
  };

  const handleUserSubmit = (newUsername: string, newIcon: string) => {
    setUsername(newUsername);
    setUserIcon(newIcon);
    localStorage.setItem("mornin-username", newUsername);
    localStorage.setItem("mornin-userIcon", newIcon);
    setShowUserForm(false);
  };

  const handleEditUser = () => {
    setShowUserForm(true);
  };

  const handleCancelEdit = () => {
    setShowUserForm(false);
  };

  return (
    <div>
      <Header />
      <Container>
        {showUserForm ? (
          <UserForm
            onSubmit={handleUserSubmit}
            onCancel={handleCancelEdit}
            initialUsername={username}
            initialIcon={userIcon}
          />
        ) : (
          <>
            <LevelContainer>
              <UserIconContainer>
                <UserIcon src={userIcon} alt={username} />
                <Username>{username}</Username>
                <EditButton onClick={handleEditUser}>
                  <EditIcon />
                </EditButton>
              </UserIconContainer>
              <LevelText>Lv.{level}</LevelText>
            </LevelContainer>
            <ProgressBar
              progress={(displayProgress / getMaxProgress(level)) * 100}
            />
            <ActivityInput onAddActivity={handleAddActivity} />
            <ActivityList
              activities={activities}
              onDeleteActivity={handleDeleteActivity}
              level={level}
            />
          </>
        )}
      </Container>
    </div>
  );
};

export default App;
