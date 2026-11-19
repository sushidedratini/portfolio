import React from 'react';

interface ContentAreaProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

/** Sunken, scrollable white area where an app shows its main content. */
const ContentArea: React.FC<ContentAreaProps> = ({ children, className = '', onClick }) => (
  <div
    className={`flex-1 min-h-0 overflow-auto bg-white border-2 border-t-win98-dark-gray border-l-win98-dark-gray border-b-white border-r-white ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

export default ContentArea;
