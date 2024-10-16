"use client";
import { UploadButton } from "~/utils/uploadthing";

export default function Page() {
  return (
    <div className="flex size-full items-center justify-center">
      <UploadButton
        className="border"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}
