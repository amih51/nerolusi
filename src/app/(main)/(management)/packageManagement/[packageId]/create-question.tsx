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
import { useState } from "react";
const lowlight = createLowlight(all);

export default function CreateQuestion({
  packageId,
  index,
  subtest,
}: {
  packageId: string;
  index: string;
  subtest: "pk" | "pu" | "ppu" | "pbm" | "lb" | "pm";
}) {
  const addQuestionApi = api.question.addQuestion.useMutation();
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
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

  return (
    <div className="group/del flex flex-col border-t py-4 sm:border-l-0">
      {packageId}
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
            alert("Upload Completed");
          }
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      <Button
        onClick={() => {
          addQuestionApi.mutate({
            index: +index,
            content: editor?.getHTML() ?? "",
            imageUrl: imageUrl,
            subtest: subtest,
            type: "mulChoice",
            score: 10,
            correctAnswerId: "1",
            packageId: +packageId,
          });
        }}
        disabled={!editor?.getText().trim()}
        variant={"outline"}
      >
        Submit
      </Button>
    </div>
  );
}
