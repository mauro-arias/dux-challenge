import { Dialog } from "primereact/dialog";
import React from "react";
import styles from "./styles.module.css";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { sectorOptions, stateOptions } from "./constants";
import { Button } from "primereact/button";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";

const UserModal = ({
  isVisible,
  handleHideModal,
}: {
  isVisible: boolean;
  handleHideModal: () => void;
}) => {
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
          <main className="p-3 bg-white border-round-bottom-md w-full flex flex-column gap-3">
            <section>
              <Button
                label="Eliminar"
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
              <InputNumber
                useGrouping={false}
                placeholder="Ingrese el ID del usuario"
                inputId="user-id"
                className="w-full"
              />
            </section>

            <section>
              <label htmlFor="user-name" className="font-bold block text-gray-500 mb-2">
                Nombre
              </label>
              <InputText
                keyfilter="alpha"
                placeholder="Ingrese el nombre del usuario"
                id="user-name"
                className="w-full"
              />
            </section>

            <section>
              <label htmlFor="user-state" className="font-bold block text-gray-500 mb-2">
                Estado
              </label>
              <Dropdown
                id="user-state"
                options={stateOptions}
                optionLabel="name"
                placeholder="Seleccionar el Estado"
                className="w-full"
                checkmark={true}
                highlightOnSelect={false}
              />
            </section>

            <section>
              <label htmlFor="user-sector" className="font-bold block text-gray-500 mb-2">
                Sector
              </label>
              <Dropdown
                id="user-sector"
                options={sectorOptions}
                optionLabel="name"
                placeholder="Seleccionar el Sector"
                className="w-full"
                checkmark={true}
                highlightOnSelect={false}
              />
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
                onClick={hide}
                size="small"
              />
            </section>
          </main>
        </>
      )}
    ></Dialog>
  );
};

export default UserModal;
