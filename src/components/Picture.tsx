import { Animes } from "../Animes";
import { useState, useEffect } from "react";

interface PictureProps {
  guessNum: number;
  winner: number;
  guessedCorrect: boolean;
  guesses: Array<number>;
  maxGuesses: Array<number>;
}

export const Picture: React.FC<PictureProps> = ({
  guessNum,
  winner,
  guessedCorrect,
  guesses,
  maxGuesses,
}) => {
  const img1 = Animes[winner].img1;
  const img2 = Animes[winner].img2;
  const img3 = Animes[winner].img3;
  const img4 = Animes[winner].img4;
  const img5 = Animes[winner].img5;
  const img6 = Animes[winner].img6;
  const pics = [img1, img2, img3, img4, img5, img6];
  const [displayImage, setDisplayImage] = useState(pics[0]);

  function GoToLast() {
    setDisplayImage(pics[5]);
  }

  useEffect(() => {
    if (guessNum < 7) {
      setDisplayImage(pics[guessNum - 1]);
    }
  }, [guessNum]);

  const changeDisplay = (index: number) => {
    setDisplayImage(pics[index - 1]);
  };

  useEffect(() => {
    if (guessedCorrect || guessNum === 7) {
      GoToLast();
    }
  }, [guessedCorrect]);

  return (
    <div>
      <img className="rounded-lg" src={displayImage} width={400} />
      {guessedCorrect || (!guessedCorrect && guessNum === 7) ? (
        <div>
          {maxGuesses.map((i, index) => (
            <button
              key={index}
              className="btn btn-accent btn-sm m-0.5"
              onClick={() => changeDisplay(i)}
            >
              {i}
            </button>
          ))}
        </div>
      ) : (
        <div>
          {guesses.map((i, index) => (
            <button
              key={index}
              className="btn btn-accent btn-sm m-0.5"
              onClick={() => changeDisplay(i)}
            >
              {i}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
