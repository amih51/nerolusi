import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center border items-center gap-6">
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
  );
}
