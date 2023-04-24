import { useEffect } from "react";
import { Card, CompareResult } from "@/lib/card.types";
import EnergyDisplay from "./EnergyDisplay";
import { Flipped } from "react-flip-toolkit";

type Props = {
  result: CompareResult;
};

const Result: React.FC<Props> = ({ result }) => {
  const { card } = result;
  const emptyIfWin = (r: string) => {
    return !result.name ? r : "";
  };

  const colorToName = (color: Card["color"]) => {
    switch (color) {
      case "Red":
        return "Ironclad";
      case "Blue":
        return "Defect";
      case "Green":
        return "Silent";
      case "Purple":
        return "Watcher";
      default:
        return color;
    }
  };

  const colorToBackground = (type: Card["color"]) => {
    if (result.name) return "bg-yellow-400 border-yellow-600 text-black";
    switch (type) {
      case "Red":
        return "border-red-300 bg-red-800";
      case "Green":
        return "bg-green-700 border-green-400";
      case "Blue":
        return "bg-sky-700 border-sky-400";
      case "Purple":
        return "bg-purple-800 border-purple-400";
      default:
        return "bg-slate-700 border-slate-400";
    }
  };

  return (
    <Flipped flipId={result.card.name}>
      <div
        className={`flex text-center items-center first:animate-boom py-2 min-w-min gap-5 px-6 rounded-lg border-2 shadow-lg ${colorToBackground(
          card.color
        )}`}
      >
        <span
          className={`inline-block w-full text-start ${emptyIfWin(
            result.name ? "text-yellow-300 font-bold" : "text-gray-300"
          )}`}
        >
          {card.name}
        </span>
        <span
          className={`inline-block w-full ${emptyIfWin(
            result.color ? "text-yellow-300 font-bold" : "text-gray-300"
          )}`}
        >
          {colorToName(card.color)}
        </span>
        <span
          className={`inline-block w-full ${emptyIfWin(
            result.type ? "text-yellow-300 font-bold" : "text-gray-300"
          )}`}
        >
          {card.type}
        </span>
        <span
          className={`inline-block w-full ${emptyIfWin(
            result.rarity ? "text-yellow-300 font-bold" : "text-gray-300"
          )}`}
        >
          {card.rarity}
        </span>
        <span
          className={`inline-block w-full ${emptyIfWin(
            result.cost ? "text-yellow-300 font-bold" : "text-gray-300"
          )}`}
        >
          <EnergyDisplay
            color={card.color}
            result={result.cost}
            cost={card.cost}
          />
        </span>
        <span
          className={`inline-block w-full ${emptyIfWin(
            result.keywords === "hit"
              ? "text-yellow-300 font-bold"
              : result.keywords === "partial"
              ? "text-orange-300"
              : "text-gray-300"
          )}`}
        >
          {card.keywords.join(", ")}
        </span>
      </div>
    </Flipped>
  );
};

export default Result;
