"use client";

import React, { useState } from 'react';
import { Outline, Thumbnail } from 'react-pdf';

export type NavigationTab = 'bookmarks' | 'thumbnails';

const TABS: { id: NavigationTab; label: string }[] = [
  { id: 'bookmarks', label: 'Marcadores' },
  { id: 'thumbnails', label: 'Miniaturas' },
];

interface NavigationPaneProps {
  /** Open tab, or null when the pane is collapsed (only the tabs show). */
  tab: NavigationTab | null;
  onTabChange: (tab: NavigationTab | null) => void;
  numPages: number;
  currentPage: number;
}

/**
 * Left pane with vertical tabs, as in Acrobat Reader. Must be rendered inside <Document>;
 * clicks on thumbnails and bookmarks reach the Document's `onItemClick`.
 */
const NavigationPane: React.FC<NavigationPaneProps> = ({ tab, onTabChange, numPages, currentPage }) => {
  const [hasOutline, setHasOutline] = useState<boolean | null>(null);

  return (
    <div className="flex shrink-0 text-xs select-none">
      <div className="flex flex-col gap-0.5 pt-1" role="tablist">
        {TABS.map(({ id, label }) => {
          const isActive = tab === id;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(isActive ? null : id)}
              className={`[writing-mode:vertical-rl] rotate-180 px-0.5 py-2 bg-win98-gray border-2
                border-t-white border-l-white border-b-black border-r-black
                ${isActive ? 'font-bold -mr-0.5 z-10' : ''}`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {tab && (
        <div className="win98-scroll w-32 overflow-y-auto overflow-x-hidden bg-white border-2 border-t-win98-dark-gray border-l-win98-dark-gray border-b-white border-r-white">
          {tab === 'thumbnails' && (
            <ul className="flex flex-col items-center gap-3 py-2">
              {Array.from({ length: numPages }, (_, index) => {
                const pageNumber = index + 1;
                const isCurrent = pageNumber === currentPage;
                return (
                  <li key={pageNumber} className="flex flex-col items-center gap-1">
                    <Thumbnail
                      pageNumber={pageNumber}
                      width={72}
                      loading={null}
                      className={`border ${isCurrent ? 'border-win98-dark-blue outline outline-2 outline-win98-dark-blue' : 'border-black'}`}
                    />
                    <span className={`px-1 ${isCurrent ? 'bg-win98-dark-blue text-white' : ''}`}>{pageNumber}</span>
                  </li>
                );
              })}
            </ul>
          )}

          {tab === 'bookmarks' && (
            <>
              <Outline
                className="p-1 [&_ul_ul]:pl-3 [&_a]:block [&_a]:px-0.5 [&_a]:cursor-default [&_a:hover]:bg-win98-dark-blue [&_a:hover]:text-white"
                onLoadSuccess={(outline) => setHasOutline(Boolean(outline?.length))}
              />
              {hasOutline === false && <p className="p-1 text-win98-dark-gray">Este documento não tem marcadores.</p>}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NavigationPane;
