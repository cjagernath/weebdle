import { Header } from "./Header";
import { Picture } from "./Picture";
import { Guesses } from "./Guesses";
import { Animes } from "@/Animes";
import { useState, useEffect } from "react";

export const Game = () => {
  const [guessNum, setGuessNum] = useState(0);
  const [winner, setWinner] = useState(0);
  const [winnerName, setWinnerName] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean>();

  const handleGuess = (guessedCorrect: boolean) => {
    setIsCorrect(guessedCorrect);
    setGuessNum(guessNum + 1);
  };

  useEffect(() => {
    const animeNames: string[] = [];
    Animes.map((anime) => animeNames.push(anime.name));
    //rng to get winner
    setWinner(2);
    setWinnerName(animeNames[winner]);
  }, []);

  return (
    <center>
      <Header />
      <br />
      <Picture guessNum={guessNum} winner={winner} />
      <br />
      <Guesses
        guessNum={guessNum}
        winnerName={winnerName}
        onSubmitGuess={handleGuess}
      />
    </center>
  );
};
