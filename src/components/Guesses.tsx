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
          <h1 className="text-2xl font-bold">You got it!</h1>
          <p>{guessNum}</p>
          <h1 className="text-2xl font-bold">{winnerName}</h1>
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
