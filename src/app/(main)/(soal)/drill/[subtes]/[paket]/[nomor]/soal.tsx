"use client";

import Image from "next/image";
import { api } from "~/trpc/react";

export function Soal() {
  const {
    data: soal,
    error,
    isLoading,
  } = api.question.getOneQuestions.useQuery({
    id: "789e262a-0f32-4b9e-9726-cf29258e456c",
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading question: {error.message}</p>;
  }

  return (
    <div className="w-full max-w-xs border">
      {soal ? (
        <p className="truncate">
          Content: {soal.content} <br />
          {soal.imageUrl && (
            <Image src={soal.imageUrl} width={200} height={300} alt="soal" />
          )}
          Score: {soal.score}{" "}
        </p>
      ) : (
        <p>You have no soals yet.</p>
      )}
    </div>
  );
}
