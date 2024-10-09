import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="items-center justify-center flex">
      Pilih Subtes
      <ul>
        <li>
          <Button asChild>
            <Link href={`/drill/PU`}></Link>
            PU
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link href={`/drill/PBM`}></Link>
            PBM
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link href={`/drill/LB`}></Link>
            LB
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link href={`/drill/PPU`}></Link>
            PPU
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link href={`/drill/PK`}></Link>
            PK
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link href={`/drill/PM`}></Link>
            PM
          </Button>
        </li>
      </ul>
    </div>
  );
}
