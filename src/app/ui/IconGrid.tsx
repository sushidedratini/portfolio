import React from 'react';
import Image from 'next/image';

export interface IconGridItem {
  id: string;
  label: string;
  icon: string;
}

interface IconGridProps {
  items: IconGridItem[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onOpen?: (id: string) => void;
}

/** "Large icons" view, as used by Explorer-like apps. */
const IconGrid: React.FC<IconGridProps> = ({ items, selectedId, onSelect, onOpen }) => (
  <ul className="flex flex-wrap content-start gap-2 p-2 text-xs text-black" onClick={() => onSelect(null)}>
    {items.map((item) => {
      const isSelected = item.id === selectedId;
      return (
        <li
          key={item.id}
          className="flex flex-col items-center w-20 gap-1 text-center cursor-default select-none"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(item.id);
          }}
          onDoubleClick={() => onOpen?.(item.id)}
        >
          <Image
            src={item.icon}
            alt=""
            width={32}
            height={32}
            className={isSelected ? 'filter invert hue-rotate-180' : ''}
          />
          <span className={`px-0.5 ${isSelected ? 'bg-win98-dark-blue text-white outline-dotted outline-1' : ''}`}>
            {item.label}
          </span>
        </li>
      );
    })}
  </ul>
);

export default IconGrid;
