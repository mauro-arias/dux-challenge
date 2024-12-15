"use client";

import { Button, ButtonProps } from "primereact/button";

const TableToolbar = ({
  actionButtons,
}: {
  actionButtons: ButtonProps[] | undefined;
}) => {
  return (
    <>
      {actionButtons?.map((button, index) => (
        <Button key={index} {...button} />
      ))}
    </>
  );
};

export default TableToolbar;
