// pages/index.js

import { Game } from "@/components/Game";
import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Home() {
  const [theme, setTheme] = useState("night");
  const [dailyCount, setDailyCount] = useState(0);

  const handleClick = () => {
    theme === "cupcake" ? setTheme("night") : setTheme("cupcake");
  };

  return (
    <div data-theme={theme}>
      <div className="flex flex-col h-screen justify-between">
        <center>
          <Header dailyCount={dailyCount} onClick={handleClick} />
          <Game />
          <Footer />
        </center>
      </div>
    </div>
  );
}
