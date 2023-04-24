import { useState } from "react";
import { Card, CompareResult } from "@/lib/card.types";
import { compareCards } from "@/lib/cards";
import GameInput from "./GameInput";
import Results from "./Results";

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
  };

  // input correct
  const onHit = () => setHit(true);

  return (
    <div>
      {/* <div className="mb-2">answer: {JSON.stringify(answer)}</div> */}
      <GameInput disabled={hit} guess={guess} />
      <Results results={results} onHit={onHit} />
    </div>
  );
};

export default Game;
