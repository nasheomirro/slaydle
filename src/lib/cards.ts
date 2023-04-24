import items from "./items.json";
import { Card, CompareResult, Keyword } from "./card.types";
import seedrandom from "seedrandom";

export const cards = items.cards as Card[];
export const keywords = items.keywords as Keyword[];

/**
 * using the current date as the seed for a random generator, we should
 * always get the same index whenever we get a random card.
 */
export const getRandomCard = async (): Promise<{
  card: Card;
  currentDate: string;
}> => {
  const { date, dateTime }: { date: string; dateTime: string } = await fetch(
    "https://timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam"
  ).then((res) => res.json());
  const gen = seedrandom(date);

  let index = Math.floor(gen() * cards.length);
  return {
    card: cards[index],
    currentDate: dateTime,
  };
};

/**
 * returns the result when comparing two cards, assumes `card2` is the guess.
 */
export const compareCards = (card1: Card, card2: Card): CompareResult => {
  const compareKeywords = (
    card1: Card,
    card2: Card
  ): CompareResult["keywords"] => {
    let keywords: CompareResult["keywords"] = "miss";
    let temp = [...card2.keywords];
    for (let keyword of card1.keywords) {
      if (temp.includes(keyword)) {
        temp = temp.filter((word) => word !== keyword);
        keywords = "partial";
      }
    }
    if (temp.length === 0) keywords = "hit";
    return keywords;
  };

  return {
    card: card2,
    name: card1.name === card2.name,
    color: card1.color === card2.color,
    cost: card1.cost === card2.cost,
    type: card1.type === card2.type,
    rarity: card1.rarity === card2.rarity,
    keywords: compareKeywords(card1, card2),
  };
};
