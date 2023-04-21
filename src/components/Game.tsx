import { useRef, useState } from "react";
import { Card, CompareResult } from "@/lib/card.types";
import { compareCards, getCardByName, getRandomCard } from "@/lib/cards";
import Result from "./Result";

type Props = {
  answer: Card
}

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
    <div className="max-w-screen-md mx-auto">
      <div className="mb-2">answer: {JSON.stringify(answer)}</div>
      <div className="mb-2">correct: {hit}</div>
      <input
        disabled={hit}
        className="block mb-2 border-black border"
        onKeyDown={(e) => {
          const card = getCardByName(e.currentTarget.value);
          if (e.key === "Enter" && card) guess(card);
        }}
      />
      <div className="flex flex-col gap-2">
        {results.map((result) => (
          <Result key={result.id} result={result} onHit={onHit} />
        ))}
      </div>
    </div>
  );
};

export default Game;
