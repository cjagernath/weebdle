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
  console.log(dayOfYear);
  console.log(today);
  function GetAnimeByDate(dayOfYear: number) {
    const animeNames: string[] = [];
    Animes.map((anime) => animeNames.push(anime.name));
    setAnimeNamesList(animeNames);

    const animesByDay = [
      7, 18, 11, 16, 3, 3, 3, 6, 7, 5, 3, 6, 1, 4, 18, 2, 7, 11, 13, 0, 1, 8,
      11, 6, 1, 0, 17, 6, 10, 6, 7, 8, 14, 6, 4, 4, 8, 6, 7, 2, 10, 6, 16, 4,
      12, 6, 7, 8, 17, 6, 9, 12, 12, 16, 14, 2, 16, 17, 11, 12, 12, 1, 7, 8, 10,
      7, 16, 12, 12, 3, 17, 12, 16, 7, 2, 10, 3, 14, 3, 3, 3, 10, 9, 0, 8, 0,
      16, 12, 11, 11, 1, 16, 2, 9, 6, 0, 4, 16, 6, 0, 8, 0, 6, 9, 5, 7, 6, 11,
      4, 19, 5, 7, 14, 4, 4, 4, 2, 17, 14, 7, 5, 4, 7, 4, 11, 0, 4, 7, 6, 2, 17,
      0, 3, 5, 2, 5, 3, 5, 7, 5, 1, 12, 4, 19, 6, 10, 8, 19, 12, 10, 2, 10, 3,
      14, 16, 18, 6, 10, 2, 0, 6, 17, 8, 10, 0, 6, 18, 8, 2, 1, 0, 1, 16, 6, 17,
      7, 0, 1, 9, 9, 19, 1, 2, 17, 19, 3, 5, 2, 5, 3, 3, 7, 5, 18, 5, 16, 4, 11,
      4, 7, 18, 17, 10, 14, 2, 1, 14, 2, 2, 8, 5, 3, 5, 10, 5, 10, 19, 7, 4, 19,
      9, 19, 12, 0, 5, 7, 11, 17, 16, 11, 6, 6, 16, 14, 1, 6, 17, 18,
    ];
    const winner = animesByDay[dayOfYear];
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
      setSavedGuessesArray([0, 0, 0, 0, 0, 0, 0, 0]);
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
