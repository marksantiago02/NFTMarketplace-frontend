"use client";
import { useCallback, useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import { useAccount } from "wagmi";
import { Box, ImageList } from "@mui/material";

import { postServer } from "@/lib/net/fetch/fetch";
import type { NFTData } from "./TabNFT";

const TabListed = ({
  cols,
  setModalType,
  setSelected,
  open,
}: {
  cols: number;
  setModalType: (type: "list" | "delist") => void;
  setSelected: (type: NFTData | undefined) => void;
  open: () => void;
}) => {
  const { address, isConnected } = useAccount();

  const [listed, setListed] = useState<NFTData[]>([]);

  const fetchListed = useCallback(async () => {
    try {
      const res = await postServer("/nft/listed", { address });

      setListed(res);
    } catch (err) {
      console.log(err);
    }
  }, [address]);

  useEffect(() => {
    if (address && isConnected) {
      fetchListed();
    }
  }, [address, isConnected]);

  const handleDelist = async (id: number) => {
    setModalType("delist");
    setSelected(listed.find((nft) => nft.token_id === id));
    open();
  };

  return (
    <div className="flex flex-wrap">
      <Box sx={{ width: "100%", overflowY: "none" }}>
        <ImageList variant="masonry" cols={cols} gap={10}>
          {listed.map((nft, index) => {
            return (
              <Image
                key={nft.token_id}
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${nft.asset_url}`}
                isZoomed
                alt={`NFT ${index}`}
                className="py-1 rounded-lg hover:cursor-pointer"
                onClick={
                  //() => router.push(`/nft/${nft.asset_hash}`)
                  () => handleDelist(nft.token_id)
                }
              />
            );
          })}
        </ImageList>
      </Box>
    </div>
  );
};

export default TabListed;
