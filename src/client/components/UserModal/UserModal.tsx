import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import styles from "./styles.module.css";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import {
  ID_FIELD,
  ID_VALIDATION,
  SECTOR_FIELD,
  SECTOR_VALIDATION,
  sectorOptions,
  STATE_FIELD,
  STATE_VALIDATION,
  stateOptions,
  USER_FIELD,
  USER_VALIDATION,
} from "./constants";
import { Button } from "primereact/button";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import FieldError from "../FieldError/FieldErorr";
import { UserInputs } from "./interfaces";

const UserModal = ({
  isVisible,
  handleHideModal,
  form,
}: {
  isVisible: boolean;
  handleHideModal: () => void;
  form: UseFormReturn<UserInputs>;
}) => {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<UserInputs> = (data) => {
    console.log("SUBMIT");
    console.log(data);
    handleHideModal();
    handleClearDropdowns();
  };

  const confirmDelete = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: "¿Desea eliminar el usuario?",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptLabel: "Si, eliminar",
      rejectLabel: "Cancelar",
      acceptClassName: "p-button-danger",
      accept: () => console.log("Accepted"),
      reject: () => console.log("Rejected"),
    });
  };

  const handleClearDropdowns = () => {
    setSelectedSector(null);
    setSelectedState(null);
  };

  return (
    <Dialog
      visible={isVisible}
      style={{ width: "70vw" }}
      onHide={handleHideModal}
      content={({ hide }) => (
        <>
          <ConfirmPopup />
          <div className={`flex px-3 border-round-top-md ${styles.titleContainer}`}>
            <p className="text-white text-xl font-semibold">Usuario</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <main className="p-3 bg-white border-round-bottom-md w-full flex flex-column gap-3">
              <section>
                <Button
                  label="Eliminar"
                  type="button"
                  onClick={confirmDelete}
                  className="font-semibold flex gap-1 w-8rem bg-red-600 border-none"
                  icon="pi pi-trash"
                  size="small"
                />
              </section>
              <section>
                <label htmlFor="user-id" className="font-bold block text-gray-500 mb-2">
                  id
                </label>
                <InputText
                  keyfilter="int"
                  placeholder="Ingrese el ID del usuario"
                  id="user-id"
                  className="w-full"
                  {...register(ID_FIELD, ID_VALIDATION)}
                />
                <FieldError errors={errors} fieldName={ID_FIELD} />
              </section>

              <section>
                <label htmlFor="user-name" className="font-bold block text-gray-500 mb-2">
                  Nombre
                </label>
                <InputText
                  placeholder="Ingrese el nombre del usuario"
                  id="user-name"
                  className="w-full"
                  {...register(USER_FIELD, USER_VALIDATION)}
                />
                <FieldError errors={errors} fieldName={USER_FIELD} />
              </section>

              <section>
                <label
                  htmlFor="user-state"
                  className="font-bold block text-gray-500 mb-2"
                >
                  Estado
                </label>
                <Dropdown
                  id="user-state"
                  value={selectedState}
                  options={stateOptions}
                  optionLabel="name"
                  placeholder="Seleccionar el Estado"
                  className="w-full"
                  checkmark={true}
                  {...register(STATE_FIELD, STATE_VALIDATION)}
                  onChange={(e) => setSelectedState(e.value)}
                  highlightOnSelect={false}
                />
                <FieldError errors={errors} fieldName={STATE_FIELD} />
              </section>

              <section>
                <label
                  htmlFor="user-sector"
                  className="font-bold block text-gray-500 mb-2"
                >
                  Sector
                </label>
                <Dropdown
                  id="user-sector"
                  options={sectorOptions}
                  value={selectedSector}
                  optionLabel="name"
                  placeholder="Seleccionar el Sector"
                  className="w-full"
                  checkmark={true}
                  {...register(SECTOR_FIELD, SECTOR_VALIDATION)}
                  highlightOnSelect={false}
                  onChange={(e) => setSelectedSector(e.value)}
                />
                <FieldError errors={errors} fieldName={SECTOR_FIELD} />
              </section>

              <section className="flex justify-content-center gap-2">
                <Button
                  label="Confirmar"
                  className="font-semibold flex gap-1"
                  icon="pi pi-check"
                  size="small"
                />
                <Button
                  label="Cancelar"
                  className="font-semibold flex gap-1"
                  icon="pi pi-times"
                  outlined
                  onClick={(e) => {
                    hide(e);
                    handleClearDropdowns();
                  }}
                  size="small"
                />
              </section>
            </main>
          </form>
        </>
      )}
    ></Dialog>
  );
};

export default UserModal;
