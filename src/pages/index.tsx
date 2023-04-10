import { useEffect, useState } from "react";
import { Game } from "@/components/Game";
//import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Home() {
  const [theme, setTheme] = useState("night");
  const [dailyCount, setDailyCount] = useState(0);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, []);

  const handleClick = () => {
    const newTheme = theme === "light" ? "night" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleDay = (dailyCount: number) => {
    setDailyCount(dailyCount);
  };

  const handleGameOver = (gameOver: boolean) => {
    setGameFinished(gameOver);
  };

  return (
    <div data-theme={theme}>
      <div className="flex flex-col h-screen justify-between">
        <center>
          <Header
            dailyCount={dailyCount}
            onClick={handleClick}
            gameFinished={gameFinished}
          />
          <br />
          <Game onReset={handleDay} onFinished={handleGameOver} />
        </center>
      </div>
    </div>
  );
}
