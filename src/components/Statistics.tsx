import { useEffect } from "react";

export function Statistics() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const guessStats = localStorage.getItem("guessStats");
      console.log(guessStats);
      if (guessStats !== null) {
        const guessStatsMap = Object.keys(parseInt(guessStats)).map(
          (guessNum) => (
            <div key={guessNum}>
              {guessNum} : {guessStats[parseInt(guessNum)]}
            </div>
          )
        );
      }
    }
  }, []);

  return <div>Statistics</div>;
}
