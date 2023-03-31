import { Animes } from "../Animes";
import { useState } from "react";

interface PictureProps {
  guessNum: number;
  winner: number;
}

export const Picture: React.FC<PictureProps> = ({ guessNum, winner }) => {
  const img1 = Animes[winner].img1;
  const img2 = Animes[winner].img2;
  const img3 = Animes[winner].img3;
  const img4 = Animes[winner].img4;
  const img5 = Animes[winner].img5;
  const img6 = Animes[winner].img6;
  const [displayImage, setDisplayImage] = useState(img1);

  return (
    <div>
      <img src={displayImage} width={400} />
    </div>
  );
};
