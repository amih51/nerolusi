"use client";

import "./editor/styles.css";

// import { PostData } from "@/lib/types";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import MathExtension from "@aarkue/tiptap-math-extension";
// import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
// import { all, createLowlight } from "lowlight";
// import { useSession } from "next-auth/react";
// const lowlight = createLowlight(all);

export default function DisplayPost({ soal }: { soal: DataSoal }) {
  //   const session = useSession();
  const editor = useEditor({
    extensions: [
      StarterKit,
      MathExtension,
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({ multicolor: true }),
      //   CodeBlockLowlight.configure({
      //     lowlight,
      //   }),
    ],
    content: soal.content,
    editable: false,
    immediatelyRender: false,
  });

  return (
    <div className="group/del flex flex-col border-t py-4 sm:border-l-0">
      <EditorContent
        editor={editor}
        className="max-h-[50vh] min-h-16 overflow-scroll p-2 scrollbar scrollbar-thumb-current scrollbar-w-1 hover:scrollbar-thumb-foreground/50"
      ></EditorContent>
    </div>
  );
}
