import React from 'react';

interface WindowControlsProps {
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
}

const WindowControls: React.FC<WindowControlsProps> = ({
  onMinimize,
  onMaximize,
  onClose,
}) => (
  <div className="flex">
    <button onClick={onMinimize} className="bg-win98-gray w-4 h-4 flex items-center justify-center border-t-2 
        border-t-white border-b-2 border-b-black border-r-2 
        border-r-black border-solid text-black text-sm font-win98">🗕</button>
    <button onClick={onMaximize} className="bg-win98-gray w-4 h-4 flex items-center justify-center border-t-2 
        border-t-white border-b-2 border-b-black border-r-2 
        border-r-black border-solid text-black text-sm font-win98">🗖</button>
    <button onClick={onClose} className="bg-win98-gray w-4 h-4 flex items-center justify-center border-t-2 
        border-t-white border-b-2 border-b-black border-r-2 
        border-r-black border-solid text-black text-sm font-win98">✖</button>
  </div>
);

export default WindowControls;
