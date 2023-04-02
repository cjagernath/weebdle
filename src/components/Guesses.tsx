import React from "react";
import { useState } from "react";
import { NewGuess } from "./NewGuess";

interface GuessesProps {
  guessNum: number;
  winnerName: string;
  onSubmitGuess: (guessedCorrect: boolean) => void;
  guesses: Array<number>;
}

export const Guesses: React.FC<GuessesProps> = ({
  guessNum,
  winnerName,
  onSubmitGuess,
  guesses,
}) => {
  const [guessResult, setGuessResult] = useState<boolean>();

  const handleGuessSubmit = (guessedCorrect: boolean) => {
    onSubmitGuess(guessedCorrect);
    setGuessResult(guessedCorrect);
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

          {guessNum !== 6 ? (
            <p>You have {7 - guessNum} guesses left</p>
          ) : (
            <p>You have 1 guess left{winnerName}</p>
          )}
        </div>
      )}
    </div>
  );
};
