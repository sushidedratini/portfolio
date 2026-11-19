import type { AppDefinition } from '../window-manager/types';
import Explorer from './explorer/Explorer';
import RecycleBin from './recycle-bin/RecycleBin';
import AcrobatReader from './acrobat-reader';
import { icons } from './icons';

/**
 * Every application the desktop can launch.
 * To add an app: create its folder here and register it in this list.
 */
export const applications: AppDefinition[] = [
  {
    id: 'my-computer',
    title: 'Meu Computador',
    icon: icons.myComputer,
    render: () => <Explorer />,
    singleInstance: true,
  },
  {
    id: 'recycle-bin',
    title: 'Lixeira',
    icon: icons.recycleBin,
    render: () => <RecycleBin />,
    singleInstance: true,
  },
  {
    // Not single instance: each document opens in its own window (the same document reuses its window).
    id: 'acrobat-reader',
    title: 'Acrobat Reader',
    icon: icons.acrobat,
    render: () => <AcrobatReader />,
    defaultSize: { width: 680, height: 540 },
  },
];
