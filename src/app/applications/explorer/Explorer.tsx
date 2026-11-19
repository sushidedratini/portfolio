"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useWindow } from '@/app/window-manager/WindowInstanceContext';
import { Rebar, RebarBand } from '@/app/ui/Rebar';
import MenuBar, { MenuDefinition } from '@/app/ui/MenuBar';
import Toolbar, { ToolbarEntry } from '@/app/ui/Toolbar';
import StatusBar from '@/app/ui/StatusBar';
import ContentArea from '@/app/ui/ContentArea';
import IconGrid, { IconGridItem } from '@/app/ui/IconGrid';
import { icons } from '../icons';

const MY_COMPUTER_ITEMS: IconGridItem[] = [
  { id: 'a', label: 'Disquete de 3½ (A:)', icon: icons.floppy },
  { id: 'c', label: 'Disco local (C:)', icon: icons.hardDisk },
  { id: 'd', label: 'CD-ROM (D:)', icon: icons.cdDrive },
];

const WindowsLogo = () => (
  <div className="flex items-center justify-center w-10 h-auto bg-black select-none">
    <Image src={icons.windowsLogo} alt="Windows Logo" width={20} height={20} />
  </div>
);

const Explorer = () => {
  const { close } = useWindow();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showToolbar, setShowToolbar] = useState(true);
  const [showStatusBar, setShowStatusBar] = useState(true);

  const items = MY_COMPUTER_ITEMS;
  const selected = items.find((item) => item.id === selectedId);

  // Menus and their actions belong to the app, not to the window or MenuBar.
  const menus: MenuDefinition[] = [
    {
      label: '&Arquivo',
      items: [
        { label: '&Abrir', disabled: !selected },
        { label: 'P&ropriedades', disabled: !selected },
        { type: 'separator' },
        { label: '&Fechar', onSelect: close },
      ],
    },
    {
      label: '&Editar',
      items: [
        { label: '&Desfazer', disabled: true, shortcut: 'Ctrl+Z' },
        { type: 'separator' },
        { label: 'Selecionar &tudo', disabled: true, shortcut: 'Ctrl+A' },
      ],
    },
    {
      label: 'E&xibir',
      items: [
        { label: '&Barra de ferramentas', checked: showToolbar, onSelect: () => setShowToolbar((v) => !v) },
        { label: 'Barra de &status', checked: showStatusBar, onSelect: () => setShowStatusBar((v) => !v) },
      ],
    },
    {
      label: 'Aj&uda',
      items: [{ label: '&Tópicos da Ajuda', disabled: true }],
    },
  ];

  const toolbar: ToolbarEntry[] = [
    { id: 'back', label: 'Voltar', disabled: true },
    { id: 'forward', label: 'Avançar', disabled: true },
    { id: 'up', label: 'Acima', disabled: true },
    { type: 'separator', id: 'sep-1' },
    { id: 'properties', label: 'Propriedades', disabled: !selected },
  ];

  return (
    <>
      <Rebar>
        <RebarBand trailing={<WindowsLogo />}>
          <MenuBar menus={menus} />
        </RebarBand>
        {showToolbar && (
          <RebarBand>
            <Toolbar items={toolbar} />
          </RebarBand>
        )}
      </Rebar>

      <ContentArea>
        <IconGrid items={items} selectedId={selectedId} onSelect={setSelectedId} />
      </ContentArea>

      {showStatusBar && (
        <StatusBar
          fields={[
            { id: 'info', content: selected ? selected.label : `${items.length} objeto(s)` },
            {
              id: 'location',
              width: 140,
              content: (
                <>
                  <Image src={icons.myComputer} alt="" width={14} height={14} />
                  Meu Computador
                </>
              ),
            },
          ]}
        />
      )}
    </>
  );
};

export default Explorer;
