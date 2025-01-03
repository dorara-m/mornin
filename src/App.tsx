import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
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
  const [activities, setActivities] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [animate, setAnimate] = useState<boolean>(false);
  const [burstVisible, setBurstVisible] = useState<boolean>(false);

  const getMaxProgress = (level: number): number => {
    return 5 + level; // レベル0で5、レベル1で6...
  };

  const handleAddActivity = (activity: string) => {
    const maxProgress = getMaxProgress(level);

    if (progress + 1 >= maxProgress) {
      // レベルアップ処理
      setProgress(0); // 達成度をリセット
      setLevel(level + 1);

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
      setProgress(progress + 1); // 達成度を増加
    }

    setActivities([...activities, activity]);
  };

  const triggerConfetti = () => {
    const duration = 5000; // 動作時間（ミリ秒）

    const defaults = {
      origin: { y: 0.7 }, // どの位置から confetti を出すか
    };

    Confetti({
      ...defaults,
      particleCount: 100, // Confettiの数
      spread: 70, // 広がり
      startVelocity: 30, // 初速
      gravity: 1, // 落下の速度
      shapes: ["circle", "square"], // 形の種類
      scalar: 1.2, // 形のスケール
      colors: ["#ff0000", "#00ff00", "#0000ff"], // 色のバリエーション
    });
  };

  return (
    <div>
      <Header />
      <LevelContainer>
        <BurstEffect visible={burstVisible} />
        <LevelText animate={animate}>レベル: {level}</LevelText>
      </LevelContainer>
      <ActivityInput onAddActivity={handleAddActivity} />
      <ProgressBar progress={(progress / getMaxProgress(level)) * 100} />
      <ActivityList activities={activities} />
    </div>
  );
};

export default App;
