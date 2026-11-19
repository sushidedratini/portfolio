"use client";

import React, { useState } from 'react';
import { useWindow } from '@/app/window-manager/WindowInstanceContext';
import MenuBar, { MenuDefinition } from '@/app/ui/MenuBar';
import StatusBar from '@/app/ui/StatusBar';
import ContentArea from '@/app/ui/ContentArea';
import IconGrid, { IconGridItem } from '@/app/ui/IconGrid';
import { icons } from '../icons';

const DELETED_ITEMS: IconGridItem[] = [
  { id: 'curriculo-antigo', label: 'curriculo_antigo.doc', icon: icons.document },
  { id: 'anotacoes', label: 'anotacoes.txt', icon: icons.notepadFile },
  { id: 'rascunho', label: 'rascunho.bmp', icon: icons.paintFile },
];

/** A simpler app: a plain menu bar (no rebar, no toolbar), content and status bar. */
const RecycleBin = () => {
  const { close } = useWindow();
  const [items, setItems] = useState(DELETED_ITEMS);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const restoreSelected = () => {
    setItems((current) => current.filter((item) => item.id !== selectedId));
    setSelectedId(null);
  };

  const menus: MenuDefinition[] = [
    {
      label: '&Arquivo',
      items: [
        { label: '&Restaurar', disabled: !selectedId, onSelect: restoreSelected },
        { label: '&Esvaziar Lixeira', disabled: items.length === 0, onSelect: () => setItems([]) },
        { type: 'separator' },
        { label: '&Fechar', onSelect: close },
      ],
    },
    {
      label: 'Aj&uda',
      items: [{ label: '&Tópicos da Ajuda', disabled: true }],
    },
  ];

  return (
    <>
      <div className="my-0.5">
        <MenuBar menus={menus} />
      </div>

      <ContentArea>
        <IconGrid items={items} selectedId={selectedId} onSelect={setSelectedId} />
      </ContentArea>

      <StatusBar fields={[{ id: 'count', content: `${items.length} objeto(s)` }]} />
    </>
  );
};

export default RecycleBin;
