import { useEffect, useState } from "react";

interface StatsProps {
  gameFinished: boolean;
}

export const Statistics: React.FC<StatsProps> = ({ gameFinished }) => {
  const [guessesStats, setGuessesStats] = useState<number[]>([]);
  const [totalPlays, setTotalPlays] = useState(0);
  const [totalWinP, setTotalWinP] = useState(0.0);
  const [denominator, setDenominator] = useState(0);
  const [barWidths, setBarWidths] = useState([0, 0, 0, 0, 0, 0, 0]);

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
      //get denominator (highest guess frequency)
      const highest = Math.max(...guessesStats.slice(1, 7));
      setDenominator(highest);
    }
  }, [guessesStats, gameFinished]);

  useEffect(() => {
    //set bar widths to each guess frequency/denominator
    const barWidthArr = [
      0,
      ...guessesStats.slice(1, 7).map((value, index) => {
        return guessesStats[index + 1] === 0
          ? 5
          : Math.round((value / denominator) * 100);
      }),
    ];
    setBarWidths(barWidthArr);
  }, [denominator, gameFinished]);

  return (
    <div className="stats stats-vertical ">
      <div className="stats ">
        <div className="stat">
          <h1 className="text-3xl font-bold">{totalPlays}</h1>
          <h1 className="text-2xl font-bold">Played</h1>
        </div>
        <div className="stat">
          <h1 className="text-3xl font-bold">{totalWinP}%</h1>
          <h1 className="text-2xl font-bold">Win Percentage</h1>
        </div>
      </div>
      <div className="stat">
        <div>
          {guessesStats.slice(1, 7).map((value, index) => (
            <div className="flex" key={index}>
              <div className="w-5 text-1xl font-bold">{index + 1}</div>
              <div
                style={{
                  width: `${barWidths[index + 1]}%`,
                  backgroundColor: "lightgray",
                  height: "20px",
                }}
              ></div>
              <div className="w-5 text-1xl font-bold">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
