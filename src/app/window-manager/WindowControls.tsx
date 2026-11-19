import React from 'react';

interface WindowControlsProps {
  isMaximized: boolean;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
}

const buttonClass = `bg-win98-gray w-4 h-4 flex items-center justify-center border-t-2
  border-t-white border-b-2 border-b-black border-r-2
  border-r-black border-solid text-black text-sm font-win98`;

// Keeps a press on a control from starting a title bar drag.
const stopDrag = (e: React.MouseEvent) => e.stopPropagation();

const WindowControls: React.FC<WindowControlsProps> = ({
  isMaximized,
  onMinimize,
  onMaximize,
  onClose,
}) => (
  <div className="flex" onMouseDown={stopDrag} onDoubleClick={stopDrag}>
    <button onClick={onMinimize} className={buttonClass} aria-label="Minimizar">🗕</button>
    <button onClick={onMaximize} className={buttonClass} aria-label={isMaximized ? 'Restaurar' : 'Maximizar'}>
      {isMaximized ? '🗗' : '🗖'}
    </button>
    <button onClick={onClose} className={`${buttonClass} ml-0.5`} aria-label="Fechar">✖</button>
  </div>
);

export default WindowControls;
