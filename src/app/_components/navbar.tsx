"use client";

import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { cn } from "~/lib/utils";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const soals: { title: string; href: string; description: string }[] = [
  {
    title: "Kemampuan Penalaran Umum",
    href: "/drill/PU",
    description:
      "Mengukur kemampuan berpikir logis, analitis, dan sistematis dalam menyelesaikan masalah.",
  },
  {
    title: "Pengetahuan dan Pemahaman Umum",
    href: "/drill/PPU",
    description:
      "Menilai wawasan dan pengetahuan umum serta pemahaman mengenai berbagai isu terkini.",
  },
  {
    title: "Kemampuan Memahami Bacaan dan Menulis",
    href: "/drill/PBM",
    description:
      "Mengukur kemampuan dalam memahami teks bacaan dan menyusun tulisan dengan baik dan benar.",
  },
  {
    title: "Pengetahuan Kuantitatif",
    href: "/drill/PK",
    description:
      "Menilai kemampuan mengaplikasikan konsep matematika dasar dalam kehidupan sehari-hari.",
  },
  {
    title: "Literasi Bahasa Indonesia dan Bahasa Inggris",
    href: "/drill/LB",
    description:
      "Mengukur kemampuan memahami teks dan konteks dalam Bahasa Indonesia dan Bahasa Inggris.",
  },
  {
    title: "Penalaran Matematika",
    href: "/drill/PM",
    description:
      "Mengukur kemampuan penalaran matematis dalam menyelesaikan masalah yang lebih kompleks.",
  },
];

export default function Navbar() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <div className="sticky left-0 top-0 flex h-10 w-screen items-center gap-3 border-b p-6 px-12">
      <Link href={"/"}>
        <Image
          src={"/logo.png"}
          alt={"logo nerolusi"}
          width={"36"}
          height={"36"}
          className="mr-6"
        ></Image>
      </Link>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Link href={"/drill"}>Drilling Soal</Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {soals.map((soal) => (
                  <ListItem
                    key={soal.title}
                    title={soal.title}
                    href={soal.href}
                  >
                    {soal.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/tryout" legacyBehavior passHref>
              <Button variant={"ghost"}>Try Out</Button>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {user?.role == "admin" && (
        <Button variant={"outline"} asChild>
          <Link href={"/"}>Manajemen Akun</Link>
        </Button>
      )}
      {(user?.role == "admin" || user?.role == "/teacher") && (
        <Button variant={"outline"} asChild>
          <Link href={"/"}>Manajemen Soal</Link>
        </Button>
      )}
      <ModeToggle />
      {!user ? (
        <Button
          variant={"ghost"}
          onClick={() => signIn("google")}
          className="border"
        >
          Sign In
        </Button>
      ) : (
        <Button variant={"ghost"} onClick={() => signOut()} className="border">
          Sign Out
        </Button>
      )}
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
