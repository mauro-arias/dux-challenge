import React from "react";

const FieldError = ({ errors, fieldName }: { errors: any; fieldName: string }) => {
  if (!errors[fieldName]) return null;
  return <span className="text-red-600 px-1 text-sm">{errors[fieldName].message}</span>;
};

export default FieldError;
