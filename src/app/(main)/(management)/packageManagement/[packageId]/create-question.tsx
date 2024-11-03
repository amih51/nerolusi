"use client";

import "./styles.css";
import "katex/dist/katex.min.css";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { api } from "~/trpc/react";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { type question } from "~/server/db/schema";
import { UploadButton } from "~/utils/uploadthing";
import AnswerEditor from "./create-answer";

export default function CreateQuestion({ data }: { data: question }) {
  const addQuestionApi = api.question.addQuestion.useMutation();
  const updateQuestionApi = api.question.updateQuestion.useMutation();
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

  const previousContentRef = useRef(data.content); // Store the previous content

  useEffect(() => {
    // This effect will run when the editor's content changes
    const handleContentChange = async () => {
      const currentContent = editor?.getHTML();

      // Only save if the content has changed
      if (currentContent !== previousContentRef.current) {
        const questionData = {
          index: data.index,
          content: currentContent ?? "",
          imageUrl: imageUrl,
          subtest: data.subtest,
          type: "mulChoice" as "essay" | "mulChoice",
          score: 10,
          correctAnswerId: data.correctAnswerId ?? undefined,
          packageId: data.packageId,
        };

        try {
          if (data.id) {
            await updateQuestionApi.mutateAsync({
              id: data.id,
              ...questionData,
            });
          } else {
            await addQuestionApi.mutateAsync(questionData);
          }
          previousContentRef.current = currentContent ?? ""; // Update the ref with the new content
        } catch (error) {
          console.error("Error auto-saving question:", error);
        }
      }
    };

    if (editor) {
      // Subscribe to the update event
      editor.on("update", handleContentChange);
    }

    return () => {
      // Cleanup listener on component unmount
      if (editor) {
        editor.off("update", handleContentChange);
      }
    };
  }, [editor, data, imageUrl, addQuestionApi, updateQuestionApi]); // Dependency array

  useEffect(() => {
    if (getAnswersApi.data) {
      // Handle answer data if needed
    }
  }, [getAnswersApi.data]);

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
    </div>
  );
}
