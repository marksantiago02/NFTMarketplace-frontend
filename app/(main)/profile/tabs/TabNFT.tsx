"use client";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Image } from "@nextui-org/react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";

import { postServer } from "@/lib/net/fetch/fetch";

export type NFTData = {
  token_id: number;
  token_name: string;
  metadata_hash: string;
  owner: string;
  creator: string;
  asset_url: string;
  asset_hash: string;
  prompt: string;
};

const TabNFT = ({
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
  //const router = useRouter();
  const { address, isConnected } = useAccount();
  const [myNFTs, setMyNFTs] = useState<NFTData[]>([]);

  const fetchMyNFTs = useCallback(async () => {
    try {
      const res = await postServer("/nft/myNFTs", { address });
      setMyNFTs(res);
    } catch (err) {
      console.log(err);
    }
  }, [address]);

  useEffect(() => {
    if (address && isConnected) {
      fetchMyNFTs();
    }
  }, [address, isConnected]);

  const handleClick = (id: number) => {
    setModalType("list");
    setSelected(myNFTs.find((nft) => nft.token_id === id));
    open();
  };

  return (
    <div className="flex flex-wrap">
      <Box sx={{ width: "100%", overflowY: "none" }}>
        <ImageList variant="masonry" cols={cols} gap={10}>
          {myNFTs.map((nft, index) => {
            return (
              <Image
                key={nft.token_id}
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${nft.asset_url}`}
                isZoomed
                alt={`NFT ${index}`}
                className="py-1 rounded-lg hover:cursor-pointer"
                onClick={
                  //() => router.push(`/nft/${nft.asset_hash}`)
                  () => handleClick(nft.token_id)
                }
              />
            );
          })}
        </ImageList>
      </Box>
    </div>
  );
};

export default TabNFT;
