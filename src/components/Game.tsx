import { useState } from "react";
import { Card, CompareResult } from "@/lib/card.types";
import { compareCards } from "@/lib/cards";
import GameInput from "./GameInput";
import Results from "./Results";
import AnswerOverlay from "./AnswerOverlay";

type Props = {
  answer: Card;
};

const Game: React.FC<Props> = ({ answer }) => {
  const [results, setResults] = useState<CompareResult[]>([]);
  const [hit, setHit] = useState(false);

  // input enter
  const guess = (card: Card) => {
    const result = compareCards(answer, card);
    setResults((results) => [result, ...results]);
    if (result.name) setTimeout(() => setHit(true), 700);
  };

  return (
    <div>
      {/* <div className="mb-2">answer: {JSON.stringify(answer)}</div> */}
      {hit && <AnswerOverlay answer={answer} />}
      <GameInput disabled={hit} guess={guess} />
      <Results results={results} />
    </div>
  );
};

export default Game;
