import { createContext, useContext } from 'react';

export const AskRgfContext = createContext({ openAskRgf: () => {}, isOpen: false });

export function useAskRgf() {
  return useContext(AskRgfContext);
}
