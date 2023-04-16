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
      1, 17, 1, 21, 7, 4, 4, 0, 12, 23, 1, 30, 27, 6, 6, 1, 24, 10, 1, 33, 27,
      19, 21, 1, 22, 31, 15, 10, 23, 29, 21, 14, 16, 21, 14, 24, 11, 32, 17, 23,
      21, 18, 3, 7, 28, 32, 26, 24, 10, 16, 27, 18, 28, 24, 19, 16, 18, 13, 6,
      21, 31, 27, 22, 23, 6, 15, 10, 8, 18, 18, 19, 16, 5, 14, 10, 20, 2, 19,
      32, 11, 1, 23, 14, 12, 11, 33, 29, 26, 2, 15, 20, 32, 20, 4, 28, 0, 19,
      19, 28, 25, 18, 13, 27, 14, 33, 23, 9, 22, 11, 9, 21, 24, 32, 9, 10, 2,
      10, 28, 27, 9, 12, 24, 5, 18, 20, 33, 1, 3, 7, 6, 13, 21, 26, 9, 14, 10,
      6, 24, 30, 18, 14, 17, 33, 16, 31, 8, 4, 18, 17, 1, 22, 19, 30, 1, 10, 10,
      17, 14, 10, 14, 25, 6, 5, 7, 14, 19, 31, 14, 20, 17, 0, 6, 19, 13, 15, 25,
      3, 20, 7, 31, 28, 17, 13, 10, 9, 26, 17, 18, 6, 24, 26, 7, 29, 3, 21, 18,
      33, 9, 17, 28, 30, 15, 32, 24, 31, 16, 27, 18, 10, 15, 26, 31, 13, 26, 2,
      5, 7, 9, 27, 22, 13, 20, 17, 31, 6, 16, 22, 4, 8, 8, 16, 29, 2, 13, 8, 12,
      13, 10, 9, 30, 10, 14, 6, 13, 7, 21, 30, 15, 27, 27, 33, 25, 13, 8, 32,
      19, 18, 23, 13, 16, 7, 23, 24, 7, 15, 21, 8, 30, 14, 23, 18, 29, 1, 12,
      29, 2, 32, 27, 29, 20, 21, 15, 19, 33, 11, 19, 7, 10, 7, 21, 29, 6, 6, 23,
      32, 4, 8, 9, 4, 0, 5, 12, 16, 9, 28, 12, 19, 20, 9, 29, 10, 31, 26, 18,
      14, 23, 30, 25, 31, 21, 26, 15, 33, 12, 20, 15, 3, 25, 28, 5, 28, 10, 1,
      31, 19, 30, 24, 9, 22, 24, 5, 24, 8, 24, 30, 5, 24, 20, 26, 15, 29, 23, 1,
      17, 32, 12, 20, 20, 22, 9, 20, 23, 3, 2, 25,
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
