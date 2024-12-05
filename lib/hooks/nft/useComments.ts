import { useState } from "react";

import { postServer } from "@/lib/net/fetch/fetch";

export default function useComments() {
  const [isCommentSuccess, setCommentSuccess] = useState(false);

  const createComments = async (
    id: string,
    creator: string,
    contents: string
  ) => {
    try {
      const res = await postServer(`/nft/${id}/comments`, {
        creator,
        contents,
      });

      if (res.success == true) setCommentSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    isCommentSuccess,
    setCommentSuccess,
    createComments,
  };
}
