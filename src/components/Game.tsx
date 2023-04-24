import { useState } from "react";
import { Card, CompareResult } from "@/lib/card.types";
import { compareCards } from "@/lib/cards";
import Result from "./Result";
import GameInput from "./GameInput";

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
      <div className="mb-2">answer: {JSON.stringify(answer)}</div>
      <GameInput disabled={hit} guess={guess} />
      <div className="flex flex-col gap-2">
        {results.map((result) => (
          <Result key={result.card.name} result={result} onHit={onHit} />
        ))}
      </div>
    </div>
  );
};

export default Game;
