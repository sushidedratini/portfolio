import React, { forwardRef } from 'react';

interface ContentAreaProps {
  children?: React.ReactNode;
  className?: string;
  /** `white` for lists and documents, `dark` for viewers that show pages over a gray backdrop. */
  variant?: 'white' | 'dark';
  onClick?: (e: React.MouseEvent) => void;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}

const BACKGROUNDS = {
  white: 'bg-white',
  dark: 'bg-win98-dark-gray',
};

/** Sunken, scrollable area (with classic scrollbars) where an app shows its main content. */
const ContentArea = forwardRef<HTMLDivElement, ContentAreaProps>(
  ({ children, className = '', variant = 'white', onClick, onScroll }, ref) => (
    <div
      ref={ref}
      className={`win98-scroll flex-1 min-h-0 overflow-auto ${BACKGROUNDS[variant]} border-2 border-t-win98-dark-gray border-l-win98-dark-gray border-b-white border-r-white ${className}`}
      onClick={onClick}
      onScroll={onScroll}
    >
      {children}
    </div>
  )
);
ContentArea.displayName = 'ContentArea';

export default ContentArea;
