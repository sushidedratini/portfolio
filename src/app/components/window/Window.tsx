"use client";

import React, { ReactNode, useState } from 'react';
import WindowControls from './WindowControls';
import WindowMenu from './WindowMenu';
import { useWindowContext } from '@/app/context/WindowContext';
import Image from 'next/image';

interface WindowProps {
  id: string;
  title: string;
  icon: string;
  initialWidth?: number;
  initialHeight?: number;
  children: ReactNode; // Conteúdo interno da janela
  onClose: () => void; // Função chamada ao fechar a janela
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  icon,
  children,
  onClose,
}) => {
  const { focusedWindowId, focusWindow } = useWindowContext();

  const [position, setPosition] = useState({ x: 16, y: 16 }); // Posição inicial
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMinimize = () => setIsMinimized(!isMinimized);
  const handleMaximize = () => setIsMaximized(!isMaximized);

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    focusWindow(id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 300, e.clientX - dragStart.x)), // Limita no eixo X
        y: Math.max(0, Math.min(window.innerHeight - 200, e.clientY - dragStart.y)), // Limita no eixo Y
      });
    }
  };

  return (
    <div
      className={`absolute top-4 left-4 z-1 
        bg-win98-gray border-t-2 
        border-t-white border-b-2 border-b-black border-r-2 
        border-r-black border-solid text-black text-sm font-win98`}
      style={{
        width: isMaximized ? '100%' : '500px',
        height: isMaximized ? '100%' : '400px',
        left: position.x,
        top: position.y,
        zIndex: focusedWindowId === id ? 2 : 1
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="flex flex-col p-0.5">
        <div className="flex items-center justify-between bg-win98-dark-blue text-white p-0.5 select-none"
          onMouseDown={handleMouseDown}>
          <div className="flex flex-row gap-1">
            <Image src={icon} alt={title} width={14} height={14} />
            <p className="font-bold text-xs">{title}</p>
          </div>
          <WindowControls
            onMinimize={handleMinimize}
            onMaximize={handleMaximize}
            onClose={onClose}
          />
        </div>

        {/* Menu interno */}
        {!isMinimized && <WindowMenu />}

        {/* Conteúdo da Janela */}
        {!isMinimized && (
          <div className="p-4 bg-win98-light-gray">{children}</div>
        )}
      </div>
    </div>
  );
};

export default Window;