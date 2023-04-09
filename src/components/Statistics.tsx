import { useEffect, useState } from "react";

export const Statistics = () => {
  const [guessesStats, setGuessesStats] = useState<number[]>([]);
  const [totalPlays, setTotalPlays] = useState(0);
  const [totalWinP, setTotalWinP] = useState(0.0);

  useEffect(() => {
    const savedGuessesStats = localStorage.getItem("guessStats");
    if (savedGuessesStats) {
      setGuessesStats(JSON.parse(savedGuessesStats));
    }
  }, []);

  useEffect(() => {
    if (guessesStats.length > 0) {
      //get total plays
      const plays = guessesStats.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );
      setTotalPlays(plays);
      //get total wins
      const wins = guessesStats.slice(0, 7).reduce((a, b) => a + b, 0);
      //win percent
      const winP = plays === 0 ? 0 : Math.round((wins / plays) * 100);
      setTotalWinP(winP);
    }
  }, [guessesStats]);

  return (
    <div>
      <div className="stats shadow">
        <div className="stat">
          <h1>{totalPlays}</h1>
          <h1>Played</h1>
        </div>
        <div className="stat">
          <h1>{totalWinP}%</h1>
          <h1>Win Percentage</h1>
        </div>
      </div>
      <h1>guess distribution</h1>
    </div>
  );
};
