import type { AppDefinition } from '../window-manager/types';
import Explorer from './explorer/Explorer';
import RecycleBin from './recycle-bin/RecycleBin';
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
];
