// pages/index.js

import { Game } from "@/components/Game";
import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Home() {
  const [theme, setTheme] = useState("night");
  const [dailyCount, setDailyCount] = useState(0);
  const [scores, setScores] = useState([0]);

  const handleClick = () => {
    theme === "pastel" ? setTheme("night") : setTheme("pastel");
  };

  const handleScoreUpdate = (scores: number[]) => {
    setScores(scores);
  };

  const handleStats = (dailyCount: number) => {
    setDailyCount(dailyCount);
  };

  return (
    <div data-theme={theme}>
      <div className="flex flex-col h-screen justify-between">
        <center>
          <Header
            dailyCount={dailyCount}
            onClick={handleClick}
            scores={scores}
          />
          <br />
          <Game onReset={handleStats} updateScores={handleScoreUpdate} />
          <br />
          <Footer />
        </center>
      </div>
    </div>
  );
}
