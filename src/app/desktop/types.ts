export interface StartMenuItem {
    name: string;
    icon: string;
    submenu: StartMenuItem[];
    /** Application launched when the entry is clicked. */
    appId?: string;
}
