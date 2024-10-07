"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="h-screen sticky left-0 top-0 w-fit p-6 flex flex-col bg-primary items-center">
      <Link href={"/"}>
        <Image
          src={"/logo.png"}
          alt={"logo nerolusi"}
          width={"50"}
          height={"50"}
        ></Image>
      </Link>
      <Button variant={"ghost"} asChild>
        <Link href={"/"}>Profile</Link>
      </Button>
      {pathname == "/admin" && (
        <Button variant={"ghost"} asChild>
          <Link href={"/"}>Manajemen Akun</Link>
        </Button>
      )}
      {(pathname == "/admin" || pathname == "/teacher") && (
        <Button variant={"ghost"} asChild>
          <Link href={"/"}>Manajemen Soal</Link>
        </Button>
      )}
      {(pathname == "/student" || pathname == "/teacher") && (
        <Button variant={"ghost"} asChild>
          <Link href={"/"}>Try Out</Link>
        </Button>
      )}
      {(pathname == "/student" || pathname == "/teacher") && (
        <Button variant={"ghost"} asChild>
          <Link href={"/"}>Leaderboard</Link>
        </Button>
      )}
    </div>
  );
}
