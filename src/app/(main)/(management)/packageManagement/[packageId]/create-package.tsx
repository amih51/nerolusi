"use client";

import { useEffect, useState } from "react";
import { Button } from "~/app/_components/ui/button";
import { api } from "~/trpc/react";
import CreateQuestion from "./create-question";
import { type question } from "~/server/db/schema";

export default function CreatePackage({ packageId }: { packageId: string }) {
  const [name, setName] = useState<string | undefined>("");
  const [type, setType] = useState<"tryout" | "drill" | undefined>(undefined);
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [duration, setDuration] = useState<string | null | undefined>("");
  const [classId, setClassId] = useState<number | null | undefined>(null);
  const [subtest, setSubtest] = useState<
    "pk" | "pu" | "ppu" | "pbm" | "lb" | "pm"
  >("pk");
  const [questions, setQuestions] = useState<question[]>([]);

  const createPackageApi = api.package.addPackage.useMutation();
  const createQuestionApi = api.question.addQuestion.useMutation();
  const { data, isLoading } = api.package.getOnePackage.useQuery(
    { packageId },
    {
      enabled: !!packageId,
    },
  );

  useEffect(() => {
    if (data) {
      setName(data.name);
      setType(data.type);
      setStart(data.TOstart ? data.TOstart.toISOString().slice(0, 16) : "");
      setEnd(data.TOend ? data.TOend.toISOString().slice(0, 16) : "");
      setDuration(data.TOduration);
      setClassId(data.classId);
      setQuestions(data.questions);
    }
  }, [data]);

  const addQuestion = async () => {
    const newQuestion = {
      packageId: Number(packageId),
      type: "mulChoice" as "essay" | "mulChoice",
      subtest: subtest,
      id: crypto.randomUUID(),
      index: (data?.questions.length ?? 0) + 1,
      content: "",
      imageUrl: null,
      score: null,
      explanation: null,
      correctAnswerId: null,
      createdAt: new Date(),
    };

    // Update local state
    setQuestions((prev) => [...prev, newQuestion]);

    // Send to the API
    await createQuestionApi.mutateAsync(newQuestion);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPackageApi.mutateAsync({
      name: name ?? "",
      type: type ?? "tryout",
      start: start ? new Date(start) : undefined,
      end: end ? new Date(end) : undefined,
      duration: duration ?? "",
      classId: classId ?? undefined,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const pkgTypeOptions: ("tryout" | "drill")[] = ["tryout", "drill"];
  const subtestOptions: string[] = ["pk", "pu", "ppu", "pbm", "lb", "pm"];

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
          setType(e.target.value as "tryout" | "drill" | undefined)
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
        value={duration ?? ""}
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
        onChange={(e) =>
          setSubtest(
            e.target.value as "pk" | "pu" | "ppu" | "pbm" | "lb" | "pm",
          )
        }
        className="border p-2"
      >
        {subtestOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {questions.map((question) => (
        <CreateQuestion key={question.id} data={question} />
      ))}
      <Button type="button" onClick={addQuestion} variant={"outline"}>
        + Add Question
      </Button>
      <Button type="submit" variant={"outline"}>
        Create Package
      </Button>
    </form>
  );
}
