import Link from "next/link";
import { Button } from "~/app/_components/ui/button";

export default function Page() {
  return (
    <div className="flex items-center justify-center">
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
