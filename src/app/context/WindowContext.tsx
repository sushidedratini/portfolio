"use client";

import React, { createContext, useContext, useState, ReactNode, FC } from 'react';

interface Props {
    children?: ReactNode
}

interface WindowDimension {
    height: number;
    width: number;
}
export interface WindowState {
    id: string;
    title: string;
    icon: string;
    isMinimized: boolean;
    isMaximized: boolean;
    dimension: WindowDimension;
    content: React.ReactElement;
}

interface WindowContextType {
    windows: WindowState[];
    focusedWindowId: string | null;
    openWindow: (title: string, icon: string, content: React.ReactElement) => void;
    closeWindow: (id: string) => void;
    toggleMinimize: (id: string) => void;
    toggleMaximize: (id: string) => void;
    focusWindow: (id: string) => void;
}

const defaultContextValue: WindowContextType = {
    windows: [],
    focusedWindowId: null,
    openWindow: () => { },
    closeWindow: () => { },
    toggleMinimize: () => { },
    toggleMaximize: () => { },
    focusWindow: () => { }
};

const WindowContext = createContext<WindowContextType>(defaultContextValue);

export const useWindowContext = () => useContext(WindowContext);

export const WindowProvider: FC<Props> = ({ children }) => {
    const [windows, setWindows] = useState<WindowState[]>([]);
    const [focusedWindowId, setFocusedWindowId] = useState<string | null>(null);

    const openWindow = (title: string, icon: string, content: React.ReactElement) => {
        const randomNumber = Math.floor(1000 + Math.random() * 9000).toString();

        setWindows((prev) => [
            ...prev,
            {
                id: randomNumber, title, icon, content,
                isMinimized: false, isMaximized: false,
                dimension: { width: 500, height: 400 }
            },
        ]);
        setFocusedWindowId(randomNumber);
    };

    const closeWindow = (id: string) => {
        setWindows((prev) => prev.filter((win) => win.id !== id));
    };

    const toggleMinimize = (id: string) => {
        setWindows((prev) =>
            prev.map((window) =>
                window.id === id ? { ...window, isMinimized: !window.isMinimized } : window
            )
        );
    };

    const toggleMaximize = (id: string) => {
        setWindows((prev) =>
            prev.map((window) =>
                window.id === id ? { ...window, isMaximized: !window.isMaximized } : window
            )
        );
    };

    const focusWindow = (id: string) => {
        setFocusedWindowId(id);
    };

    return (
        <WindowContext.Provider value={{ windows, focusedWindowId, openWindow, closeWindow, toggleMinimize, toggleMaximize, focusWindow }}>
            {children}
        </WindowContext.Provider>
    );
};