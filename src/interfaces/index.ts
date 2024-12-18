export interface DropdownOption {
  name: string | number;
  code: string | number;
}

export interface UserData {
  id: string;
  usuario: string;
  estado: string;
  sector: number;
}

export type ModalTypes = "add" | "edit";

export type ModalContext = {
  isVisible: boolean;
  modalType: ModalTypes;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setModalType: React.Dispatch<React.SetStateAction<ModalTypes>>;
};

export type UserContext = {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
};

export type PaginationContext = {
  currentPage: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
};

export type FilterValues = {
  user: string;
  status: string | number;
};

export type TableFiltersContext = {
  values: FilterValues;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
};

export interface AppContextInterface {
  user: UserContext;
  modal: ModalContext;
  pagination: PaginationContext;
  filters: TableFiltersContext;
}
