"use client";

import { createContext, useContext } from 'react';

/**
 * What an application may ask of the window that hosts it
 * (e.g. "File > Close" in the app's own menu calls `close()`).
 */
export interface WindowInstance {
  id: string;
  title: string;
  /** Document the app was launched with, if any. */
  file?: string;
  isFocused: boolean;
  isMaximized: boolean;
  close: () => void;
  minimize: () => void;
  toggleMaximize: () => void;
  setTitle: (title: string) => void;
}

export const WindowInstanceContext = createContext<WindowInstance | null>(null);

export const useWindow = () => {
  const context = useContext(WindowInstanceContext);
  if (!context) {
    throw new Error('useWindow must be used by an application rendered inside a <Window>');
  }
  return context;
};
