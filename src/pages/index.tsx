import { useEffect, useState } from "react";
import { Game } from "@/components/Game";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Home() {
  const [theme, setTheme] = useState("night");
  const [dailyCount, setDailyCount] = useState(0);
  const [scores, setScores] = useState([0]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, []);

  const handleClick = () => {
    const newTheme = theme === "pastel" ? "night" : "pastel";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
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
        </center>
      </div>
    </div>
  );
}
