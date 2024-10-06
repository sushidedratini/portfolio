"use client";

import React from 'react';
import Image from 'next/image'
import { useActiveItem } from '../ActiveItemContext';

interface DesktopIconProps {
  name: string;
  icon: string;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ name, icon }) => {
  const { activeItem, setActiveItem } = useActiveItem();
  const isActive = activeItem === name;

  return (
    <div className="text-center hover:cursor-pointer" onClick={() => setActiveItem(name)}>
      <Image className={`mx-auto
        ${isActive ? 'filter invert hue-rotate-180' : ''}`} src={icon} alt={name} width="30" height="30"/>
      <p className={`font-win95 text-xs text-black inline-block px-0.5
        ${isActive ? 'border-dotted border-2 border-pink-300 bg-win95-blue' : ''}`}>{name}</p>
    </div>
  );
};

export default DesktopIcon;