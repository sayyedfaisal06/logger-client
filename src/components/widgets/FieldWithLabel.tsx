import React from "react";
import { Label } from "../ui/label";

const FieldWithLabel = ({
  label,
  children,
}: {
  label: String;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
};

export default FieldWithLabel;
