import React from 'react';
import Image from 'next/image';
import WindowControls from './WindowControls';

interface WindowTitleBarProps {
  title: string;
  icon: string;
  isActive: boolean;
  isMaximized: boolean;
  onDragStart: (e: React.MouseEvent) => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
}

const WindowTitleBar: React.FC<WindowTitleBarProps> = ({
  title,
  icon,
  isActive,
  isMaximized,
  onDragStart,
  onMinimize,
  onMaximize,
  onClose,
}) => (
  <div
    className={`flex items-center justify-between p-0.5 select-none
      ${isActive ? 'bg-win98-dark-blue text-white' : 'bg-win98-dark-gray text-win98-gray'}`}
    onMouseDown={onDragStart}
    onDoubleClick={onMaximize}
  >
    <div className="flex flex-row gap-1 min-w-0">
      <Image src={icon} alt="" width={14} height={14} />
      <p className="font-bold text-xs truncate">{title}</p>
    </div>
    <WindowControls
      isMaximized={isMaximized}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onClose={onClose}
    />
  </div>
);

export default WindowTitleBar;
