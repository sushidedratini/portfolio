"use client";

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Document, Page, pdfjs } from 'react-pdf';
import { useWindow } from '@/app/window-manager/WindowInstanceContext';
import { fileName } from '@/app/window-manager/WindowManagerContext';
import { Rebar, RebarBand } from '@/app/ui/Rebar';
import MenuBar, { MenuDefinition } from '@/app/ui/MenuBar';
import Toolbar, { ToolbarEntry } from '@/app/ui/Toolbar';
import ContentArea from '@/app/ui/ContentArea';
import NavigationPane, { NavigationTab } from './NavigationPane';
import PageNavigator from './PageNavigator';
import { icons } from '../icons';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

const ZOOM_STEPS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3];
/** Space around the pages in the document view (matches the `p-4` below). */
const PAGE_PADDING = 16;
const POINTS_PER_INCH = 72;

type Zoom = number | 'fit-width' | 'fit-page';

/** Page size in PDF points. */
interface PageSize {
  width: number;
  height: number;
}

const formatInches = (points: number) =>
  (points / POINTS_PER_INCH).toLocaleString('pt-BR', { maximumFractionDigits: 2 });

/**
 * The source image is 16:9 with the logo in the middle. It's positioned absolutely so it
 * never drives the box size: it takes the box's height (the rebar's) and is centered,
 * so the white side margins are simply clipped.
 */
const AdobeLogo = () => (
  <div className="relative w-11 shrink-0 overflow-hidden bg-white border-l-2 border-l-win98-dark-gray select-none">
    <Image
      src={icons.adobeLogo}
      alt="Adobe"
      width={3840}
      height={2160}
      className="absolute top-1 bottom-1 left-1/2 -translate-x-1/2 h-[calc(100%-0.5rem)] w-auto max-w-none"
    />
  </div>
);

