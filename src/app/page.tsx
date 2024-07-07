"use client";
import { getStudents } from "@/customMethods/students";
import React, { useEffect, useState } from "react";
import columns from "@/lib/columns";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import FilterComponent from "@/components/containers/FilterComponent";
import HeaderComponent from "@/components/containers/HeaderComponent";
import TableComponent from "@/components/containers/TableComponent";

const Home = () => {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  useEffect(() => {
    getStudents().then((res) => setData(res));
  }, []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <div className="p-4">
      <HeaderComponent />
      <FilterComponent table={table} />
      <TableComponent table={table} columnsLength={data.length} />
    </div>
  );
};

export default Home;
