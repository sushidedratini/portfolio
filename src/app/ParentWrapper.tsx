"use client";

import React from "react";

import { ActiveItemProvider } from './context/ActiveItemContext';
import { WindowProvider } from './context/WindowContext';

export default function ParentProvider({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ActiveItemProvider>
        <WindowProvider>
          {children}
        </WindowProvider>
      </ActiveItemProvider>
    </>
  )
}