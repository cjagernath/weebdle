import { useEffect, useState } from "react";
import { Game } from "@/components/Game";
//import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
// import { initializeApp } from "firebase/app";
// import { getAnalytics, logEvent, isSupported } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyC36zZQgSvNzmy8mjrde5FbStYFcxzBaSI",
//   authDomain: "weebdleapp-1f90d.firebaseapp.com",
//   projectId: "weebdleapp-1f90d",
//   storageBucket: "weebdleapp-1f90d.appspot.com",
//   messagingSenderId: "46038143996",
//   appId: "1:46038143996:web:31b5f8ea109f133e579879",
//   measurementId: "G-BJZK5MVB27",
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default function Home() {
  const [theme, setTheme] = useState("night");
  const [dailyCount, setDailyCount] = useState(0);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const day1 = new Date(2023, 3, 8); //day1 is set to April, 8, 2023
  const today = new Date();

  useEffect(() => {
    if (typeof window !== "undefined") {
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
    // if (gameOver) {
    //   logEvent(analytics, "user-finished-playing");
    // }
  };

  return (
    <div data-theme={theme}>
      <div className="flex flex-col h-screen justify-between">
        <title>Weebdle</title>
        <center>
          <Header
            dailyCount={dailyCount}
            onClick={handleClick}
            gameFinished={gameFinished}
          />
          <br />
          <Game
            dailyCount={dailyCount}
            onFinished={handleGameOver}
            today={new Date()}
          />
        </center>
      </div>
    </div>
  );
}
