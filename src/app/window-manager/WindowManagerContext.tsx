"use client";

import React, { createContext, FC, ReactNode, useCallback, useContext, useMemo, useReducer, useRef } from 'react';
import { AppDefinition, LaunchOptions, Position, WindowState } from './types';

const DEFAULT_SIZE = { width: 500, height: 400 };
const CASCADE_START = 16;
const CASCADE_STEP = 24;
const CASCADE_STEPS = 8;

interface ManagerState {
  windows: WindowState[];
  focusedWindowId: string | null;
  nextZOrder: number;
}

type Action =
  | { type: 'open'; app: AppDefinition; id: string; position: Position; file?: string }
  | { type: 'close'; id: string }
  | { type: 'minimize'; id: string }
  | { type: 'restore'; id: string }
  | { type: 'focus'; id: string }
  | { type: 'toggleMaximize'; id: string }
  | { type: 'move'; id: string; position: Position }
  | { type: 'setTitle'; id: string; title: string };

export const fileName = (file: string) => decodeURIComponent(file.split('/').pop() ?? file);

const update = (windows: WindowState[], id: string, patch: Partial<WindowState>) =>
  windows.map((win) => (win.id === id ? { ...win, ...patch } : win));

/** Topmost window that is still visible, used to hand focus over when the focused one goes away. */
const topVisibleId = (windows: WindowState[]): string | null =>
  windows
    .filter((win) => !win.isMinimized)
    .reduce<WindowState | null>((top, win) => (!top || win.zOrder > top.zOrder ? win : top), null)?.id ?? null;

const bringToFront = (state: ManagerState, id: string, patch: Partial<WindowState> = {}): ManagerState => ({
  windows: update(state.windows, id, { ...patch, zOrder: state.nextZOrder }),
  focusedWindowId: id,
  nextZOrder: state.nextZOrder + 1,
});

function reducer(state: ManagerState, action: Action): ManagerState {
  switch (action.type) {
    case 'open': {
      const { app, file } = action;
      // Single-instance apps, or the same document opened twice, reuse the existing window.
      const existing = state.windows.find((win) =>
        win.appId === app.id && (app.singleInstance || (file !== undefined && win.file === file)));
      if (existing) {
        return bringToFront(state, existing.id, { isMinimized: false });
      }
      const win: WindowState = {
        id: action.id,
        appId: app.id,
        file,
        // Document windows follow the classic "App - [document]" title.
        title: file ? `${app.title} - [${fileName(file)}]` : app.title,
        icon: app.icon,
        position: action.position,
        size: app.defaultSize ?? DEFAULT_SIZE,
        isMinimized: false,
        isMaximized: false,
        zOrder: state.nextZOrder,
      };
      return { windows: [...state.windows, win], focusedWindowId: win.id, nextZOrder: state.nextZOrder + 1 };
    }
    case 'close': {
      const windows = state.windows.filter((win) => win.id !== action.id);
      const focusedWindowId = state.focusedWindowId === action.id ? topVisibleId(windows) : state.focusedWindowId;
      return { ...state, windows, focusedWindowId };
    }
    case 'minimize': {
      const windows = update(state.windows, action.id, { isMinimized: true });
      const focusedWindowId = state.focusedWindowId === action.id ? topVisibleId(windows) : state.focusedWindowId;
      return { ...state, windows, focusedWindowId };
    }
    case 'restore':
      return bringToFront(state, action.id, { isMinimized: false });
    case 'focus':
      if (state.focusedWindowId === action.id) return state;
      return bringToFront(state, action.id);
    case 'toggleMaximize': {
      const win = state.windows.find((w) => w.id === action.id);
      if (!win) return state;
      return bringToFront(state, action.id, { isMaximized: !win.isMaximized });
    }
    case 'move':
      return { ...state, windows: update(state.windows, action.id, { position: action.position }) };
    case 'setTitle':
      return { ...state, windows: update(state.windows, action.id, { title: action.title }) };
  }
}

interface WindowManagerContextType {
  apps: Record<string, AppDefinition>;
  /** Kept in opening order (taskbar order). Stacking is given by `zOrder`. */
  windows: WindowState[];
  focusedWindowId: string | null;
  openApp: (appId: string, options?: LaunchOptions) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, position: Position) => void;
  setWindowTitle: (id: string, title: string) => void;
}

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

export const useWindowManager = () => {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used inside <WindowManagerProvider>');
  }
  return context;
};

interface Props {
  apps: AppDefinition[];
  children?: ReactNode;
}

export const WindowManagerProvider: FC<Props> = ({ apps, children }) => {
  const [state, dispatch] = useReducer(reducer, { windows: [], focusedWindowId: null, nextZOrder: 1 });
  const openedCount = useRef(0);

  const appsById = useMemo(() => Object.fromEntries(apps.map((app) => [app.id, app])), [apps]);

  const openApp = useCallback((appId: string, options: LaunchOptions = {}) => {
    const app = appsById[appId];
    if (!app) {
      console.warn(`Unknown application: ${appId}`);
      return;
    }
    const count = openedCount.current++;
    const offset = CASCADE_START + (count % CASCADE_STEPS) * CASCADE_STEP;
    dispatch({ type: 'open', app, id: `${appId}-${count}`, position: { x: offset, y: offset }, file: options.file });
  }, [appsById]);

  const closeWindow = useCallback((id: string) => dispatch({ type: 'close', id }), []);
  const minimizeWindow = useCallback((id: string) => dispatch({ type: 'minimize', id }), []);
  const restoreWindow = useCallback((id: string) => dispatch({ type: 'restore', id }), []);
  const toggleMaximize = useCallback((id: string) => dispatch({ type: 'toggleMaximize', id }), []);
  const focusWindow = useCallback((id: string) => dispatch({ type: 'focus', id }), []);
  const moveWindow = useCallback((id: string, position: Position) => dispatch({ type: 'move', id, position }), []);
  const setWindowTitle = useCallback((id: string, title: string) => dispatch({ type: 'setTitle', id, title }), []);

  const value = useMemo(() => ({
    apps: appsById,
    windows: state.windows,
    focusedWindowId: state.focusedWindowId,
    openApp, closeWindow, minimizeWindow, restoreWindow, toggleMaximize, focusWindow, moveWindow, setWindowTitle,
  }), [appsById, state, openApp, closeWindow, minimizeWindow, restoreWindow, toggleMaximize, focusWindow, moveWindow, setWindowTitle]);

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
};
