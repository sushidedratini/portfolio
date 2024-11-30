"use client";

import Image from 'next/image'
import { useActiveItem } from '../context/ActiveItemContext';
import { useWindowContext } from '../context/WindowContext';

interface DesktopIconProps {
  title: string;
  icon: string;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ title, icon }) => {
  const { activeItem, setActiveItem } = useActiveItem();
  const { openWindow } = useWindowContext();
  const isActive = activeItem === title;

  return (
    <div className="text-center hover:cursor-pointer" onClick={() => setActiveItem(title)} onDoubleClick={() =>
      openWindow(title, icon, <></>)
    }>
      <Image className={`mx-auto
        ${isActive ? 'filter invert hue-rotate-180' : ''}`} src={icon} alt={title} width="30" height="30"/>
      <p className={`font-win98 text-xs text-white inline-block px-0.5
        ${isActive ? 'border-dotted border-2 border-pink-300 bg-win98-dark-blue' : 'bg-win98-teal-blue'}`}>{title}</p>
    </div>
  );
};

export default DesktopIcon;