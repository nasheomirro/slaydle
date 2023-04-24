import { Card } from "@/lib/card.types";
import Image from "next/image";

type Props = {
  color: Card["color"];
  cost: Card["cost"];
  result: boolean;
};

const EnergyDisplay: React.FC<Props> = ({ color, cost, result }) => {
  const numberCost = parseInt(cost);

  const iconUrl = `/icons/${color}Energy.png`;
  const text = !isNaN(numberCost) && numberCost ? "" : cost;
  const costArr = !isNaN(numberCost) && numberCost
    ? Array(numberCost).fill(0)
    : text !== "None"
    ? [0]
    : [];

  return (
    <div className="flex gap-0.5 items-center justify-center">
      {costArr.map((_, i) => (
        <div
          className={`w-5 relative aspect-square ${result ? "" : "opacity-25"}`}
          key={i}
        >
          <Image fill alt="energy" src={iconUrl} />
        </div>
      ))}
      {text}
    </div>
  );
};

export default EnergyDisplay;
