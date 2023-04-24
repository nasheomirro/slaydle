import { CompareResult } from "@/lib/card.types";
import Result from "./Result";
import { Flipper } from "react-flip-toolkit";

type Props = {
  results: CompareResult[];
};

const Results: React.FC<Props> = ({ results }) => {
  return (
    <div className="overflow-x-hidden p-2 max-w-lg  md:max-w-3xl xl:max-w-none mx-auto">
      <div className="overflow-x-auto">
        <div className="flex flex-col gap-2 min-w-min">
          <div className="w-full flex text-center gap-5 items-center py-2 px-6 border-b mb-5">
            <span className="w-full inline-block">Name</span>
            <span className="w-full inline-block">Color</span>
            <span className="w-full inline-block">Type</span>
            <span className="w-full inline-block">Rarity</span>
            <span className="w-full inline-block">Cost</span>
            <span className="w-full inline-block">Keywords</span>
          </div>
          <Flipper flipKey={results.join("")} className="flex flex-col gap-2">
            {results.map((result) => (
              <Result key={result.card.name} result={result} />
            ))}
          </Flipper>
        </div>
      </div>
    </div>
  );
};

export default Results;
