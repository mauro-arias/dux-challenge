"use client";

import { modalTypes } from "@/client/constants";
import { AppContextInterface, ModalTypes, UserData } from "@/interfaces";
import { createContext, useState } from "react";

export const AppContext = createContext<AppContextInterface | undefined>(undefined);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  // User Data
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  // Modal Data
  const [modalIsVibile, setModalIsVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalTypes>(modalTypes.ADD);
  // Pagination Data
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const rowsPerPageOptions = [5, 10, 20, 50];

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
        pagination: {
          currentPage,
          setCurrentPage,
          rowsPerPage,
          setRowsPerPage,
          rowsPerPageOptions,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
