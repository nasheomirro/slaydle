import { Card } from "@/lib/card.types";
import { compareCards } from "@/lib/cards";

import GameInput from "./GameInput";
import Results from "./Results";
import AnswerOverlay from "./AnswerOverlay";
import { useMetaContext, useMetaDispatch } from "@/lib/meta";

const Game: React.FC = () => {
  const { daily: answer, guessedCorrect, results } = useMetaContext();
  const dispatch = useMetaDispatch();

  // input enter
  const guess = (card: Card) => {
    const result = compareCards(answer, card);
    dispatch({ type: "ADD_RESULT", payload: result });
    // delay the hit which delays the overlay
    if (result.name)
      setTimeout(() => dispatch({ type: "SET_GUESSED", payload: true }), 700);
  };

  return (
    <div>
      {guessedCorrect && <AnswerOverlay answer={answer} />}
      <GameInput disabled={guessedCorrect} guess={guess} />
      <Results results={results} />
    </div>
  );
};

export default Game;
