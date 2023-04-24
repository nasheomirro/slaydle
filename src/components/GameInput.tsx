import { Card } from "@/lib/card.types";
import { cards } from "@/lib/cards";
import { useCombobox } from "downshift";
import { useState } from "react";

type Props = {
  disabled: boolean;
  guess: (card: Card) => void;
};

const filterCards = (input: string, blacklist: Card[]): Card[] => {
  return cards.filter((card) => {
    if (blacklist.find((blocked) => blocked.name === card.name)) return false;
    else
      return input && card.name.toLowerCase().startsWith(input.toLowerCase());
  });
};

const GameInput: React.FC<Props> = ({ disabled, guess }) => {
  const [guessed, setGuessed] = useState<Card[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const items = filterCards(inputValue, guessed);

  const {
    isOpen,
    getInputProps,
    getItemProps,
    getMenuProps,
    highlightedIndex,
  } = useCombobox({
    items,
    inputValue,
    defaultHighlightedIndex: 0,
    onStateChange: (changes) => {
      const { type, selectedItem, inputValue } = changes;
      switch (type) {
        // on enter or select, make a guess
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (!selectedItem) break;
          setInputValue("");
          guess(selectedItem);
          setGuessed((guessed) => [...guessed, selectedItem]);
          break;
        // map input change
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue || "");
          break;
      }
    },
  });
  return (
    <div className="relative">
      <input
        className="block mb-10 border-b w-full max-w-sm text-center text-xl bg-transparent border-white focus:outline-none mx-auto"
        {...getInputProps({ disabled })}
      />
      <ul
        className={`${
          isOpen && items.length ? "block" : "hidden"
        } absolute w-72 overflow-scroll overflow-x-hidden mt-1 max-h-52`}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              className={`${highlightedIndex === index && "text-yellow-400"}`}
              key={item.name}
              {...getItemProps({ item, index })}
            >
              <span>{item.name}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default GameInput;
