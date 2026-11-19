/** Tiny pixel icons (16×16) for the reader's page navigation buttons. */
const PixelIcon = ({ path }: { path: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" shapeRendering="crispEdges" aria-hidden>
    <path d={path} fill="currentColor" />
  </svg>
);

export const FirstPageIcon = () => <PixelIcon path="M5 5h1v7H5zM7 8h1v1H7zM8 7h1v3H8zM9 6h1v5H9zM10 5h1v7h-1z" />;
export const PreviousPageIcon = () => <PixelIcon path="M6 8h1v1H6zM7 7h1v3H7zM8 6h1v5H8zM9 5h1v7H9z" />;
export const NextPageIcon = () => <PixelIcon path="M6 5h1v7H6zM7 6h1v5H7zM8 7h1v3H8zM9 8h1v1H9z" />;
export const LastPageIcon = () => <PixelIcon path="M5 5h1v7H5zM6 6h1v5H6zM7 7h1v3H7zM8 8h1v1H8zM10 5h1v7h-1z" />;
export const NavigationPaneIcon = () => <PixelIcon path="M3 4h10v1H3zM3 11h10v1H3zM3 4h1v8H3zM12 4h1v8h-1zM6 4h1v8H6z" />;
