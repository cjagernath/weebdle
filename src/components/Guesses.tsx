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
  dailyCount: number;
}

export const Guesses: React.FC<GuessesProps> = ({
  guessNum,
  winnerName,
  onSubmitGuess,
  guesses,
  animeNamesList,
  maxGuesses,
  dailyCount,
}) => {
  const [guessResult, setGuessResult] = useState<boolean>();

  const handleGuessSubmit = (guessedCorrect: boolean) => {
    onSubmitGuess(guessedCorrect);
    setGuessResult(guessedCorrect);
  };

  const handleShare = () => {
    let result = "";
    for (let i = 1; i < 7; i++) {
      if (i < guessNum) {
        result += "🟥 ";
      } else if (i === guessNum) {
        result += "🟩 ";
      } else {
        result += "⬛ ";
      }
    }

    navigator.clipboard.writeText(
      `Weebdle #${dailyCount}\n${result}\n\nhttp://weebdle.com/`
    );
    alert("Copied to clipboard!");
  };

  return (
    <div>
      {guessResult ? (
        <div>
          <h1 className="text-2xl font-bold">You got it!</h1>
          <h1 className="text-4xl font-bold">{winnerName}</h1>
          <br />
          {maxGuesses.map((i) =>
            i < guessNum ? (
              <button className="btn btn-error btn-xs btn-square"></button>
            ) : i === guessNum ? (
              <button className="btn btn-success btn-xs btn-square"></button>
            ) : (
              <button className="btn btn-xs btn-square"></button>
            )
          )}
          <div />
          <br />
          <button className="btn btn-accent btn-sm" onClick={handleShare}>
            Share
          </button>
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
                <p>You have {7 - guessNum} guesses left</p>
              ) : (
                <p>You have 1 guess left</p>
              )}
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold">The answer was:</h1>
              <h1 className="text-4xl font-bold">{winnerName}</h1>
              <br />
              {maxGuesses.map(() => (
                <button className="btn btn-error btn-xs btn-square"></button>
              ))}
              <div />
              <br />
              <button className="btn btn-accent btn-sm" onClick={handleShare}>
                Share
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
