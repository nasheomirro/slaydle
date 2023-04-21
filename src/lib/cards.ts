import { nanoid } from "nanoid";
import items from "./items.json";
import { Card, CompareResult, Keyword } from "./card.types";
import seedrandom from "seedrandom";

export const cards = items.cards as Card[];
export const keywords = items.keywords as Keyword[];

export const getCardByName = (name: string) => {
  const card = cards.find(
    (card) => card.name.toLowerCase() === name.toLowerCase()
  );
  if (card) return card;
};

export const getRandomCard = async () => {
  // using the current date as the seed for a random generator, we should
  // always get the same index whenever we get a random card.
  const { date }: { date: string } = await fetch(
    "https://timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam"
  ).then((res) => res.json());
  const gen = seedrandom(date);
  let index = Math.floor(gen() * cards.length);
  return cards[index];
};

/**
 * returns the result when comparing two cards,
 */
export const compareCards = (card1: Card, card2: Card): CompareResult => {
  const compareKeywords = (
    card1: Card,
    card2: Card
  ): CompareResult["keywords"] => {
    let keywords: CompareResult["keywords"] = "miss";
    let temp = [...card1.keywords];
    for (let keyword of card2.keywords) {
      if (temp.includes(keyword)) {
        temp = temp.filter((word) => word !== keyword);
        keywords = "partial";
      }
    }
    if (temp.length === 0) keywords = "hit";
    return keywords;
  };

  return {
    id: nanoid(),
    name: card1.name === card2.name,
    color: card1.color === card2.color,
    cost: card1.cost === card2.cost,
    type: card1.type === card2.type,
    rarity: card1.rarity === card2.rarity,
    keywords: compareKeywords(card1, card2),
  };
};
