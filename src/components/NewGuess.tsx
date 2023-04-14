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

  function handleSubmit() {
    const guessedCorrect =
      input.toLocaleLowerCase() === winnerName.toLocaleLowerCase();
    onSubmit(guessedCorrect);
    setDisableGuess(true);
    if (guessedCorrect === false) {
      setInput(`🟥 ${input}`);
    }
  }

  return (
    <div>
      <input
        type="text"
        className="input input-bordered input-info w-full max-w-xs m-1.5"
        placeholder="Search for an anime and guess!"
        value={input}
        list="animeList"
        onChange={(e) => setInput(e.target.value)}
        disabled={disableGuess}
      />
      <datalist id="animeList">
        {animeNamesList.map((anime) => (
          <option value={anime} key={anime} />
        ))}
      </datalist>
      {!disableGuess && (
        <button
          className="btn btn-accent btn-sm ml-2"
          onClick={handleSubmit}
          disabled={input === ""}
        >
          Submit
        </button>
      )}
    </div>
  );
};
