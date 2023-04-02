import React from "react";
import { useState } from "react";
import { NewGuess } from "./NewGuess";

interface GuessesProps {
  guessNum: number;
  winnerName: string;
  onSubmitGuess: (guessedCorrect: boolean) => void;
  guesses: Array<number>;
  animeNamesList: Array<string>;
}

export const Guesses: React.FC<GuessesProps> = ({
  guessNum,
  winnerName,
  onSubmitGuess,
  guesses,
  animeNamesList,
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
          <p>You got it</p>
          <p>{guessNum}</p>
          <button className="btn btn-accent btn-sm">Share</button>
        </div>
      ) : (
        <div>
          {guesses.map((i) => (
            <div>
              <NewGuess
                winnerName={winnerName}
                onSubmit={handleGuessSubmit}
                animeNamesList={animeNamesList}
              />
            </div>
          ))}

          {guessNum !== 6 ? (
            <p>
              You have {7 - guessNum} guesses left {winnerName}
            </p>
          ) : (
            <p>You have 1 guess left</p>
          )}
        </div>
      )}
    </div>
  );
};
