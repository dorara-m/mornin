import React, { useState } from "react";
import styled from "styled-components";
import Confetti from "canvas-confetti";
import Header from "./components/Header";
import ActivityInput from "./components/ActivityInput";
import ProgressBar from "./components/ProgressBar";
import ActivityList from "./components/ActivityList";

const LevelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  position: relative;
`;

const LevelText = styled.div`
  font-size: 5rem;
  font-weight: bold;
  color: #4caf50;
  position: relative;
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

  return (
    <div>
      <Header />
      <LevelContainer>
        <LevelText>Lv.{level}</LevelText>
      </LevelContainer>
      <ProgressBar progress={(displayProgress / getMaxProgress(level)) * 100} />
      <ActivityInput onAddActivity={handleAddActivity} />
      <ActivityList
        activities={activities}
        onDeleteActivity={handleDeleteActivity}
      />
    </div>
  );
};

export default App;
