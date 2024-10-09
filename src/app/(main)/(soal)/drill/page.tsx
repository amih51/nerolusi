import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="items-center justify-center flex">
      Pilih Subtes
      <ul>
        <li>
          <Button asChild>
            <Link href={`/drill/PU`}>PU</Link>
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link href={`/drill/PBM`}>PBM</Link>
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link href={`/drill/LB`}>LB</Link>
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link href={`/drill/PPU`}>PPU</Link>
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link href={`/drill/PK`}>PK</Link>
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link href={`/drill/PM`}>PM</Link>
          </Button>
        </li>
      </ul>
    </div>
  );
}
