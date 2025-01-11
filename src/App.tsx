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

const LevelText = styled.div<{ animate: boolean }>`
  font-size: 5rem;
  font-weight: bold;
  color: #4caf50;
  position: relative;
  transition: transform 0.5s ease;
  transform: ${(props) =>
    props.animate ? "translateY(-50px)" : "translateY(0)"};
`;

const BurstEffect = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  z-index: 1;
`;

const App: React.FC = () => {
  const [activities, setActivities] = useState<
    { text: string; progress: number; timeStamp: string }[]
  >([]);
  const [displayProgress, setDisplayProgress] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [animate, setAnimate] = useState<boolean>(false);
  const [burstVisible, setBurstVisible] = useState<boolean>(false);

  const getMaxProgress = (level: number): number => {
    return 4 + level; // レベル1で5、レベル2で6...
  };

  // 日付をフォーマットする関数
  const formatDate = (date: Date): string => {
    const month = date.getMonth() + 1; // 月は0から始まるため+1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0"); // 2桁に揃える
    return `${month}/${day} ${hours}:${minutes}`;
  };

  const handleAddActivity = (
    text: string,
    progress: number,
    timeStamp: Date
  ) => {
    const maxProgress = getMaxProgress(level);

    if (displayProgress + progress >= maxProgress) {
      // 進捗度がmaxを超えたとき = レベルアップしたとき
      setDisplayProgress(displayProgress + progress - maxProgress); // 表示上の進捗を調整（次のレベルに持ち越す）
      setLevel(level + 1); // レベルを1つ上げる

      // アニメーションとconfettiをトリガー
      setAnimate(true);
      setBurstVisible(true);
      triggerConfetti();

      setTimeout(() => {
        setAnimate(false);
      }, 500);

      setTimeout(() => {
        setBurstVisible(false);
      }, 1000);
    } else {
      // レベルアップしていないとき → いつも通り進捗を加算
      setDisplayProgress(displayProgress + progress);
    }

    // このタイミングで日付をフォーマットしてactivitiesに追加
    const activity = {
      text: text,
      progress: progress,
      timeStamp: formatDate(timeStamp),
    };

    setActivities([activity, ...activities]);
  };

  const triggerConfetti = () => {
    Confetti({
      origin: { y: 0.7 },
      particleCount: 100, // Confettiの数
      spread: 70, // 広がり
      startVelocity: 30, // 初速
      gravity: 1, // 落下の速度
      scalar: 1.2, // 形のスケール
    });
  };

  return (
    <div>
      <Header />
      <LevelContainer>
        <BurstEffect visible={burstVisible} />
        <LevelText animate={animate}>Lv.{level}</LevelText>
      </LevelContainer>
      <ActivityInput onAddActivity={handleAddActivity} />
      <ProgressBar progress={(displayProgress / getMaxProgress(level)) * 100} />
      <ActivityList activities={activities} />
    </div>
  );
};

export default App;
