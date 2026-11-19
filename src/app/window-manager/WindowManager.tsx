"use client";

import { useMemo } from 'react';
import Window from './Window';
import { useWindowManager } from './WindowManagerContext';

/** Stacking range for windows; the taskbar sits above it (z-50). */
const BASE_Z_INDEX = 10;

/** Renders every open window, putting each application inside its frame. */
const WindowManager = () => {
  const { apps, windows, focusedWindowId } = useWindowManager();

  const zIndexById = useMemo(() => {
    const stacked = [...windows].sort((a, b) => a.zOrder - b.zOrder);
    return new Map(stacked.map((win, index) => [win.id, BASE_Z_INDEX + index]));
  }, [windows]);

  return (
    <>
      {windows.map((win) => (
        <Window
          key={win.id}
          window={win}
          isFocused={focusedWindowId === win.id}
          zIndex={zIndexById.get(win.id) ?? BASE_Z_INDEX}
        >
          {apps[win.appId]?.render()}
        </Window>
      ))}
    </>
  );
};

export default WindowManager;
