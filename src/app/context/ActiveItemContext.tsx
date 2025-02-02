"use client";

import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface Props {
    children?: ReactNode
}

interface ContextFocusItem {
    activeItem: string | null,
    setActiveItem: (n: string | null) => void
}

const ActiveItemContext = createContext<ContextFocusItem>({
    activeItem: "",
    setActiveItem: () => {},
});

export const useActiveItem = () => useContext(ActiveItemContext);

export const ActiveItemProvider: FC<Props> = ({ children }) => {
    const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <ActiveItemContext.Provider value={{ activeItem, setActiveItem }}>
      {children}
    </ActiveItemContext.Provider>
  );
};