/**
 * The raised vertical handle shown at the start of a band
 * (window menu bars, toolbars and the taskbar).
 */
const Grip = ({ className = 'h-5' }: { className?: string }) => (
  <div
    aria-hidden
    className={`w-1 shrink-0 bg-win98-gray border border-l-white border-t-white border-r-win98-dark-gray border-b-win98-dark-gray cursor-col-resize ${className}`}
  />
);

export default Grip;
