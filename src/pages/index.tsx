// pages/index.js

import { Game } from "@/components/Game";
import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Home() {
  const [theme, setTheme] = useState("night");
  const [dailyCount, setDailyCount] = useState(1);

  const handleClick = () => {
    theme === "pastel" ? setTheme("night") : setTheme("pastel");
  };

  return (
    <div data-theme={theme}>
      <div className="flex flex-col h-screen justify-between">
        <center>
          <Header dailyCount={dailyCount} onClick={handleClick} />
          <br />
          <Game />
          <br />
          <Footer />
        </center>
      </div>
    </div>
  );
}
