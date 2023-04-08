import { useEffect, useState } from "react";
import { Game } from "@/components/Game";
//import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Home() {
  const [theme, setTheme] = useState("night");
  const [dailyCount, setDailyCount] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, []);

  const handleClick = () => {
    const newTheme = theme === "cupcake" ? "night" : "cupcake";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleStats = (dailyCount: number) => {
    setDailyCount(dailyCount);
  };

  return (
    <div data-theme={theme}>
      <div className="flex flex-col h-screen justify-between">
        <center>
          <Header dailyCount={dailyCount} onClick={handleClick} />
          <br />
          <Game onReset={handleStats} />
        </center>
      </div>
    </div>
  );
}
