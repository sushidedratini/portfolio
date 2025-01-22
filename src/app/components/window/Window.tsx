"use client";

import React, { useEffect, useState } from 'react';
import WindowControls from './WindowControls';
import WindowMenu from './WindowMenu';
import { useWindowContext, WindowState } from '@/app/context/WindowContext';
import Image from 'next/image';

interface WindowProps {
  id: string;
  title: string;
  icon: string;
  initialWidth?: number;
  initialHeight?: number;
  children: React.ReactElement<{ id: string }>;
  onClose: () => void;
  onMaximize: () => void;
}

const initialState = {
  position: { x: 16, y: 16 },
  isDragging: false,
  dragStart: { x: 0, y: 0 }
};

const Window: React.FC<WindowProps> = ({
  id,
  title,
  icon,
  children,
  onClose,
  onMaximize
}) => {
  const { windows, focusedWindowId, focusWindow } = useWindowContext();
  const [state, setState] = useState(initialState);
  const [currentWindow, setCurrentWindow] = useState<WindowState | undefined>(
    windows.find((win) => win.id === id)
  );

  useEffect(() => {
    const updatedWindow = windows.find((win) => win.id === id);
    setCurrentWindow(updatedWindow);
  }, [windows, id]);

  if (!currentWindow) {
    return <div>Janela não encontrada</div>;
  }

  const handleMinimize = () => { };
  const handleMaximize = () => onMaximize();

  const handleMouseDown = (e: React.MouseEvent) => {
    setState({
      ...state,
      isDragging: true,
      dragStart: { x: e.clientX - state.position.x, y: e.clientY - state.position.y }
    })
    focusWindow(id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (state.isDragging) {
      currentWindow.isMaximized = false;
      setState({...state, position: {
        x: Math.max(0, Math.min(window.innerWidth - 300, e.clientX - state.dragStart.x)),
        y: Math.max(0, Math.min(window.innerHeight - 200, e.clientY - state.dragStart.y)),
      }});
    }
  };

  const handleMouseUp = () => {
    setState({...state, isDragging: false});
  };

  return (<>
    {!currentWindow.isMinimized && (
      <div
        className={`absolute top-4 left-4 z-1 
        bg-win98-gray 
        border-t-2 border-t-white
        border-l-2 border-l-white 
        border-b-2 border-b-black border-r-2 
        border-r-black border-solid 
        text-black text-sm font-win98`}
        style={{
          width: currentWindow.isMaximized ? '100%' : '500px',
          height: currentWindow.isMaximized ? 'calc(100% - 36px)' : '400px',
          left: currentWindow.isMaximized ? '0' : state.position.x,
          top: currentWindow.isMaximized ? '0' : state.position.y,
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
          <WindowMenu />

          {/* Conteúdo da Janela */}
          <div className="h-full p-4 bg-win98-light-gray">
            {React.isValidElement(children)
              ? React.cloneElement(children, { id })
              : children}
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default Window;