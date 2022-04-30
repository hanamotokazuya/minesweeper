import { useContext, useState, createContext, SetStateAction } from "react";

type Level = "Easy" | "Normal" | "Hard";

interface Props {
  children: React.ReactNode;
}

const StateContext = createContext(
  {} as {
    level: Level;
    setLevel: React.Dispatch<SetStateAction<Level>>;
  }
);

export const StateContextProvider: React.FC<Props> = ({ children }) => {
  const [level, setLevel] = useState<Level>("Easy");
  return <StateContext.Provider value={{ level, setLevel }}>{children}</StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);
