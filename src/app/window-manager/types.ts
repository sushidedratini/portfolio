import type { ReactNode } from 'react';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

/**
 * Describes an application that the window manager can launch.
 * The window manager only knows this contract — never the app internals.
 */
export interface AppDefinition {
  id: string;
  title: string;
  icon: string;
  /** Renders the app inside the window's client area. */
  render: () => ReactNode;
  defaultSize?: Size;
  /** When true, launching the app again focuses the existing window instead of opening a new one. */
  singleInstance?: boolean;
}

/** Like command-line arguments when Windows launches a program to open a document. */
export interface LaunchOptions {
  /** URL of the document the app should open. */
  file?: string;
}

export interface WindowState {
  id: string;
  appId: string;
  file?: string;
  title: string;
  icon: string;
  position: Position;
  size: Size;
  isMinimized: boolean;
  isMaximized: boolean;
  /** Higher value = closer to the top of the stack. */
  zOrder: number;
}
