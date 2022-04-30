import { useContext, useState, createContext, SetStateAction } from "react";
import { Level } from "../types/state";

interface Props {
  children: React.ReactNode;
}

const StateContext = createContext(
  {} as {
    level: Level;
    flagMode: boolean;
    setLevel: React.Dispatch<SetStateAction<Level>>;
    setFlagMode: React.Dispatch<SetStateAction<boolean>>;
  }
);

export const StateContextProvider: React.FC<Props> = ({ children }) => {
  const [level, setLevel] = useState<Level>("Easy");
  const [flagMode, setFlagMode] = useState<boolean>(false);
  return (
    <StateContext.Provider value={{ level, flagMode, setLevel, setFlagMode }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
