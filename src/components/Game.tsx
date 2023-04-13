import { Picture } from "./Picture";
import { Guesses } from "./Guesses";
import { Animes } from "@/Animes";
import { useState, useEffect } from "react";
import { getDayOfYear } from "date-fns";

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
  const dayOfYear = getDayOfYear(today);
  const currentDay = today.toDateString();
  const maxGuesses = [1, 2, 3, 4, 5, 6];
  function GetAnimeByDate(dayOfYear: number) {
    const animeNames: string[] = [];
    Animes.map((anime) => animeNames.push(anime.name));
    setAnimeNamesList(animeNames);

    const animesByDay = [
      10, 5, 5, 3, 8, 1, 19, 15, 16, 13, 8, 14, 14, 11, 9, 10, 9, 10, 19, 8, 4,
      1, 1, 13, 7, 11, 17, 19, 5, 19, 5, 15, 9, 8, 13, 12, 11, 2, 16, 1, 2, 19,
      4, 10, 2, 10, 6, 11, 2, 6, 1, 1, 5, 7, 3, 19, 9, 15, 15, 11, 10, 6, 5, 11,
      17, 8, 3, 17, 18, 2, 16, 11, 5, 2, 10, 10, 6, 6, 14, 18, 12, 15, 18, 0,
      14, 5, 0, 14, 5, 0, 17, 15, 12, 3, 16, 12, 11, 9, 4, 13, 3, 8, 10, 14, 17,
      14, 19, 16, 9, 10, 13, 2, 8, 11, 11, 15, 13, 10, 19, 3, 8, 12, 1, 19, 16,
      10, 19, 13, 9, 3, 13, 2, 5, 7, 9, 9, 0, 2, 7, 2, 0, 4, 16, 7, 9, 8, 8, 2,
      0, 6, 4, 2, 6, 2, 15, 11, 14, 15, 16, 16, 17, 0, 15, 13, 2, 2, 1, 12, 5,
      4, 11, 19, 3, 15, 9, 14, 15, 14, 14, 5, 2, 3, 0, 2, 0, 9, 11, 14, 15, 4,
      14, 10, 9, 7, 8, 15, 12, 3, 16, 6, 14, 0, 15, 11, 15, 14, 16, 7, 4, 0, 3,
      10, 9, 1, 5, 7, 11, 13, 17, 10, 4, 8, 10, 8, 1, 14, 3, 9, 9, 3, 5, 3, 10,
      16, 6, 16, 4, 5, 11, 13, 16, 10, 9, 0, 4, 15, 9, 8, 5, 8, 13, 0, 13, 11,
      17, 9, 11, 11, 3, 17, 10, 7, 5, 8, 12, 2, 11, 5, 0, 2, 3, 6, 18, 8, 8, 7,
      17, 11, 13, 4, 15, 0, 9, 6, 2, 15, 14, 5, 17, 6, 0, 8, 9, 14, 18, 7, 2,
      15, 5, 17, 18, 1, 9, 0, 13, 11, 1, 13, 12, 16, 6, 18, 3, 5, 2, 13, 8, 4,
      1, 5, 19, 9, 1, 11, 8, 17, 3, 7, 4, 0, 10, 19, 9, 5, 9, 11, 3, 10, 9, 19,
      2, 17, 12, 8, 5, 4, 17, 17, 0, 7, 18, 2, 11, 10, 10, 13, 14, 9, 5, 6, 15,
      3, 2, 9, 7,
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
