import React from "react";
import { useState } from "react";
import { NewGuess } from "./NewGuess";

interface GuessesProps {
  guessNum: number;
  winnerName: string;
  onSubmitGuess: (guessedCorrect: boolean) => void;
  guesses: Array<number>;
  animeNamesList: Array<string>;
  maxGuesses: Array<number>;
}

export const Guesses: React.FC<GuessesProps> = ({
  guessNum,
  winnerName,
  onSubmitGuess,
  guesses,
  animeNamesList,
  maxGuesses,
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
          {maxGuesses.map((i) =>
            i < guessNum ? (
              <button className="btn btn-error btn-xs"></button>
            ) : i === guessNum ? (
              <button className="btn btn-success btn-xs"></button>
            ) : (
              <button className="btn btn-xs"></button>
            )
          )}
          <h1 className="text-2xl font-bold">{winnerName}</h1>
          <button className="btn btn-accent btn-sm">Share</button>
        </div>
      ) : (
        <div>
          {guessNum < 7 ? (
            <div>
              {guesses.map(() => (
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
          ) : (
            <div>
              <h1 className="text-2xl font-bold">The answer was:</h1>
              <h1 className="text-2xl font-bold">{winnerName}</h1>
              {maxGuesses.map(() => (
                <button className="btn btn-error btn-xs"></button>
              ))}
              <br />
              <button className="btn btn-accent btn-sm">Share</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
