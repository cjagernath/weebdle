import { useEffect, useState } from "react";
import { Game } from "@/components/Game";
//import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Home() {
  const [theme, setTheme] = useState("night");
  const [dailyCount, setDailyCount] = useState(0);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const day1 = new Date(2023, 3, 8); //day1 is set to April, 8, 2023
  const today = new Date();

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Weebdle";
      const savedTheme = localStorage.getItem("theme");
      setDailyCount(
        Math.ceil((today.getTime() - day1.getTime()) / (1000 * 60 * 60 * 24))
      );
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
          <Game dailyCount={dailyCount} onFinished={handleGameOver} />
        </center>
      </div>
    </div>
  );
}
