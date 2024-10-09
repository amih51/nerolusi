import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page({
  params: { paket, nomor },
}: {
  params: { paket: string; nomor: string };
}) {
  return (
    <div className="w-full flex m-6">
      <div className="w-full">
        Soal tryout paket {`${paket}`} nomor {`${nomor}`}
      </div>
      <div className="w-1/4 flex">
        <ul className="flex gap-3 flex-auto">
          <li>
            <Button asChild>
              <Link href={`/tryout/${paket}/1`}>1</Link>
            </Button>
          </li>
          <li>
            <Button asChild>
              <Link href={`/tryout/${paket}/2`}>2</Link>
            </Button>
          </li>
          <li>
            <Button asChild>
              <Link href={`/tryout/${paket}/3`}>3</Link>
            </Button>
          </li>
          <li>
            <Button asChild>
              <Link href={`/tryout/${paket}/4`}>4</Link>
            </Button>
          </li>
          <li>
            <Button asChild>
              <Link href={`/tryout/${paket}/5`}>5</Link>
            </Button>
          </li>
          <li>
            <Button asChild>
              <Link href={`/tryout/${paket}/6`}>6</Link>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
