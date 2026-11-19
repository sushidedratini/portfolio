import React from 'react';
import Image from 'next/image';

export type ToolbarEntry =
  | {
      type?: 'button';
      id: string;
      label: string;
      icon?: string;
      onClick?: () => void;
      disabled?: boolean;
    }
  | { type: 'separator'; id: string };

interface ToolbarProps {
  items: ToolbarEntry[];
}

/** Flat buttons that raise on hover, as in Explorer's toolbar. */
const Toolbar: React.FC<ToolbarProps> = ({ items }) => (
  <div className="flex items-stretch text-black text-xs select-none" role="toolbar">
    {items.map((item) =>
      item.type === 'separator' ? (
        <div key={item.id} role="separator" className="w-0.5 mx-1 border-l border-l-win98-dark-gray border-r border-r-white" />
      ) : (
        <button
          key={item.id}
          onClick={item.onClick}
          disabled={item.disabled}
          className="flex flex-col items-center justify-center gap-0.5 min-w-12 px-1.5 border border-transparent
            enabled:hover:border-t-white enabled:hover:border-l-white enabled:hover:border-b-win98-dark-gray enabled:hover:border-r-win98-dark-gray
            enabled:active:border-t-win98-dark-gray enabled:active:border-l-win98-dark-gray enabled:active:border-b-white enabled:active:border-r-white
            disabled:text-win98-dark-gray disabled:[text-shadow:1px_1px_0_#fff]"
        >
          {item.icon && (
            <Image src={item.icon} alt="" width={20} height={20} className={item.disabled ? 'grayscale opacity-50' : ''} />
          )}
          {item.label}
        </button>
      )
    )}
  </div>
);

export default Toolbar;
