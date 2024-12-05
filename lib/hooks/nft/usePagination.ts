import { useEffect, useState } from "react";

import { fetchServer } from "@/lib/net/fetch/fetch";

import type { CommentType } from "@/lib/components/card/NFTViewCard";

export default function usePagination(id: string, curPage: number) {
  const [data, setData] = useState<CommentType[]>([]);
  const [totalCnt, setTotalCnt] = useState(0);

  const fetchData = async () => {
    try {
      const res = await fetchServer(
        `/nft/${id}/comments?page=${curPage}&limit=8`
      );

      setData(res.comments);
      setTotalCnt(res.totalCount);
    } catch (err) {
      console.log("Pagination error", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [curPage]);

  const maxPage = Math.ceil(totalCnt / 8);

  return {
    totalCnt,
    maxPage,
    data,
    fetchData,
  };
}
