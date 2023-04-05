import { useState } from "react";
import React from "react";

interface NewGuessProps {
  winnerName: string;
  onSubmit: (guessedCorrect: boolean) => void;
  animeNamesList: Array<string>;
}

export const NewGuess: React.FC<NewGuessProps> = ({
  winnerName,
  onSubmit,
  animeNamesList,
}) => {
  const [input, setInput] = useState("");
  const [disableGuess, setDisableGuess] = useState(false);
  const options = [];
  animeNamesList.map((anime) => options.push(anime));

  function handleSubmit() {
    const guessedCorrect =
      input.toLocaleLowerCase() === winnerName.toLocaleLowerCase();
    onSubmit(guessedCorrect);
    setDisableGuess(true);
  }

  return (
    <div>
      <input
        type="text"
        className="input input-bordered input-info w-full max-w-xs"
        placeholder="Search for an anime and guess!"
        value={input}
        list="animeList"
        onChange={(e) => setInput(e.target.value)}
        disabled={disableGuess}
      ></input>
      <datalist id="animeList">
        {animeNamesList.map((anime) => (
          <option value={anime} key={anime} />
        ))}
      </datalist>
      {disableGuess ? (
        <button className="btn btn-square btn-disabled btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      ) : (
        <button
          className="btn btn-accent btn-sm"
          onClick={handleSubmit}
          disabled={input === ""}
        >
          Submit
        </button>
      )}
    </div>
  );
};
