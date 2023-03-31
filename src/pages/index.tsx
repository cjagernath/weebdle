// pages/index.js

import { Game } from "@/components/Game";
import { useState } from "react";

export default function Home() {
  const [theme, setTheme] = useState("night");

  const handleClick = () => {
    theme === "pastel" ? setTheme("night") : setTheme("pastel");
  };

  return (
    <div data-theme={theme}>
      <button className="btn btn-accent btn-sm" onClick={handleClick}>
        {theme === "pastel" ? <div>🌙</div> : <div>🌞</div>}
      </button>
      <Game />
    </div>
  );
}
