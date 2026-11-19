"use client";

import Image from 'next/image'
import { useActiveItem } from './ActiveItemContext';
import { useWindowManager } from '../window-manager/WindowManagerContext';

interface DesktopIconProps {
  appId: string;
}

/** A desktop shortcut: double-click launches the application it points to. */
const DesktopIcon: React.FC<DesktopIconProps> = ({ appId }) => {
  const { activeItem, setActiveItem } = useActiveItem();
  const { apps, openApp } = useWindowManager();
  const app = apps[appId];
  if (!app) return null;

  const { title, icon } = app;
  const isActive = activeItem === title;

  return (
    <div className="text-center hover:cursor-pointer" onClick={() => setActiveItem(title)} onDoubleClick={() =>
      openApp(appId)
    }>
      <Image className={`mx-auto
        ${isActive ? 'filter invert hue-rotate-180' : ''}`} src={icon} alt={title} width="30" height="30"/>
      <p className={`font-win98 text-xs text-white inline-block px-0.5
        ${isActive ? 'border-dotted border-2 border-pink-300 bg-win98-dark-blue' : 'bg-win98-teal-blue'}`}>{title}</p>
    </div>
  );
};

export default DesktopIcon;
