"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Image } from "@nextui-org/react";
import { useAccount } from "wagmi";
import { Box, ImageList } from "@mui/material";

import { postServer } from "@/lib/net/fetch/fetch";

type ArtworkData = {
  image_id: number;
  image_name: string;
  image_owner: string;
  image_hash: string;
};

const TabArtwork = ({ cols }: { cols: number }) => {
  const router = useRouter();
  const { address } = useAccount();
  const [artworks, setArtworks] = useState<ArtworkData[]>([]);

  const fetchArtworks = useCallback(async () => {
    try {
      const res = await postServer("/artwork/fetch", { address });
      setArtworks(res);
    } catch (err) {
      console.log(err);
    }
  }, [address]);

  useEffect(() => {
    fetchArtworks();
  }, [address]);

  return (
    <div className="flex flex-wrap">
      <Box sx={{ width: "100%", overflowY: "none" }}>
        <ImageList variant="masonry" cols={cols} gap={10}>
          {artworks.map((artwork, index) => {
            return (
              <Image
                key={index}
                className="py-1"
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${artwork.image_name}`}
                loading="lazy"
                alt="Your Artwork"
                onClick={() => router.push(`/artwork/${artwork.image_hash}`)}
              />
            );
          })}
        </ImageList>
      </Box>
    </div>
  );
};

export default TabArtwork;
