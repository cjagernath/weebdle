import { useState } from "react";

interface NewGuessProps {
  winnerName: string;
  onSubmit: (guessedCorrect: boolean) => void;
}

export const NewGuess: React.FC<NewGuessProps> = ({ winnerName, onSubmit }) => {
  const [input, setInput] = useState("");
  const [disableGuess, setDisableGuess] = useState(false);

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
        placeholder="Search for an anime and make a guess!"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disableGuess}
      ></input>
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
