"use client";
import { StudentTable } from "../widgets/StudentTable";

const TableComponent = ({
  table,
  columnsLength,
}: {
  table: any;
  columnsLength: number;
}) => {
  return (
    <div>
      <StudentTable table={table} columnsLength={columnsLength} />
    </div>
  );
};

export default TableComponent;
