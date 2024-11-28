"use client";
import { ChangeEvent, useRef, useState } from "react";

export default function ImageUploader() {
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null); // Changed the type of preview to string | null

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string); // Cast the result to string
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div
      onClick={() => {
        uploadInputRef.current && uploadInputRef.current.click();
      }}
      className={` max-w-sm p-2 py-4 mb-4 ${preview ? "" : "bg-[#252840]"
        } rounded-lg items-center mx-auto text-center cursor-pointer`}
    >
      <input
        id="upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={onFileChange}
        ref={uploadInputRef}
      />
      {preview ? (
        <img
          src={preview}
          className="max-h-48 rounded-lg mx-auto bg-[#252840]"
          alt="Image preview"
        />
      ) : (
        <>
          <label htmlFor="upload" className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-gray-700 mx-auto mb-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <h5 className="text-lg font-bold tracking-tight text-[#204F71]">
              Upload picture
            </h5>
            <b className="text-sm text-[#204F71]">
              click on drag an image to upload here
            </b>
            <span
              id="filename"
              className="text-gray-500 bg-gray-200 z-50"
            ></span>
          </label>
          <span id="filename" className="text-gray-500 bg-gray-200 z-50">
            {file ? file.name : ""}
          </span>
        </>
      )}
    </div>
  );
}