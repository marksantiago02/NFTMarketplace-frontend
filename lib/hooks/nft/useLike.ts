import { useState } from "react";

import { postServer } from "@/lib/net/fetch/fetch";

export default function useLike() {
  const [isLiked, setLiked] = useState(false);

  const likeNFT = async (id: string, address: string) => {
    const res = await postServer(`/nft/${id}/like`, {
      address,
    });

    if (res.success) setLiked(true);
  };

  return {
    likeNFT,
    isLiked,
    setLiked,
  };
}
