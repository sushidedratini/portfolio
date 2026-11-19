"use client";

import React from 'react';
import StartMenu from './StartMenu';
import StartButton from './StartButton';
import TaskbarWindowButton from './TaskbarWindowButton';
import SystemTray from './SystemTray';
import Grip from '../ui/Grip';
import { useActiveItem } from './ActiveItemContext';
import { useWindowManager } from '../window-manager/WindowManagerContext';

const Taskbar = () => {
  const { activeItem } = useActiveItem();
  const { windows, focusedWindowId, focusWindow, minimizeWindow, restoreWindow } = useWindowManager();
  const isActive = activeItem === "Start Menu";

  return (
    <div data-taskbar className="fixed z-50 bottom-0 left-0 w-full bg-win98-gray h-9 flex justify-between items-center gap-1 outline outline-1 outline-white border-t-1 border-solid border-win98-dark-gray text-sm font-win98">
      <div className="flex items-center space-x-2 ml-1">
        <StartButton name="Start Menu" icon="/portfolio/images/icons/win98_icons/windows-0.png" text="Iniciar" />
      </div>
      {isActive && <StartMenu />}

      <Grip className="h-7 mx-0.5" />

      <div className="flex flex-1 items-center gap-1 min-w-0 overflow-hidden">
        {windows.map((win) => {
          const isFocused = win.id === focusedWindowId && !win.isMinimized;
          return (
            <TaskbarWindowButton
              key={win.id}
              title={win.title}
              icon={win.icon}
              isActive={isFocused}
              onClick={() => {
                if (win.isMinimized) restoreWindow(win.id);
                else if (isFocused) minimizeWindow(win.id);
                else focusWindow(win.id);
              }}
            />
          );
        })}
      </div>

      <SystemTray />
    </div>
  );
};

export default Taskbar;
