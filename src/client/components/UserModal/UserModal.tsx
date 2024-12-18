import { Dialog } from "primereact/dialog";
import React, { useContext, useEffect } from "react";
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
import { Controller, SubmitHandler, UseFormReturn } from "react-hook-form";
import FieldError from "../FieldError/FieldErorr";
import { UserInputs } from "./interfaces";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addUser, deleteUser, getUsers, updateUser } from "@/api/api";
import { QUERY_KEYS } from "@/api/constants/apiEndpoints";
import { AppContext } from "@/context";
import { AppContextInterface, UserData } from "@/interfaces";
import { modalTypes } from "@/client/constants";
import { DevTool } from "@hookform/devtools";

const UserModal = ({ form }: { form: UseFormReturn<UserInputs> }) => {
  const { modal, user, pagination, filters } = useContext(
    AppContext
  ) as AppContextInterface;

  // Mutación para agregar usuario
  const { mutateAsync: mutateAddUser } = useMutation({
    mutationKey: [QUERY_KEYS.ADDED_USER],
    mutationFn: addUser,
  });
  // Mutación para eliminar usuario
  const { mutateAsync: mutateDeleteUser } = useMutation({
    mutationKey: [QUERY_KEYS.DELETED_USER],
    mutationFn: deleteUser,
  });

  // Mutación para editar usuario
  const { mutateAsync: mutateUpdateUser } = useMutation({
    mutationKey: [QUERY_KEYS.DELETED_USER],
    mutationFn: ({ id, data }: { id: string; data: UserData }) => updateUser(id, data),
  });

  const { refetch: refetchUsers } = useQuery({
    queryKey: [
      QUERY_KEYS.USERS,
      pagination.currentPage,
      pagination.rowsPerPage,
      filters.values,
    ],
    queryFn: () =>
      getUsers(pagination.currentPage, pagination.rowsPerPage, filters.values),
    enabled: false,
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = form;

  const handleHideModal = () => {
    form.reset({});
    modal.setIsVisible(false);
  };

  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
    if (modal.modalType === modalTypes.ADD) {
      handleHideModal();
      await mutateAddUser({
        ...data,
        sector: Number(data.sector.code),
        estado: data.estado.code.toString(),
      });
      refetchUsers();
    } else {
      if (user.user?.id) {
        handleHideModal();
        await mutateUpdateUser({
          id: user.user?.id,
          data: {
            ...data,
            sector: Number(data.sector.code),
            estado: data.estado.code.toString(),
          },
        });
        refetchUsers();
      }
    }
  };

  const confirmDelete = (event: React.MouseEvent<HTMLElement>) => {
    confirmPopup({
      target: event.currentTarget,
      message: "¿Desea eliminar el usuario?",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptLabel: "Si, eliminar",
      rejectLabel: "Cancelar",
      acceptClassName: "p-button-danger",
      accept: async () => {
        if (user.user?.id) {
          await mutateDeleteUser(user.user.id);
          refetchUsers();
          handleHideModal();
          form.reset({});
        }
      },
    });
  };

  useEffect(() => {
    if (modal.modalType === modalTypes.EDIT && user?.user) {
      const { sector, estado } = user.user;

      setValue(SECTOR_FIELD, { code: sector, name: sector });
      setValue(STATE_FIELD, { code: estado, name: estado });
      setValue(ID_FIELD, user?.user?.id);
      setValue(USER_FIELD, user?.user?.usuario);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal.modalType, user.user]);

  return (
    <Dialog
      visible={modal.isVisible}
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
              <section id="delete-user-section">
                <Button
                  label="Eliminar"
                  type="button"
                  onClick={confirmDelete}
                  className="font-semibold flex gap-1 w-8rem bg-red-600 border-none"
                  icon="pi pi-trash"
                  size="small"
                />
              </section>
              <section id="user-id-field">
                <label htmlFor="user-id" className="font-bold block text-gray-500 mb-2">
                  id
                </label>
                <InputText
                  keyfilter="int"
                  disabled={modal.modalType === modalTypes.EDIT}
                  placeholder="Ingrese el ID del usuario"
                  id="user-id"
                  className="w-full"
                  {...register(ID_FIELD, ID_VALIDATION)}
                />
                <FieldError errors={errors} fieldName={ID_FIELD} />
              </section>

              <section id="user-name-field">
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

              <section id="user-state-field">
                <label
                  htmlFor="user-state"
                  className="font-bold block text-gray-500 mb-2"
                >
                  Estado
                </label>
                <Controller
                  name="estado"
                  control={control}
                  rules={STATE_VALIDATION}
                  render={({ field }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      options={stateOptions}
                      optionLabel="name"
                      placeholder="Seleccionar el Estado"
                      className="w-full"
                      checkmark={true}
                      highlightOnSelect={false}
                    />
                  )}
                />
                <FieldError errors={errors} fieldName={STATE_FIELD} />
              </section>

              <section id="user-sector-field">
                <label
                  htmlFor="user-sector"
                  className="font-bold block text-gray-500 mb-2"
                >
                  Sector
                </label>
                <Controller
                  name="sector"
                  rules={SECTOR_VALIDATION}
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      options={sectorOptions}
                      optionLabel="name"
                      placeholder="Seleccionar el Sector"
                      className="w-full"
                      checkmark={true}
                      highlightOnSelect={false}
                    />
                  )}
                />

                <FieldError errors={errors} fieldName={SECTOR_FIELD} />
              </section>

              <section id="buttons-section" className="flex justify-content-center gap-2">
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
                    form.reset({});
                  }}
                  size="small"
                />
              </section>
            </main>
            <DevTool control={form.control} />
          </form>
        </>
      )}
    />
  );
};

export default UserModal;
