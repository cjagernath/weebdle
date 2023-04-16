import React from "react";
import { useState, useEffect } from "react";
import { NewGuess } from "./NewGuess";

interface GuessesProps {
  guessNum: number;
  winnerName: string;
  onSubmitGuess: (guessedCorrect: boolean) => void;
  guesses: Array<number>;
  animeNamesList: Array<string>;
  maxGuesses: Array<number>;
  dailyCount: number;
  savedGuessCorrect: boolean;
}

export const Guesses: React.FC<GuessesProps> = ({
  guessNum,
  winnerName,
  onSubmitGuess,
  guesses,
  animeNamesList,
  maxGuesses,
  dailyCount,
  savedGuessCorrect,
}) => {
  const [guessResult, setGuessResult] = useState<boolean>();
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const nextDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );
      const timeUntilNextDay = (nextDay.getTime() - now.getTime()) / 1000;

      setHours(Math.floor(timeUntilNextDay / (60 * 60)));
      setMinutes(Math.floor((timeUntilNextDay / 60) % 60));
      setSeconds(Math.floor(timeUntilNextDay % 60));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

    const text = `Weebdle #${dailyCount}\n${result}\n\nhttp://weebdle.com/`;
    const element = document.createElement("textarea");
    element.value = text;
    element.setAttribute("readonly", "");
    element.style.position = "absolute";
    element.style.left = "-9999px";
    document.body.appendChild(element);
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
    alert("Copied to clipboard!");
  };

  return (
    <div>
      {guessResult || savedGuessCorrect ? (
        <div>
          <h1 className="text-2xl font-bold">You got it!</h1>
          <h1 className="text-4xl font-bold">{winnerName}</h1>
          <br />
          {maxGuesses.map((i) => {
            if (i < guessNum) {
              return (
                <div key={i} className="btn btn-error btn-xs btn-square"></div>
              );
            }
            if (i === guessNum) {
              return (
                <div
                  key={i}
                  className="btn btn-success btn-xs btn-square"
                ></div>
              );
            }
            if (i > guessNum) {
              return <div key={i} className="btn btn-xs btn-square"></div>;
            }
          })}
          <div />
          <br />

          <div>
            <button className="btn btn-accent btn-sm" onClick={handleShare}>
              Share
            </button>
            <br />
            <br />
            <h1>New Anime in</h1>
            <span className="countdown font-mono text-2xl">
              <span style={{ "--value": hours } as any}></span>:
              <span style={{ "--value": minutes } as any}></span>:
              <span style={{ "--value": seconds } as any}></span>
            </span>
          </div>
        </div>
      ) : (
        <div>
          {guessNum < 7 ? (
            <div>
              {guesses.map((i) => (
                <div key={i}>
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
              <h1 className="text-2xl font-bold">Sorry! The answer was:</h1>
              <h1 className="text-4xl font-bold">{winnerName}</h1>
              <br />
              {maxGuesses.map((i) => (
                <div key={i} className="btn btn-error btn-xs btn-square"></div>
              ))}
              <div />
              <br />
              <div>
                <button className="btn btn-accent btn-sm" onClick={handleShare}>
                  Share
                </button>
                <br />
                <br />
                <h1>New Anime in</h1>
                <span className="countdown font-mono text-2xl">
                  <span style={{ "--value": hours } as any}></span>:
                  <span style={{ "--value": minutes } as any}></span>:
                  <span style={{ "--value": seconds } as any}></span>
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
