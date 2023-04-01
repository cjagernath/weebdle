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
  const handleGuessSubmit = (guessedCorrect: boolean) => {
    //if guess is wrong render another guess element
    onSubmitGuess(guessedCorrect);
  };

  return (
    <div>
      <NewGuess winnerName={winnerName} onSubmit={handleGuessSubmit} />
      {guessNum != 5 ? (
        <p>You have {6 - guessNum} guesses left</p>
      ) : (
        <p>You have 1 guess left</p>
      )}
    </div>
  );
};
