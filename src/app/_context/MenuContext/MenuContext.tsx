"use client";

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export interface MenuContextType {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  showUpdateImage: boolean;
  setUpdateImage: Dispatch<SetStateAction<boolean>>;
}
export const MenuContext = createContext<MenuContextType | undefined>(
  undefined
);

interface MenuContextProviderProps {
  children: ReactNode;
}
export default function MenuContextProvider({
  children,
}: MenuContextProviderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showUpdateImage, setUpdateImage] = useState(false);

  return (
    <MenuContext.Provider
      value={{ setShowMenu, showMenu, setUpdateImage, showUpdateImage }}
    >
      {children}
    </MenuContext.Provider>
  );
}
