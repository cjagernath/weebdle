import { Picture } from "./Picture";
import { Guesses } from "./Guesses";
import { Animes } from "@/Animes";
import { useState, useEffect } from "react";

interface GameProps {
  onReset: (dayCounter: number) => void;
  updateScores: (scores: number[]) => void;
}

export const Game: React.FC<GameProps> = ({ onReset, updateScores }) => {
  const [guessNum, setGuessNum] = useState(1);
  const [winner, setWinner] = useState(-1);
  const [winnerName, setWinnerName] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [guesses, setGuesses] = useState<number[]>([1]);
  const [animeNamesList, setAnimeNamesList] = useState<string[]>([]);
  const [dailyCount, setDailyCount] = useState(0);
  const GuessStats: { [key: number]: number } = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };

  const maxGuesses = [1, 2, 3, 4, 5, 6];
  let dayCounter = 0;
  let prevDay = 0;

  function GetAnimeByDate(dayOfYear: number) {
    if (dayOfYear !== prevDay) {
      dayCounter++;
      onReset(dayCounter);
      prevDay = dayOfYear;
    }
    const animeNames: string[] = [];
    Animes.map((anime) => animeNames.push(anime.name));
    setAnimeNamesList(animeNames);

    const animesByDay = [
      0, 3, 4, 2, 1, 5, 4, 1, 3, 0, 2, 3, 4, 1, 0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3,
      1, 0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1,
      0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1, 0,
      2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1, 0, 2,
      5, 4, 3, 1, 0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1, 0, 2, 5,
      4, 3, 1, 0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1, 0, 2, 5, 4,
      3, 1, 0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3,
      1, 0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1,
      0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1, 0,
      2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1, 0, 2, 5, 4, 3, 1, 0,
    ];
    console.log(dayOfYear);
    const winner = animesByDay[dayOfYear - 1];
    const winnerName = animeNames[winner];
    return { winner, winnerName };
  }

  const handleGuess = (guessedCorrect: boolean) => {
    setIsCorrect(guessedCorrect);

    if (!guessedCorrect && guessNum < 6) {
      setGuessNum(guessNum + 1);
      setGuesses([...guesses, guessNum + 1]);
      GuessStats[guessNum]++;
    } else if (!guessedCorrect && guessNum === 6) {
      setGuessNum(guessNum + 1);
    }
    const GuessStatsArray = Object.values(GuessStats);
    updateScores(GuessStatsArray);
  };

  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.ceil(
      (today.getTime() - new Date(today.getFullYear(), 0, 1).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const { winner, winnerName } = GetAnimeByDate(dayOfYear);
    setWinner(winner);
    setWinnerName(winnerName);
    setDailyCount(dayCounter);
  }, []);

  return (
    <div>
      {winner >= 0 && (
        <Picture
          guessNum={guessNum}
          guessedCorrect={isCorrect}
          guesses={guesses}
          winner={winner}
          maxGuesses={maxGuesses}
        />
      )}
      <br />
      <Guesses
        guessNum={guessNum}
        winnerName={winnerName}
        onSubmitGuess={handleGuess}
        guesses={guesses}
        animeNamesList={animeNamesList}
        maxGuesses={maxGuesses}
        dailyCount={dailyCount}
      />
    </div>
  );
};
