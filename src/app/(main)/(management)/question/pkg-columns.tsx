"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "~/app/_components/ui/button";

export type Package = {
  id: number;
  name: string;
  type: "tryout" | "drill";
  TOstart: Date | null;
  TOend: Date | null;
  TOduration: string | null;
  classId: number | null;
};

export const pkgColumns: ColumnDef<Package>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Package Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "TOstart",
    header: "Start Time",
    cell: ({ row }) =>
      row.original.TOstart
        ? new Date(row.original.TOstart).toLocaleString()
        : "N/A",
  },
  {
    accessorKey: "TOend",
    header: "End Time",
    cell: ({ row }) =>
      row.original.TOend
        ? new Date(row.original.TOend).toLocaleString()
        : "N/A",
  },
  {
    accessorKey: "TOduration",
    header: "Duration",
    cell: ({ row }) => row.original.TOduration ?? "N/A",
  },
  {
    accessorKey: "classId",
    header: "Class ID",
    cell: ({ row }) => row.original.classId ?? "N/A",
  },
];
