import { useState } from "react";
import { postServer } from "@/lib/net/fetch/fetch";

const useSaveImage = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState<"success" | "failed" | "">("");

  const saveImage = async (address: string, url: string, prompt: string) => {
    try {
      setIsSaving(true);

      const response = await postServer("/artwork/save", {
        address,
        url,
        prompt,
      });

      setIsSaving(false);
      if (response?.success === true) {
        setIsSaved("success");
      } else if (response?.success === false) {
        setIsSaved("failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    isSaving,
    isSaved,
    setIsSaved,
    saveImage,
  };
};

export default useSaveImage;
