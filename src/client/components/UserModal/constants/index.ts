import { DropdownOption } from "@/interfaces";

export const stateOptions: DropdownOption[] = [
  {
    name: "ACTIVO",
    code: "ACTIVO",
  },
  {
    name: "INACTIVO",
    code: "INACTIVO",
  },
];

export const sectorOptions: DropdownOption[] = [
  {
    name: 9000,
    code: 9000,
  },
];

// Form Fields IDs
export const ID_FIELD = "id";
export const USER_FIELD = "usuario";
export const STATE_FIELD = "estado";
export const SECTOR_FIELD = "sector";

// Form Field Validations
export const ID_VALIDATION = {
  required: "ID es requerido",
  maxLength: {
    value: 20,
    message: "El ID debe tener máximo 15 caracteres",
  },
};

export const USER_VALIDATION = {
  required: "Usuario es requerido",
  pattern: {
    value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ.,\s]*$/,
    message: "El usuario solo puede contener letras y espacios",
  },
  minLength: {
    value: 6,
    message: "El usuario debe tener al menos 6 caracteres",
  },
  maxLength: {
    value: 20,
    message: "El usuario debe tener máximo 15 caracteres",
  },
};

export const STATE_VALIDATION = {
  required: "Estado es requerido",
};

export const SECTOR_VALIDATION = {
  required: "Sector es requerido",
};
