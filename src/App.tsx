import React, { useState } from "react";
import Header from "./components/Header";
import ActivityInput from "./components/ActivityInput";
import ProgressBar from "./components/ProgressBar";
import ActivityList from "./components/ActivityList";

const App: React.FC = () => {
  const [activities, setActivities] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const handleAddActivity = (activity: string) => {
    setActivities([...activities, activity]);
    setProgress(progress + 10); // 達成度を10ずつ上昇
  };

  return (
    <div>
      <Header />
      <ActivityInput onAddActivity={handleAddActivity} />
      <ProgressBar progress={progress} />
      <ActivityList activities={activities} />
    </div>
  );
};

export default App;
