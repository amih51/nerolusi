import { columns } from "~/app/(main)/(management)/packageManagement/pkg-columns";
import { DataTable } from "~/app/_components/table/data-table";
import { api } from "~/trpc/server";

export default async function Page() {
  const pkg = await api.package.getAllPackages();
  return (
    <div>
      <DataTable columns={columns} data={pkg} />
    </div>
  );
}
