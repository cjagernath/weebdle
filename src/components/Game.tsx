import { Picture } from "./Picture";
import { Guesses } from "./Guesses";
import { Animes } from "@/Animes";
import { useState, useEffect } from "react";

interface GameProps {
  onFinished: (gameOver: boolean) => void;
  dailyCount: number;
}

export const Game: React.FC<GameProps> = ({ onFinished, dailyCount }) => {
  const [guessNum, setGuessNum] = useState(1);
  const [winner, setWinner] = useState(-1);
  const [winnerName, setWinnerName] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [guesses, setGuesses] = useState<number[]>([1]);
  const [animeNamesList, setAnimeNamesList] = useState<string[]>([]);
  const guessesStats = [0, 0, 0, 0, 0, 0, 0, 0];
  const [savedGuessesArray, setSavedGuessesArray] = useState<number[]>([]);
  const today = new Date();
  const dayOfYear = Math.ceil(
    (today.getTime() - new Date(today.getFullYear(), 0, 1).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const currentDay = today.toDateString();
  const maxGuesses = [1, 2, 3, 4, 5, 6];

  function GetAnimeByDate(dayOfYear: number) {
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
    const winner = animesByDay[dayOfYear - 1];
    const winnerName = animeNames[winner];
    return { winner, winnerName };
  }

  const handleGuess = (guessedCorrect: boolean) => {
    setIsCorrect(guessedCorrect);

    if (!guessedCorrect && guessNum < 6) {
      setGuessNum(guessNum + 1);
      setGuesses([...guesses, guessNum + 1]);
    } else if (!guessedCorrect && guessNum === 6) {
      setGuessNum(guessNum + 1);
      localStorage.setItem("lastPlayedDate", currentDay);
      localStorage.setItem("guessNum", (7).toLocaleString());
      const updatedGuessesArray = [...savedGuessesArray];
      updatedGuessesArray[7] = updatedGuessesArray[7] + 1;
      localStorage.setItem("guessStats", JSON.stringify(updatedGuessesArray));
      onFinished(true);
    } else if (guessedCorrect) {
      localStorage.setItem("lastPlayedDate", currentDay);
      localStorage.setItem("guessNum", guessNum.toLocaleString());
      const updatedGuessesArray = [...savedGuessesArray];
      updatedGuessesArray[guessNum] = updatedGuessesArray[guessNum] + 1;
      localStorage.setItem("guessStats", JSON.stringify(updatedGuessesArray));
      onFinished(true);
    }
  };

  useEffect(() => {
    const lastPlayedDate = localStorage.getItem("lastPlayedDate");
    const { winner, winnerName } = GetAnimeByDate(dayOfYear);
    setWinner(winner);
    setWinnerName(winnerName);
    onFinished(false);

    const savedGuessesStats = localStorage.getItem("guessStats");
    if (!savedGuessesStats) {
      localStorage.setItem("guessStats", JSON.stringify(guessesStats));
    } else if (savedGuessesStats) {
      setSavedGuessesArray(JSON.parse(savedGuessesStats));
    }

    if (lastPlayedDate === currentDay) {
      const savedGuessNum = localStorage.getItem("guessNum");
      if (savedGuessNum !== null) {
        if (parseInt(savedGuessNum) !== 7) {
          setGuessNum(parseInt(savedGuessNum));
          setIsCorrect(true);
        } else if (parseInt(savedGuessNum) === 7) {
          setGuessNum(7);
          setIsCorrect(false);
        }
      }
    }
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
        savedGuessCorrect={isCorrect}
      />
    </div>
  );
};
