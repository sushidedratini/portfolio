"use client";

import React, { useState } from 'react';
import StartMenu from './StartMenu';
import CustomButton from './CustomButton';

const Taskbar = () => {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed bottom-0 left-0 w-full bg-win95-gray h-10 flex justify-between items-center outline outline-1 outline-white border-t-1 border-solid border-win95-dark-gray text-sm font-win95">
      <div className="flex items-center space-x-2 ml-2">
        <CustomButton name='Start Menu' icon='/images/icons/ico/windows.ico' text='Iniciar' isActive={showStartMenu} setActive={setShowStartMenu} />
      </div>
      {showStartMenu && <StartMenu />}
      <div className="mr-4 font-win95">{currentTime}</div>


    </div>
  );
};

export default Taskbar;