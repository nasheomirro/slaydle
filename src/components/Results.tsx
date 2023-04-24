import { CompareResult } from "@/lib/card.types";
import Result from "./Result";

type Props = {
  results: CompareResult[];
  onHit: () => void;
};

const Results: React.FC<Props> = ({ results, onHit }) => {
  return (
    <div className="overflow-x-hidden p-2">
      <div className="overflow-x-auto">
        <div className="flex flex-col gap-2 min-w-min">
          <div className="flex text-center gap-3 items-center py-2 px-6 border-b mb-5">
            <span className="w-full inline-block">Name</span>
            <span className="w-full inline-block">Color</span>
            <span className="w-full inline-block">Type</span>
            <span className="w-full inline-block">Rarity</span>
            <span className="w-full inline-block">Cost</span>
            <span className="w-full inline-block">Keywords</span>
          </div>
          {results.map((result) => (
            <Result key={result.card.name} result={result} onHit={onHit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
