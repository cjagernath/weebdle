import { useEffect, useState } from "react";

export function Statistics() {
  const [guessesStats, setGuessesStats] = useState<number[]>([]);

  useEffect(() => {
    const savedGuessesStats = localStorage.getItem("guessesStats");
    if (savedGuessesStats) {
      setGuessesStats(JSON.parse(savedGuessesStats));
    }
  }, [guessesStats]);

  return (
    <div>
      <ul>
        {guessesStats.map((num, index) => (
          <li key={index}>{num}</li>
        ))}
      </ul>
    </div>
  );
}
