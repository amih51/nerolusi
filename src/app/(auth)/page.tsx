import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="size-fit bg-card border rounded-[1rem] p-6 flex flex-col justify-center items-center gap-3">
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
