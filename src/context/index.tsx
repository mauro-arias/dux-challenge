"use client";

import { modalTypes } from "@/client/constants";
import { AppContextInterface, ModalTypes, UserData } from "@/interfaces";
import { createContext, useState } from "react";

export const AppContext = createContext<AppContextInterface | undefined>(undefined);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [modalIsVibile, setModalIsVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalTypes>(modalTypes.ADD);

  return (
    <AppContext.Provider
      value={{
        modal: {
          isVisible: modalIsVibile,
          setIsVisible: setModalIsVisible,
          modalType,
          setModalType,
        },
        user: {
          setUser: setSelectedUser,
          user: selectedUser,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
