import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>Soal UTBK</div>
      <div>waktu: 3 jam </div>
      <Button asChild>
        <Link href={"/TO/1"}>Start</Link>
      </Button>
    </div>
  );
}
