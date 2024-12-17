import React from "react";
import { FieldErrors, FieldError as FormError } from "react-hook-form";

const FieldError = ({
  errors,
  fieldName,
}: {
  errors: FieldErrors;
  fieldName: string;
}) => {
  const error = errors[fieldName] as FormError | undefined;
  const message = error?.message;

  if (!message) return null;

  return <span className="text-red-600 px-1 text-sm">{message as string}</span>;
};

export default FieldError;
