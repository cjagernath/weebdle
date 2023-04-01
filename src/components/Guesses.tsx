import React from "react";
import { useState } from "react";
import { NewGuess } from "./NewGuess";

interface GuessesProps {
  guessNum: number;
  winnerName: string;
  onSubmitGuess: (guessedCorrect: boolean) => void;
}

export const Guesses: React.FC<GuessesProps> = ({
  guessNum,
  winnerName,
  onSubmitGuess,
}) => {
  const [guessResult, setGuessResult] = useState<boolean>();
  const [guesses, setGuesses] = useState<string[]>([""]);

  const handleGuessSubmit = (guessedCorrect: boolean) => {
    //if guess is wrong render another guess element
    onSubmitGuess(guessedCorrect);
    setGuessResult(guessedCorrect);

    if (!guessedCorrect && guesses.length < 6) {
      setGuesses([...guesses, "guess"]);
    }
  };

  return (
    <div>
      {guessResult ? (
        <div>
          You got it<button>Share {guessNum}</button>
        </div>
      ) : (
        <div>
          {guesses.map((i) => (
            <div>
              <NewGuess winnerName={winnerName} onSubmit={handleGuessSubmit} />
            </div>
          ))}

          {guessNum != 5 ? (
            <p>You have {6 - guessNum} guesses left</p>
          ) : (
            <p>You have 1 guess left{winnerName}</p>
          )}
        </div>
      )}
    </div>
  );
};
