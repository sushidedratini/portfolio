"use client";

import React from "react";

import { ActiveItemProvider } from './desktop/ActiveItemContext';
import { WindowManagerProvider } from './window-manager/WindowManagerContext';
import { applications } from './applications';

export default function ParentProvider({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ActiveItemProvider>
      <WindowManagerProvider apps={applications}>
        {children}
      </WindowManagerProvider>
    </ActiveItemProvider>
  )
}
