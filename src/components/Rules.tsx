export function Rules() {
  return (
    <div>
      <p className="text-left">
        1. Each day, a new anime will be randomly selected by the game.
      </p>
      <p className="text-left">
        2. You will have six chances to guess the name of the anime.
      </p>
      <p className="text-left">
        3. Each time you make a wrong guess, another frame of the anime will be
        revealed to you to help you guess.
      </p>
      <p className="text-left">
        4. To make a guess, type the name of the anime into the input field
        provided and click "Submit".
      </p>
      <p className="text-left">
        5. If you guess the correct anime within the six tries, you win the
        game.
      </p>
      <p className="text-left">
        6. If you do not guess the correct anime within six tries, you lose the
        game.
      </p>
      <p className="text-left">
        7. You can play the game again the next day to try to guess a new
        randomly selected anime.
      </p>
    </div>
  );
}
