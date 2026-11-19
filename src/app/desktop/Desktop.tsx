"use client";

import React from "react";
import { useActiveItem } from "./ActiveItemContext";
import WindowManager from "../window-manager/WindowManager";

import DesktopIcon from "./DesktopIcon";
import Taskbar from "./Taskbar";

const SHORTCUTS = ['my-computer', 'recycle-bin'];

const Desktop = () => {
  const { setActiveItem } = useActiveItem();

  // Clicking anywhere outside the taskbar closes the Start menu and clears the icon selection.
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('[data-taskbar]')) setActiveItem(null);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden
    bg-win98-light-gray
      bg-[url('/portfolio/images/wallpaper.jpeg')]
      bg-cover bg-center "
      onMouseDown={handleMouseDown}
    >
      <div className="p-4 grid grid-flow-row auto-rows-max gap-4 w-36 h-full">
        {SHORTCUTS.map((appId) => <DesktopIcon key={appId} appId={appId} />)}
      </div>

      <WindowManager />

      <Taskbar />
    </div>
  )
}

export default Desktop;
