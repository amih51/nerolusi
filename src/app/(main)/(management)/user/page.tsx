import { DataTable } from "~/app/_components/table/data-table";
import { api } from "~/trpc/server";
import { columns } from "./user-columns";

export default async function Page() {
  const users = await api.user.getAllUsers();
  return (
    <div>
      <DataTable columns={columns} data={users} />
    </div>
  );
}
