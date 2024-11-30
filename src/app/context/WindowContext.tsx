"use client";

import React, { createContext, useContext, useState, ReactNode, FC } from 'react';

interface Props {
    children?: ReactNode
}

interface WindowState {
    id: string;
    title: string;
    icon: string;
    isMinimized: boolean;
    content: React.ReactNode;
}

interface WindowContextType {
    windows: WindowState[];
    focusedWindowId: string | null;
    openWindow: (title: string, icon: string, content: React.ReactNode) => void;
    closeWindow: (id: string) => void;
    toggleMinimize: (id: string) => void;
    focusWindow: (id: string) => void;
}

const defaultContextValue: WindowContextType = {
    windows: [],
    focusedWindowId: null,
    openWindow: () => {},
    closeWindow: () => {},
    toggleMinimize: () => {},
    focusWindow: () => {}
};

const WindowContext = createContext<WindowContextType>(defaultContextValue);

export const useWindowContext = () => useContext(WindowContext);

export const WindowProvider: FC<Props> = ({ children }) => {
    const [windows, setWindows] = useState<WindowState[]>([]);
    const [focusedWindowId, setFocusedWindowId] = useState<string | null>(null);

    const openWindow = (title: string, icon: string, content: React.ReactNode) => {
        const randomNumber = Math.floor(1000 + Math.random() * 9000).toString();

        setWindows((prev) => [
            ...prev,
            { id: randomNumber, title, icon, content, isMinimized: false },
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

    const focusWindow = (id: string) => {
        setFocusedWindowId(id); // Define a janela como focada
      };

    return (
        <WindowContext.Provider value={{ windows, focusedWindowId, openWindow, closeWindow, toggleMinimize, focusWindow }}>
            {children}
        </WindowContext.Provider>
    );
};