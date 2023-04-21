import { CompareResult } from "@/lib/card.types";
import { useEffect } from "react";

type Props = {
  result: CompareResult;
  onHit: () => void;
};

const Result: React.FC<Props> = ({ onHit, result }) => {
  useEffect(() => {
    if (result.name) onHit();
  }, [onHit, result]);

  const toString = (res: boolean) => res ? "hit" : "miss"

  return (
    <div className="flex text-start">
      <span className="inline-block w-full">color: {toString(result.color)}</span>
      <span className="inline-block w-full">type: {toString(result.type)}</span>
      <span className="inline-block w-full">rarity: {toString(result.rarity)}</span>
      <span className="inline-block w-full">cost: {toString(result.cost)}</span>
      <span className="inline-block w-full">keywords: {result.keywords}</span>
    </div>
  );
};

export default Result;