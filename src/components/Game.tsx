import { Header } from "./Header";
import { Picture } from "./Picture";
import { Guesses } from "./Guesses";
import { Animes } from "@/Animes";
import { useState, useEffect } from "react";

export const Game = () => {
  const [guessNum, setGuessNum] = useState(1);
  const [winner, setWinner] = useState(0);
  const [winnerName, setWinnerName] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [guesses, setGuesses] = useState<number[]>([1]);

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
    const animeNames: string[] = [];
    Animes.map((anime) => animeNames.push(anime.name));
    //rng to get winner
    const random = Math.floor(Math.random() * (animeNames.length - 1));
    setWinner(random);
    setWinnerName(animeNames[random]);
  }, []);

  return (
    <center>
      <Header />
      <br />
      <Picture
        guessNum={guessNum}
        winner={winner}
        guessedCorrect={isCorrect}
        guesses={guesses}
      />
      <br />
      <Guesses
        guessNum={guessNum}
        winnerName={winnerName}
        onSubmitGuess={handleGuess}
        guesses={guesses}
      />
    </center>
  );
};