const AcrobatReader = () => {
  const { file, close } = useWindow();
  // State instead of a ref: the view only mounts after <Document> finishes loading.
  const [view, setView] = useState<HTMLDivElement | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [pageSize, setPageSize] = useState<PageSize | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState<Zoom>('fit-width');
  const [navigationTab, setNavigationTab] = useState<NavigationTab | null>('thumbnails');
  const [viewSize, setViewSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!view) return;
    const observer = new ResizeObserver(() => setViewSize({ width: view.clientWidth, height: view.clientHeight }));
    observer.observe(view);
    return () => observer.disconnect();
  }, [view]);

  const scale = useMemo(() => {
    if (typeof zoom === 'number') return zoom;
    if (!pageSize || !viewSize.width) return 1;
    const fitWidth = (viewSize.width - PAGE_PADDING * 2) / pageSize.width;
    if (zoom === 'fit-width') return Math.max(0.1, fitWidth);
    const fitHeight = (viewSize.height - PAGE_PADDING * 2) / pageSize.height;
    return Math.max(0.1, Math.min(fitWidth, fitHeight));
  }, [zoom, pageSize, viewSize]);

  const pageElements = useCallback(
    () => Array.from(view?.querySelectorAll<HTMLElement>('.react-pdf__Page') ?? []),
    [view],
  );

  const goToPage = useCallback((page: number) => {
    const target = Math.min(Math.max(1, page), numPages);
    const element = pageElements()[target - 1];
    if (element && view) view.scrollTop = element.offsetTop - PAGE_PADDING;
    setCurrentPage(target);
  }, [numPages, pageElements, view]);

  // The current page is the last one whose top edge has passed the upper third of the view.
  const handleScroll = () => {
    if (!view) return;
    const threshold = view.scrollTop + view.clientHeight / 3;
    let page = 1;
    pageElements().forEach((element, index) => {
      if (element.offsetTop <= threshold) page = index + 1;
    });
    setCurrentPage(page);
  };

  const zoomBy = (direction: 1 | -1) => {
    const next = direction > 0
      ? ZOOM_STEPS.find((step) => step > scale + 0.001)
      : [...ZOOM_STEPS].reverse().find((step) => step < scale - 0.001);
    if (next) setZoom(next);
  };

  const saveCopy = () => {
    if (!file) return;
    const link = document.createElement('a');
    link.href = file;
    link.download = fileName(file);
    link.click();
  };

  const hasDocument = numPages > 0;
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= numPages;

  const menus: MenuDefinition[] = [
    {
      label: '&Arquivo',
      items: [
        { label: '&Abrir...', shortcut: 'Ctrl+O', disabled: true },
        { type: 'separator' },
        { label: '&Fechar', shortcut: 'Ctrl+W', onSelect: close },
        { label: 'Salvar uma &cópia...', shortcut: 'Ctrl+Shift+S', disabled: !hasDocument, onSelect: saveCopy },
        { type: 'separator' },
        { label: '&Propriedades do documento', disabled: true },
        { type: 'separator' },
        { label: '&Imprimir...', shortcut: 'Ctrl+P', disabled: true },
        { type: 'separator' },
        { label: 'Sai&r', shortcut: 'Ctrl+Q', onSelect: close },
      ],
    },
    {
      label: '&Editar',
      items: [
        { label: '&Copiar', shortcut: 'Ctrl+C', disabled: true },
        { label: 'Selecionar &tudo', shortcut: 'Ctrl+A', disabled: true },
      ],
    },
    {
      label: '&Documento',
      items: [
        { label: '&Primeira página', disabled: isFirst, onSelect: () => goToPage(1) },
        { label: 'Página &anterior', disabled: isFirst, onSelect: () => goToPage(currentPage - 1) },
        { label: 'Pró&xima página', disabled: isLast, onSelect: () => goToPage(currentPage + 1) },
        { label: '&Última página', disabled: isLast, onSelect: () => goToPage(numPages) },
      ],
    },
    {
      label: 'E&xibir',
      items: [
        { label: '&Ampliar', shortcut: 'Ctrl++', onSelect: () => zoomBy(1) },
        { label: '&Reduzir', shortcut: 'Ctrl+-', onSelect: () => zoomBy(-1) },
        { type: 'separator' },
        { label: '&Tamanho real', checked: zoom === 1, onSelect: () => setZoom(1) },
        { label: 'Ajustar à &página', checked: zoom === 'fit-page', onSelect: () => setZoom('fit-page') },
        { label: 'Ajustar à &largura', checked: zoom === 'fit-width', onSelect: () => setZoom('fit-width') },
        { type: 'separator' },
        {
          label: 'Painel de &navegação',
          checked: navigationTab !== null,
          onSelect: () => setNavigationTab((tab) => (tab ? null : 'thumbnails')),
        },
      ],
    },
    {
      label: '&Janela',
      items: [{ label: file ? `&1 ${fileName(file)}` : '&1 (nenhum documento)', checked: true }],
    },
    {
      label: 'Aj&uda',
      items: [{ label: '&Sobre o Acrobat Reader...', disabled: true }],
    },
  ];

  const toolbar: ToolbarEntry[] = [
    { id: 'save', label: 'Salvar', disabled: !hasDocument, onClick: saveCopy },
    { type: 'separator', id: 'sep-1' },
    { id: 'previous', label: 'Anterior', disabled: isFirst, onClick: () => goToPage(currentPage - 1) },
    { id: 'next', label: 'Próxima', disabled: isLast, onClick: () => goToPage(currentPage + 1) },
    { type: 'separator', id: 'sep-2' },
    { id: 'zoom-out', label: 'Reduzir', onClick: () => zoomBy(-1) },
    { id: 'zoom-in', label: 'Ampliar', onClick: () => zoomBy(1) },
    { type: 'separator', id: 'sep-3' },
    { id: 'actual-size', label: '100%', onClick: () => setZoom(1) },
    { id: 'fit-page', label: 'Página', onClick: () => setZoom('fit-page') },
    { id: 'fit-width', label: 'Largura', onClick: () => setZoom('fit-width') },
  ];

  // Shown by <Document> in place of its content, over the window's gray background.
  const message = (text: string) => <p className="m-auto p-4 text-xs text-black">{text}</p>;

  return (
    <>
      <Rebar trailing={<AdobeLogo />}>
        <RebarBand>
          <Image src={icons.acrobat} alt="" width={16} height={16} className="self-center mr-1" />
          <MenuBar menus={menus} />
        </RebarBand>
        <RebarBand>
          <Toolbar items={toolbar} />
        </RebarBand>
      </Rebar>

      <Document
        file={file}
        className="flex flex-1 min-h-0 gap-0.5"
        onLoadSuccess={(pdf) => {
          setNumPages(pdf.numPages);
          setCurrentPage(1);
        }}
        onItemClick={({ pageNumber }) => goToPage(pageNumber)}
        loading={message('Abrindo documento...')}
        error={message('Não foi possível abrir o documento.')}
        noData={message('Nenhum documento aberto.')}
      >
        <NavigationPane
          tab={navigationTab}
          onTabChange={setNavigationTab}
          numPages={numPages}
          currentPage={currentPage}
        />

        <div className="flex flex-col flex-1 min-w-0">
          <ContentArea ref={setView} variant="dark" className="relative" onScroll={handleScroll}>
            <div className="flex flex-col items-center gap-4 p-4 w-max min-w-full">
              {Array.from({ length: numPages }, (_, index) => (
                <Page
                  key={index}
                  pageNumber={index + 1}
                  scale={scale}
                  loading={null}
                  className="bg-white shadow-[3px_3px_0_0_#000]"
                  onLoadSuccess={index === 0
                    ? (page) => setPageSize({ width: page.originalWidth, height: page.originalHeight })
                    : undefined}
                />
              ))}
            </div>
          </ContentArea>

          <PageNavigator
            currentPage={currentPage}
            numPages={numPages}
            pageSizeLabel={pageSize ? `${formatInches(pageSize.width)} x ${formatInches(pageSize.height)} pol` : '-'}
            zoomLabel={`${Math.round(scale * 100)}%`}
            onGoToPage={goToPage}
            onToggleNavigationPane={() => setNavigationTab((tab) => (tab ? null : 'thumbnails'))}
          />
        </div>
      </Document>
    </>
  );
};

export default AcrobatReader;
