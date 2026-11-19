"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import WindowTitleBar from './WindowTitleBar';
import { useWindowManager } from './WindowManagerContext';
import { WindowInstance, WindowInstanceContext } from './WindowInstanceContext';
import { Position, WindowState } from './types';

const TASKBAR_HEIGHT = 36;

interface WindowProps {
  window: WindowState;
  isFocused: boolean;
  zIndex: number;
  /** The application content, rendered in the client area. The window knows nothing about it. */
  children: React.ReactNode;
}

/**
 * The frame shared by every application: border, title bar, window controls,
 * focus, stacking and dragging. Menus, toolbars and status bars belong to the app.
 */
const Window: React.FC<WindowProps> = ({ window: win, isFocused, zIndex, children }) => {
  const { closeWindow, minimizeWindow, toggleMaximize, focusWindow, moveWindow, setWindowTitle } = useWindowManager();
  const { id } = win;
  const dragOffset = useRef<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      moveWindow(id, {
        x: Math.max(0, Math.min(window.innerWidth - 300, e.clientX - dragOffset.current.x)),
        y: Math.max(0, Math.min(window.innerHeight - 200, e.clientY - dragOffset.current.y)),
      });
    };
    const handleMouseUp = () => setIsDragging(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, id, moveWindow]);

  const handleDragStart = (e: React.MouseEvent) => {
    // Like in Windows 98, a maximized window can't be dragged.
    if (e.button !== 0 || win.isMaximized) return;
    e.preventDefault();
    dragOffset.current = { x: e.clientX - win.position.x, y: e.clientY - win.position.y };
    setIsDragging(true);
  };

  const instance = useMemo<WindowInstance>(() => ({
    id,
    title: win.title,
    isFocused,
    isMaximized: win.isMaximized,
    close: () => closeWindow(id),
    minimize: () => minimizeWindow(id),
    toggleMaximize: () => toggleMaximize(id),
    setTitle: (title: string) => setWindowTitle(id, title),
  }), [id, win.title, isFocused, win.isMaximized, closeWindow, minimizeWindow, toggleMaximize, setWindowTitle]);

  return (
    <div
      role="dialog"
      aria-label={win.title}
      // Minimized windows stay mounted so the app keeps its state.
      className={`absolute flex flex-col p-0.5
        bg-win98-gray
        border-t-2 border-t-white
        border-l-2 border-l-white
        border-b-2 border-b-black border-r-2
        border-r-black border-solid
        text-black text-sm font-win98
        ${win.isMinimized ? 'hidden' : ''}`}
      style={{
        width: win.isMaximized ? '100%' : win.size.width,
        height: win.isMaximized ? `calc(100% - ${TASKBAR_HEIGHT}px)` : win.size.height,
        left: win.isMaximized ? 0 : win.position.x,
        top: win.isMaximized ? 0 : win.position.y,
        zIndex,
      }}
      onMouseDownCapture={() => focusWindow(id)}
    >
      <WindowTitleBar
        title={win.title}
        icon={win.icon}
        isActive={isFocused}
        isMaximized={win.isMaximized}
        onDragStart={handleDragStart}
        onMinimize={instance.minimize}
        onMaximize={instance.toggleMaximize}
        onClose={instance.close}
      />

      {/* Client area: the app decides what goes here */}
      <div className="flex flex-col flex-1 min-h-0">
        <WindowInstanceContext.Provider value={instance}>
          {children}
        </WindowInstanceContext.Provider>
      </div>
    </div>
  );
};

export default Window;
