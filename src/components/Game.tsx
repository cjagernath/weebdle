import { Picture } from "./Picture";
import { Guesses } from "./Guesses";
import { Animes } from "@/Animes";
import { useState, useEffect } from "react";

interface GameProps {
  onFinished: (gameOver: boolean) => void;
  dailyCount: number;
  today: Date;
}

export const Game: React.FC<GameProps> = ({
  onFinished,
  dailyCount,
  today,
}) => {
  const [guessNum, setGuessNum] = useState(1);
  const [winner, setWinner] = useState(-1);
  const [winnerName, setWinnerName] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [guesses, setGuesses] = useState<number[]>([1]);
  const [animeNamesList, setAnimeNamesList] = useState<string[]>([]);
  const guessesStats = [0, 0, 0, 0, 0, 0, 0, 0];
  const [savedGuessesArray, setSavedGuessesArray] = useState<number[]>([]);
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
      5, 11, 8, 7, 3, 1, 12, 2, 9, 0, 5, 7, 11, 3, 7, 3, 3, 2, 2, 9, 11, 13, 7,
      5, 12, 5, 12, 5, 10, 9, 7, 5, 0, 8, 8, 12, 11, 5, 10, 8, 9, 1, 2, 12, 4,
      4, 4, 4, 4, 3, 8, 9, 10, 3, 3, 11, 3, 3, 6, 10, 9, 2, 6, 7, 10, 5, 7, 5,
      0, 2, 12, 9, 11, 10, 7, 5, 13, 0, 8, 7, 13, 9, 9, 0, 2, 2, 2, 4, 4, 4, 7,
      4, 9, 3, 8, 1, 3, 4, 10, 4, 13, 4, 4, 9, 3, 3, 3, 12, 1, 8, 10, 7, 11, 11,
      11, 12, 11, 2, 1, 7, 5, 6, 4, 10, 4, 6, 13, 4, 7, 4, 6, 13, 2, 11, 6, 11,
      4, 4, 11, 11, 11, 3, 6, 9, 13, 5, 1, 5, 8, 2, 2, 2, 7, 11, 12, 13, 3, 3,
      3, 8, 10, 9, 6, 9, 9, 1, 6, 1, 11, 2, 7, 2, 2, 7, 13, 9, 11, 3, 7, 3, 3,
      10, 9, 9, 6, 8, 7, 13, 6, 7, 2, 2, 12, 4, 11, 11, 6, 10, 4, 12, 6, 4, 7,
      5, 1, 10, 9, 5, 12, 5, 7, 10, 13, 7, 5, 1, 3, 9, 5, 12, 5, 7, 5, 6, 1, 11,
      5, 6, 12, 7, 4, 6, 4, 4, 10, 12, 9, 7, 8, 1, 10, 1, 7, 12, 2, 7, 10, 2,
      10,
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
        animeNamesList={animeNamesList.sort()}
        maxGuesses={maxGuesses}
        dailyCount={dailyCount}
        savedGuessCorrect={isCorrect}
      />
    </div>
  );
};
