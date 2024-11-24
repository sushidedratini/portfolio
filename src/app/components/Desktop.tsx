"use client";

import { useMemo } from "react";
import { useWindowContext } from "../context/WindowContext";

import DesktopIcon from "./DesktopIcon";
import Taskbar from "./Taskbar";
import Window from "./window/Window";

const Desktop = () => {
  const { windows, closeWindow } = useWindowContext();

  const activeWindows = useMemo(() => {
    return windows.filter((window) => !window.isMinimized).map((window) => (
      <Window
        key={window.id}
        id={window.id}
        icon={window.icon}
        title={window.title}
        onClose={() => closeWindow(window.id)}
      >
        {window.content}
      </Window>
    ));
  }, [windows, closeWindow]);

  return (
    <div className="relative w-full h-screen overflow-hidden
    bg-win98-light-gray
      bg-[url('/portfolio/images/wallpaper.jpeg')] 
      bg-cover bg-center "
    >
      <div className="p-4 grid grid-flow-row auto-rows-max gap-4 w-36 h-full">
        <DesktopIcon title="Meu Computador" icon="/portfolio/images/icons/win98_icons/computer_explorer-4.png" />
        <DesktopIcon title="Lixeira" icon="/portfolio/images/icons/win98_icons/recycle_bin_full-4.png" />
        {/* Outros ícones */}
      </div>

      {activeWindows}

      <Taskbar />
      {/* <h2>{activeItem}</h2> */}
    </div>
  )
}

export default Desktop;
