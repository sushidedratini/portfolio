import React from 'react';
import { FirstPageIcon, LastPageIcon, NavigationPaneIcon, NextPageIcon, PreviousPageIcon } from './icons';

interface PageNavigatorProps {
  currentPage: number;
  numPages: number;
  pageSizeLabel: string;
  zoomLabel: string;
  onGoToPage: (page: number) => void;
  onToggleNavigationPane: () => void;
}

const NavButton = ({ label, disabled, onClick, children }: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    aria-label={label}
    title={label}
    disabled={disabled}
    onClick={onClick}
    className="flex items-center justify-center w-5 h-[18px] bg-win98-gray border border-t-white border-l-white border-b-black border-r-black
      enabled:active:border-t-black enabled:active:border-l-black enabled:active:border-b-white enabled:active:border-r-white
      disabled:text-win98-dark-gray"
  >
    {children}
  </button>
);

const Field = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex items-center justify-center h-[18px] px-2 whitespace-nowrap bg-win98-gray border border-t-win98-dark-gray border-l-win98-dark-gray border-b-white border-r-white ${className}`}>
    {children}
  </div>
);

/** Bottom bar of the document view: |◀ ◀ [1 de N] ▶ ▶| plus page size and zoom. */
const PageNavigator: React.FC<PageNavigatorProps> = ({
  currentPage,
  numPages,
  pageSizeLabel,
  zoomLabel,
  onGoToPage,
  onToggleNavigationPane,
}) => {
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= numPages;

  return (
    <div className="flex items-center gap-0.5 mt-0.5 text-xs text-black select-none">
      <NavButton label="Mostrar/ocultar painel de navegação" onClick={onToggleNavigationPane}>
        <NavigationPaneIcon />
      </NavButton>
      <div className="w-1" />
      <NavButton label="Primeira página" disabled={isFirst} onClick={() => onGoToPage(1)}><FirstPageIcon /></NavButton>
      <NavButton label="Página anterior" disabled={isFirst} onClick={() => onGoToPage(currentPage - 1)}><PreviousPageIcon /></NavButton>
      <Field className="min-w-16">{numPages ? `${currentPage} de ${numPages}` : '-'}</Field>
      <NavButton label="Próxima página" disabled={isLast} onClick={() => onGoToPage(currentPage + 1)}><NextPageIcon /></NavButton>
      <NavButton label="Última página" disabled={isLast} onClick={() => onGoToPage(numPages)}><LastPageIcon /></NavButton>
      <div className="w-1" />
      <Field>{pageSizeLabel}</Field>
      <Field className="min-w-12">{zoomLabel}</Field>
    </div>
  );
};

export default PageNavigator;
