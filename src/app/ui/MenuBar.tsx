"use client";

import React, { useEffect, useRef, useState } from 'react';
import AccessKeyLabel from './AccessKeyLabel';

export type MenuEntry =
  | {
      type?: 'item';
      /** Use `&` before the access key letter, e.g. "&Fechar". */
      label: string;
      onSelect?: () => void;
      disabled?: boolean;
      checked?: boolean;
      shortcut?: string;
    }
  | { type: 'separator' };

export interface MenuDefinition {
  label: string;
  items: MenuEntry[];
}

interface MenuBarProps {
  menus: MenuDefinition[];
}

/**
 * Renders the menus an application hands to it. It holds no knowledge
 * of which menus exist or what they do.
 */
const MenuBar: React.FC<MenuBarProps> = ({ menus }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openIndex === null) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpenIndex(null);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openIndex]);

  const handleSelect = (entry: MenuEntry) => {
    if (entry.type === 'separator' || entry.disabled) return;
    setOpenIndex(null);
    entry.onSelect?.();
  };

  return (
    <div ref={containerRef} className="flex items-start text-black text-xs select-none" role="menubar">
      {menus.map((menu, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={menu.label} className="relative">
            <button
              role="menuitem"
              aria-haspopup="menu"
              aria-expanded={isOpen}
              className={`px-2 border-2 ${isOpen
                ? 'border-t-win98-dark-gray border-l-win98-dark-gray border-b-white border-r-white'
                : 'border-transparent hover:border-t-2 hover:border-l-2 hover:border-t-white hover:border-l-white hover:border-b-2 hover:border-r-2 hover:border-b-win98-dark-gray hover:border-r-win98-dark-gray'}`}
              onMouseDown={() => setOpenIndex(isOpen ? null : index)}
              onMouseEnter={() => openIndex !== null && setOpenIndex(index)}
            >
              <AccessKeyLabel label={menu.label} />
            </button>

            {isOpen && (
              <ul
                role="menu"
                className="absolute left-0 top-full z-20 min-w-40 py-0.5 bg-win98-gray
                  border-2 border-t-white border-l-white border-b-black border-r-black shadow-[1px_1px_0_0_#000]"
              >
                {menu.items.map((entry, entryIndex) =>
                  entry.type === 'separator' ? (
                    <li key={entryIndex} role="separator" className="mx-0.5 my-1 border-t border-t-win98-dark-gray border-b border-b-white" />
                  ) : (
                    <li
                      key={entryIndex}
                      role="menuitem"
                      aria-disabled={entry.disabled}
                      className={`flex items-center justify-between gap-6 pr-4 py-0.5 whitespace-nowrap
                        ${entry.disabled
                          ? 'text-win98-dark-gray [text-shadow:1px_1px_0_#fff]'
                          : 'hover:bg-win98-dark-blue hover:text-white cursor-default'}`}
                      onClick={() => handleSelect(entry)}
                    >
                      <span className="flex items-center">
                        <span className="w-5 text-center">{entry.checked ? '✓' : ''}</span>
                        <AccessKeyLabel label={entry.label} />
                      </span>
                      {entry.shortcut && <span>{entry.shortcut}</span>}
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MenuBar;
