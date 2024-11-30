"use client";

import React, { ReactNode, useReducer } from 'react';
import WindowControls from './WindowControls';
import WindowMenu from './WindowMenu';
import { useWindowContext } from '@/app/context/WindowContext';
import Image from 'next/image';

const initialState = {
  position: { x: 16, y: 16 },
  isDragging: false,
  dragStart: { x: 0, y: 0 },
  isMinimized: false,
  isMaximized: false,
};

type Action =
  | { type: 'SET_POSITION'; payload: { x: number; y: number } }
  | { type: 'TOGGLE_DRAGGING'; payload: boolean }
  | { type: 'SET_DRAG_START'; payload: { x: number; y: number } }
  | { type: 'TOGGLE_MINIMIZE' }
  | { type: 'TOGGLE_MAXIMIZE' };

const reducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case 'SET_POSITION':
      return { ...state, position: action.payload };
    case 'TOGGLE_DRAGGING':
      return { ...state, isDragging: action.payload };
    case 'SET_DRAG_START':
      return { ...state, dragStart: action.payload };
    case 'TOGGLE_MINIMIZE':
      return { ...state, isMinimized: !state.isMinimized };
    case 'TOGGLE_MAXIMIZE':
      return { ...state, isMaximized: !state.isMaximized };
    default:
      return state;
  }
};

interface WindowProps {
  id: string;
  title: string;
  icon: string;
  initialWidth?: number;
  initialHeight?: number;
  children: ReactNode;
  onClose: () => void;
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  icon,
  children,
  onClose,
}) => {
  const { focusedWindowId, focusWindow } = useWindowContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleMinimize = () => dispatch({ type: 'TOGGLE_MINIMIZE'});
  const handleMaximize = () => dispatch({ type: 'TOGGLE_MAXIMIZE'});

  const handleMouseDown = (e: React.MouseEvent) => {
    dispatch({ type: 'TOGGLE_DRAGGING', payload: true });
    dispatch({
      type: 'SET_DRAG_START',
      payload: { x: e.clientX - state.position.x, y: e.clientY - state.position.y },
    });
    focusWindow(id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (state.isDragging) {
      state.isMaximized = false;
      dispatch({
        type: 'SET_POSITION',
        payload: {
          x: Math.max(0, Math.min(window.innerWidth - 300, e.clientX - state.dragStart.x)),
          y: Math.max(0, Math.min(window.innerHeight - 200, e.clientY - state.dragStart.y)),
        },
      });
    }
  };

  const handleMouseUp = () => {
    dispatch({ type: 'TOGGLE_DRAGGING', payload: false });
  };

  return (<>
    {!state.isMinimized && (
      <div
        className={`absolute top-4 left-4 z-1 
        bg-win98-gray border-t-2 
        border-t-white border-b-2 border-b-black border-r-2 
        border-r-black border-solid text-black text-sm font-win98`}
        style={{
          width: state.isMaximized ? '100%' : '500px',
          height: state.isMaximized ? 'calc(100% - 36px)' : '400px',
          left: state.isMaximized ? '0' : state.position.x,
          top: state.isMaximized ? '0' : state.position.y,
          zIndex: focusedWindowId === id ? 2 : 1
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="flex flex-col h- p-0.5">
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
          <div className="h-full p-4 bg-win98-light-gray">{children}</div>

        </div>
      </div>
    )}
  </>
  );
};

export default Window;