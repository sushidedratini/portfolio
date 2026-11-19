"use client";

import dynamic from 'next/dynamic';

// pdf.js needs browser APIs (canvas, DOMMatrix, web workers), so the reader is only ever loaded in the browser.
const AcrobatReader = dynamic(() => import('./AcrobatReader'), {
  ssr: false,
  loading: () => <p className="m-auto text-xs">Carregando o Acrobat Reader...</p>,
});

export default AcrobatReader;
