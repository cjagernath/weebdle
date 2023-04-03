import { Header } from "./Header";
import { Picture } from "./Picture";
import { Guesses } from "./Guesses";
import { Footer } from "./Footer";
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
    const currentDate = new Date().toISOString().slice(0, 10);

    if (lastPlayedDate !== currentDate) {
      const animeNames: string[] = [];
      Animes.map((anime) => animeNames.push(anime.name));
      setAnimeNamesList(animeNames);
      const random = Math.floor(Math.random() * (animeNames.length - 1));
      setWinner(random);
      setWinnerName(animeNames[random]);
    }
  }, []);

  return (
    <center>
      <Header />
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
      />
      <Footer />
    </center>
  );
};
