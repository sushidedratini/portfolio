"use client";

import Image from 'next/image'
import { useActiveItem } from './ActiveItemContext';
import { useWindowManager } from '../window-manager/WindowManagerContext';
import { Shortcut } from './shortcuts';

interface DesktopIconProps {
  shortcut: Shortcut;
}

/** A desktop shortcut: double-click launches the application (with its document, if any). */
const DesktopIcon: React.FC<DesktopIconProps> = ({ shortcut }) => {
  const { activeItem, setActiveItem } = useActiveItem();
  const { apps, openApp } = useWindowManager();
  const app = apps[shortcut.appId];
  if (!app) return null;

  const title = shortcut.title ?? app.title;
  const icon = shortcut.icon ?? app.icon;
  const isActive = activeItem === title;

  return (
    <div className="text-center hover:cursor-pointer" onClick={() => setActiveItem(title)} onDoubleClick={() =>
      openApp(shortcut.appId, { file: shortcut.file })
    }>
      <Image className={`mx-auto
        ${isActive ? 'filter invert hue-rotate-180' : ''}`} src={icon} alt={title} width="30" height="30"/>
      <p className={`font-win98 text-xs text-white inline-block px-0.5
        ${isActive ? 'border-dotted border-2 border-pink-300 bg-win98-dark-blue' : 'bg-win98-teal-blue'}`}>{title}</p>
    </div>
  );
};

export default DesktopIcon;
