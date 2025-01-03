import React, { useState } from "react";
import Header from "./components/Header";
import ActivityInput from "./components/ActivityInput";
import ProgressBar from "./components/ProgressBar";
import ActivityList from "./components/ActivityList";

const App: React.FC = () => {
  const [activities, setActivities] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);

  const getMaxProgress = (level: number): number => {
    return 5 + level; // レベル0で5、レベル1で6...
  };

  const handleAddActivity = (activity: string) => {
    const maxProgress = getMaxProgress(level);

    if (progress + 1 >= maxProgress) {
      // レベルアップ処理
      setLevel(level + 1);
      setProgress(0); // 達成度をリセット
    } else {
      setProgress(progress + 1); // 達成度を増加
    }

    setActivities([...activities, activity]);
  };

  return (
    <div>
      <Header />
      <ActivityInput onAddActivity={handleAddActivity} />
      <ProgressBar progress={(progress / getMaxProgress(level)) * 100} />
      <h3>レベル: {level}</h3>
      <ActivityList activities={activities} />
    </div>
  );
};

export default App;