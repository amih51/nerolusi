import CreateQuestion from "./create-question";

export default function Page({
  params: { packageId },
}: {
  params: { packageId: string };
}) {
  return (
    <main className="flex w-full flex-col">
      {packageId}
      <CreateQuestion packageId={`${packageId}`} index={"1"} subtest={"pk"} />
    </main>
  );
}
