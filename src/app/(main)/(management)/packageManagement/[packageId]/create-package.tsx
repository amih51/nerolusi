"use client";

import { useState } from "react";
import { Button } from "~/app/_components/ui/button";
import { api } from "~/trpc/react";

const subtestOptions = ["pk", "pu", "ppu", "pbm", "lb", "pm"] as const;
const pkgTypeOptions = ["tryout", "drill"] as const;

export default function CreatePackage() {
  const [name, setName] = useState("");
  const [type, setType] = useState<(typeof pkgTypeOptions)[number]>(
    pkgTypeOptions[0],
  );
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [classId, setClassId] = useState<number | undefined>(undefined);
  const [subtest, setSubtest] = useState<string>(subtestOptions[0]);

  const createPackageApi = api.package.createPackage.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPackageApi.mutateAsync({
      name,
      type,
      start: start ? new Date(start) : undefined,
      end: end ? new Date(end) : undefined,
      duration,
      classId,
    });

    setName("");
    setType(pkgTypeOptions[0]);
    setStart("");
    setEnd("");
    setDuration("");
    setClassId(undefined);
    setSubtest(subtestOptions[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <h2>Create Package</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Package Name"
        required
        className="border p-2"
      />
      <select
        value={type}
        onChange={(e) =>
          setType(e.target.value as (typeof pkgTypeOptions)[number])
        }
        className="border p-2"
      >
        {pkgTypeOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <input
        type="datetime-local"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        className="border p-2"
      />
      <input
        type="datetime-local"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        className="border p-2"
      />
      <input
        type="text"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duration (e.g., HH:MM)"
        className="border p-2"
      />
      <input
        type="number"
        value={classId ?? ""}
        onChange={(e) => setClassId(Number(e.target.value))}
        placeholder="Class ID"
        className="border p-2"
      />
      <select
        value={subtest}
        onChange={(e) => setSubtest(e.target.value)}
        className="border p-2"
      >
        {subtestOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Button type="submit" variant={"outline"}>
        Create Package
      </Button>
    </form>
  );
}
