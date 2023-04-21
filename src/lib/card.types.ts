export type Card = {
  name: string;
  color: "Red" | "Green" | "Blue" | "Purple" | "Curse" | "Colorless";
  type: "Attack" | "Skill" | "Power" | "Status" | "Curse";
  rarity: "Basic" | "Common" | "Uncommon" | "Rare" | "Curse";
  cost: "0" | "1" | "2" | "3" | "4" | "5" | "X" | "None";
  description: string;
  keywords: string[];
  url: string;
};

export type Keyword = {
  name: string;
  description: string;
  names: string[];
};

export type CompareResult = {
  id: string;
  name: boolean;
  color: boolean;
  type: boolean;
  rarity: boolean;
  cost: boolean;
  keywords: "hit" | "partial" | "miss";
};
