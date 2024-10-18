"use client";
import { UploadButton } from "~/utils/uploadthing";

export default function Page() {
  return (
    <div className="flex size-full items-center justify-center">
      <UploadButton
        className="border"
        endpoint="fileUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}
