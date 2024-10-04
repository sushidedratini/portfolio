"use client";

import React, { useState } from 'react';

interface DesktopIconProps {
  name: string;
  icon: string;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ name, icon }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className={`text-center hover:cursor-pointer
      ${isClicked ? '' : ''}`} onClick={() => setIsClicked(!isClicked)}>
      <img src={icon} alt={name} className="mx-auto h-8" />
      <p className="font-win95 text-xs bg-win95-blue text-white inline-block px-0.5">{name}</p>
    </div>
  );
};

export default DesktopIcon;