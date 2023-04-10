import { useEffect, useState } from "react";

interface StatsProps {
  gameFinished: boolean;
}

export const Statistics: React.FC<StatsProps> = ({ gameFinished }) => {
  const [guessesStats, setGuessesStats] = useState<number[]>([]);
  const [totalPlays, setTotalPlays] = useState(0);
  const [totalWinP, setTotalWinP] = useState(0.0);

  useEffect(() => {
    const savedGuessesStats = localStorage.getItem("guessStats");
    if (savedGuessesStats) {
      setGuessesStats(JSON.parse(savedGuessesStats));
    }
  }, [gameFinished]);

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
    <div className="stats stats-vertical bg-accent text-white">
      <div className="stats bg-accent text-white">
        <div className="stat">
          <h1 className="text-3xl font-bold">{totalPlays}</h1>
          <h1 className="text-1xl font-bold">Played</h1>
        </div>
        <div className="stat">
          <h1 className="text-3xl font-bold">{totalWinP}%</h1>
          <h1 className="text-1xl font-bold">Win Percentage</h1>
        </div>
      </div>
      <div className="stat">
        {guessesStats.slice(1, 7).map((value, index) => (
          <h1 className="text-1xl font-bold " key={index}>
            {index + 1}: {value}
          </h1>
        ))}
      </div>
    </div>
  );
};
