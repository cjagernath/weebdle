import React from "react";
import { useState } from "react";

interface GuessesProps {
  guessNum: number;
  winnerName: string;
}

export const Guesses: React.FC<GuessesProps> = ({ guessNum, winnerName }) => {
  const [input, setInput] = useState("");
  const [disableGuess, setDisableGuess] = useState(false);

  function handleSubmit() {
    guessNum + 1;
    if (input === winnerName) {
      //they win
      return;
    }
    setDisableGuess(true);
  }

  return (
    <div>
      <input
        type="text"
        className="input input-primary w-full max-w-xs"
        placeholder="Search for an anime and make a guess!"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disableGuess}
      ></input>
      {disableGuess ? (
        "X"
      ) : (
        <button
          className="btn btn-accent btn-sm"
          onClick={handleSubmit}
          disabled={input == ""}
        >
          Submit
        </button>
      )}
      {guessNum != 5 ? (
        <p>You have {6 - guessNum} guesses left</p>
      ) : (
        <p>You have 1 guess left</p>
      )}
    </div>
  );
};
