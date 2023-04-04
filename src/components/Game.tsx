import { Header } from "./Header";
import { Picture } from "./Picture";
import { Guesses } from "./Guesses";
import { Animes } from "@/Animes";
import { useState, useEffect } from "react";

export const Game = () => {
  const [guessNum, setGuessNum] = useState(1);
  const [winner, setWinner] = useState(-1);
  const [winnerName, setWinnerName] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [guesses, setGuesses] = useState<number[]>([1]);
  const maxGuesses = [1, 2, 3, 4, 5, 6];
  const [animeNamesList, setAnimeNamesList] = useState<string[]>([]);
  const [dailyCount, setDailyCount] = useState(0);

  const handleGuess = (guessedCorrect: boolean) => {
    setIsCorrect(guessedCorrect);

    if (!guessedCorrect && guessNum < 6) {
      setGuessNum(guessNum + 1);
      setGuesses([...guesses, guessNum + 1]);
    } else if (!guessedCorrect && guessNum === 6) {
      setGuessNum(guessNum + 1);
    }
  };

  useEffect(() => {
    const lastPlayedDate = localStorage.getItem("lastPlayedDate");
    const today = new Date().toISOString().slice(0, 10);

    console.log(lastPlayedDate);
    console.log(today);
    const animeNames: string[] = [];
    Animes.map((anime) => animeNames.push(anime.name));
    setAnimeNamesList(animeNames);
    const random = Math.floor(Math.random() * animeNames.length);
    setWinner(random);
    setWinnerName(animeNames[random]);

    if (lastPlayedDate !== today) {
      localStorage.setItem("dailyCount", (dailyCount + 1).toString());
      localStorage.setItem("lastPlayedDate", today);
      setDailyCount(dailyCount + 1);
    } else {
      setDailyCount(Number(localStorage.getItem("dailyCount")));
    }
  }, []);

  return (
    <div className="flex flex-col h-screen justify-between">
      <center>
        <Header dailyCount={dailyCount} />
        <br />
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
      </center>
    </div>
  );
};
