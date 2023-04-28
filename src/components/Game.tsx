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
      84, 23, 23, 44, 85, 29, 18, 33, 53, 4, 71, 18, 0, 50, 45, 72, 1, 79, 43,
      28, 44, 37, 73, 5, 45, 25, 49, 13, 25, 73, 28, 30, 49, 19, 25, 85, 10, 58,
      54, 57, 54, 70, 26, 13, 13, 78, 86, 1, 42, 84, 26, 76, 41, 83, 31, 58, 3,
      49, 54, 78, 2, 61, 36, 19, 21, 67, 26, 36, 66, 46, 56, 15, 25, 71, 14, 42,
      36, 57, 25, 61, 30, 60, 37, 58, 86, 43, 60, 40, 50, 41, 67, 55, 77, 74,
      66, 3, 66, 79, 18, 50, 56, 69, 3, 47, 12, 59, 68, 10, 13, 17, 63, 72, 74,
      31, 78, 6, 39, 36, 64, 0, 70, 18, 64, 3, 76, 0, 61, 42, 50, 32, 9, 15, 34,
      61, 49, 51, 62, 86, 11, 11, 7, 83, 43, 12, 25, 44, 33, 28, 60, 14, 82, 8,
      14, 19, 22, 67, 2, 49, 6, 29, 31, 15, 44, 84, 15, 57, 77, 16, 70, 60, 5,
      10, 46, 2, 44, 75, 35, 31, 4, 38, 49, 4, 44, 76, 33, 74, 59, 28, 15, 86,
      40, 72, 72, 62, 84, 8, 66, 54, 86, 52, 10, 12, 56, 10, 72, 79, 62, 9, 9,
      46, 4, 80, 50, 67, 55, 82, 63, 23, 24, 63, 32, 35, 59, 79, 41, 48, 81, 53,
      34, 62, 70, 63, 46, 46, 17, 33, 59, 74, 76, 10, 18, 54, 15, 40, 69, 16, 3,
      68, 14, 50, 46, 69, 14, 9, 36, 20, 74, 70, 46, 12, 64, 42, 16, 30, 64, 84,
      71, 51, 76, 19, 33, 54, 26, 65, 12, 84, 78, 74, 23, 20, 77, 53, 73, 50,
      66, 39, 34, 61, 34, 45, 12, 26, 44, 61, 7, 62, 75, 29, 41, 86, 20, 51, 39,
      43, 60, 38, 19, 31, 28, 66, 49, 44, 28, 82, 5, 36, 21, 65, 18, 8, 11, 69,
      12, 11, 41, 47, 27, 41, 50, 0, 4, 29, 6, 29, 20, 63, 25, 69, 47, 2, 22,
      71, 5, 59, 29, 80, 45, 37, 85, 68, 79, 73, 62, 56, 1, 22, 35, 21, 15, 80,
      44, 20, 11, 66, 39,
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
