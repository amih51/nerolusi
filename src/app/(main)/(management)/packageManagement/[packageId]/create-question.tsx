"use client";

import "./styles.css";
import "katex/dist/katex.min.css";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "~/app/_components/ui/button";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { type question } from "~/server/db/schema";
import { UploadButton } from "~/utils/uploadthing";
import AnswerEditor from "./create-answer";

export default function CreateQuestion({ data }: { data: question }) {
  const addQuestionApi = api.question.addQuestion.useMutation();
  const getAnswersApi = api.answer.getAnswer.useQuery({ questionId: data.id });
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    data.imageUrl ?? undefined,
  );

  const editor = useEditor({
    extensions: [StarterKit],
    content: data.content ?? "",
    editable: true,
    immediatelyRender: false,
  });

  useEffect(() => {
    // Jika Anda perlu memuat data pertanyaan saat pertama kali
    if (getAnswersApi.data) {
      // Anda bisa melakukan sesuatu dengan data ini jika perlu
    }
  }, [getAnswersApi.data]);

  const handleSave = async () => {
    try {
      await addQuestionApi.mutateAsync({
        index: data.index,
        content: editor?.getHTML() ?? "",
        imageUrl: imageUrl,
        subtest: data.subtest,
        type: "mulChoice",
        score: 10,
        correctAnswerId: data.correctAnswerId ?? undefined,
        packageId: data.packageId,
      });
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  return (
    <div className="group/del flex flex-col border-t py-4 sm:border-l-0">
      <h2>Question {data.index}</h2>
      <EditorContent
        editor={editor}
        className="max-h-[50vh] min-h-16 border p-2"
      />
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => setImageUrl(res?.[0]?.url)}
        onUploadError={(error) => alert(`ERROR! ${error.message}`)}
      />
      {imageUrl && (
        <Image src={imageUrl} alt="Uploaded" width={500} height={300} />
      )}

      <AnswerEditor
        questionId={data.id}
        correctId={data.correctAnswerId ?? ""}
      />

      <Button onClick={handleSave} disabled={!editor?.getText().trim()}>
        Save
      </Button>
    </div>
  );
}
