import { icons } from '../applications/icons';

export interface Shortcut {
  /** Application launched on double-click. */
  appId: string;
  /** Overrides the app's title/icon, e.g. for a document shortcut. */
  title?: string;
  icon?: string;
  /** Document handed to the app, like double-clicking a file in Windows. */
  file?: string;
}

export const DESKTOP_SHORTCUTS: Shortcut[] = [
  { appId: 'my-computer' },
  { appId: 'recycle-bin' },
  {
    appId: 'acrobat-reader',
    title: 'resume.pdf',
    icon: icons.acrobat,
    file: '/portfolio/documents/resume-eduardo.pdf',
  },
];
