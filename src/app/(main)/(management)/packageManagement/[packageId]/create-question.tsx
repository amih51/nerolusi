"use client";

import "./styles.css";
import "katex/dist/katex.min.css";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import MathExtension from "@aarkue/tiptap-math-extension";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import { Button } from "~/app/_components/ui/button";
import { api } from "~/trpc/react";
import { UploadButton } from "~/utils/uploadthing";
import { useEffect, useState } from "react";
import Image from "next/image";
import { type question } from "~/server/db/schema";

const lowlight = createLowlight(all);

export default function CreateQuestion({ data }: { data: question }) {
  const addQuestionApi = api.question.addQuestion.useMutation();
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    data.imageUrl ?? undefined,
  );
  const [answers, setAnswers] = useState<{ id: string; content: string }[]>([
    { id: crypto.randomUUID(), content: "" },
  ]);
  const [correctAnswerId, setCorrectAnswerId] = useState<string>("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      MathExtension,
      Underline,
      Subscript,
      Superscript,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({ multicolor: true }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: "",
    editable: true,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (data) {
      editor?.commands.setContent(data.content);
    }
  }, [data, editor]);

  const handleAddAnswer = () => {
    setAnswers([...answers, { id: crypto.randomUUID(), content: "" }]);
  };

  const handleAnswerChange = (id: string, content: string) => {
    setAnswers((prev) =>
      prev.map((answer) =>
        answer.id === id ? { ...answer, content } : answer,
      ),
    );
  };

  const handleSave = async () => {
    try {
      const response = await addQuestionApi.mutateAsync({
        index: data.index,
        content: editor?.getHTML() ?? "",
        imageUrl: imageUrl,
        subtest: data.subtest,
        type: "mulChoice",
        score: 10,
        correctAnswerId: correctAnswerId,
        packageId: data.packageId,
      });
      console.log("Question saved:", response);
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
        className="border"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          if (res?.[0]?.url) {
            setImageUrl(res[0].url);
          }
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Uploaded"
          className="mt-2"
          width={500}
          height={300}
        />
      )}

      <h3>Answers</h3>
      {answers.map((answer) => (
        <div key={answer.id} className="mt-2 flex items-center">
          <input
            type="text"
            value={answer.content}
            onChange={(e) => handleAnswerChange(answer.id, e.target.value)}
            placeholder="Answer option"
            className="w-full border p-1"
          />
          <Button
            variant="outline"
            onClick={() => setCorrectAnswerId(answer.id)}
            className={`ml-2 ${correctAnswerId === answer.id ? "bg-blue-500 text-white" : ""}`}
          >
            {correctAnswerId === answer.id ? "Correct" : "Set Correct"}
          </Button>
        </div>
      ))}
      <Button type="button" onClick={handleAddAnswer} className="mt-2">
        Add Answer
      </Button>

      <Button
        onClick={handleSave}
        disabled={
          !editor?.getText().trim() ||
          !correctAnswerId ||
          answers.some((answer) => !answer.content.trim())
        }
        variant={"outline"}
      >
        Save
      </Button>
    </div>
  );
}
