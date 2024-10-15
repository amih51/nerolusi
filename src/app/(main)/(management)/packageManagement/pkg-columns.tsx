"use client";

import { Badge } from "~/app/_components/ui/badge";
import { Checkbox } from "~/app/_components/ui/checkbox";
import { QuestionMarkCircledIcon, StopwatchIcon } from "@radix-ui/react-icons";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "~/app/_components/table/data-table-row-actions";
import { DataTableColumnHeader } from "~/app/_components/table/data-table-column-header";

const packageTypes = [
  {
    value: "drill",
    label: "Drill",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "tryout",
    label: "Try Out",
    icon: StopwatchIcon,
  },
];

export type Package = {
  id: number;
  name: string;
  type: "tryout" | "drill";
  TOstart: Date | null;
  TOend: Date | null;
  TOduration: string | null;
  classId: number | null;
};

export const columns: ColumnDef<Package>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Package Name" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const packageType = packageTypes.find(
        (type) => type.value === row.getValue("type"),
      );

      return packageType ? (
        <Badge variant="outline">{packageType.label}</Badge>
      ) : null;
    },
  },
  {
    accessorKey: "TOstart",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Time" />
    ),
    cell: ({ row }) => {
      const TOstart = row.getValue<Date | null>("TOstart");
      return TOstart ? new Date(TOstart).toLocaleString() : "N/A";
    },
  },
  {
    accessorKey: "TOend",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Time" />
    ),
    cell: ({ row }) => {
      const TOend = row.getValue<Date | null>("TOend");
      return TOend ? new Date(TOend).toLocaleString() : "N/A";
    },
  },
  {
    accessorKey: "TOduration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
    cell: ({ row }) => row.getValue<string | null>("TOduration") ?? "N/A",
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
