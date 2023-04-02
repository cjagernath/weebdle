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
        className="input w-full max-w-xs"
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
        <button className="btn btn-accent btn-sm" disabled={true}>
          X
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
