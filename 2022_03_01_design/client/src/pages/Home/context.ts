import { createContext } from "react";

type HomeContextValue = {
  count: number;
  addCount: () => void;
}

export const HomeContext = createContext<HomeContextValue>({
  count:0,
  addCount: () => null
});
