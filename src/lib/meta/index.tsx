import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Card, CompareResult } from "../card.types";
import { getLocalData, setLocalData } from "./storage";

export type Meta = {
  daily: Card;
  timeDiff: number;
  guessedCorrect: boolean;
  results: CompareResult[];
};

type Actions =
  | { type: "SET_GUESSED"; payload: boolean }
  | { type: "ADD_RESULT"; payload: CompareResult }
  | { type: "SET_ALL"; payload: Meta };

const metaContext = createContext<Meta>({} as Meta);
const metaDispatchContext = createContext<Dispatch<Actions>>(
  {} as Dispatch<Actions>
);

const coreReducer = (state: Meta, action: Actions): Meta => {
  switch (action.type) {
    case "SET_ALL":
      setLocalData(action.payload);
      return action.payload;
    case "SET_GUESSED": {
      const modified = { ...state, guessedCorrect: action.payload };
      setLocalData(modified);
      return modified;
    }
    case "ADD_RESULT": {
      const modified: Meta = {
        ...state,
        results: [action.payload, ...state.results],
      };
      setLocalData(modified);
      return modified;
    }
  }
};

// acts as middleware kindof
const localStorageReducer = (state: Meta, action: Actions): Meta => {
  const meta = coreReducer(state, action);
  setLocalData(meta);
  return meta;
};

type Props = PropsWithChildren<{ daily: Card; measureDiff: Date }>;
export const MetaProvider: React.FC<Props> = ({
  daily,
  measureDiff,
  children,
}) => {
  console.log(measureDiff);
  const [store, dispatch] = useReducer(localStorageReducer, {
    daily,
    timeDiff: new Date().getTime() - measureDiff.getTime(),
    guessedCorrect: false,
    results: [],
  });

  useEffect(() => {
    const fromLocal = getLocalData();
    // if not stored in user's device or is a new card
    if (!fromLocal || fromLocal.daily.name !== daily.name)
      return setLocalData(store);
    // else restore old save
    dispatch({ type: "SET_ALL", payload: fromLocal });

    // eslint-disable-next-line
  }, []);

  return (
    <metaDispatchContext.Provider value={dispatch}>
      <metaContext.Provider value={store}>{children}</metaContext.Provider>
    </metaDispatchContext.Provider>
  );
};

export const useMetaDispatch = () => {
  return useContext(metaDispatchContext);
};

export const useMetaContext = () => {
  return useContext(metaContext);
};
