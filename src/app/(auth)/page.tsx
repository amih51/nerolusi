import Link from "next/link";
import { Button } from "../_components/ui/button";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex size-fit flex-col items-center justify-center gap-3 rounded-[1rem] border bg-card p-6">
        Signin Nerolusi
        <Button asChild className="w-fit">
          <Link href={"/admin"}>Admin</Link>
        </Button>
        <Button asChild className="w-fit">
          <Link href={"/student"}>Student</Link>
        </Button>
        <Button asChild className="w-fit">
          <Link href={"/teacher"}>Teacher</Link>
        </Button>
      </div>
    </div>
  );
}
