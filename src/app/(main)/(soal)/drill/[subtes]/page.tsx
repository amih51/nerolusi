import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page({
  params: { subtes },
}: {
  params: { subtes: string };
}) {
  return (
    <div className="items-center justify-center flex flex-col gap-3">
      Subtes {`${subtes}`} <br />
      pilih paket:
      <ul className="gap-3 flex flex-wrap">
        <li>
          <Button asChild>
            <Link href={`/drill/${subtes}/1`}>1</Link>
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link href={`/drill/${subtes}/2`}>2</Link>
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link href={`/drill/${subtes}/3`}>3</Link>
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link href={`/drill/${subtes}/4`}>4</Link>
          </Button>
        </li>
      </ul>
    </div>
  );
}
