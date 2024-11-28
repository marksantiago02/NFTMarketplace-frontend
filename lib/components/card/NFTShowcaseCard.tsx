"use client";
import { Card, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState, type FC } from "react";

type Props = {
  asset: string;
  avatar?: string;
  nftName?: string;
  nftOwner?: string;
  price?: string;
  hash?: string;
};

const NFTShowcaseCard: FC<Props> = ({ asset, hash }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="flex justify-center items-center border-none p-2 bg-white/5 "
    >
      <Image
        alt="Woman listing to music"
        src={asset}
        isZoomed
        className="hover:cursor-pointer"
        onClick={() => router.push(`/nft/${hash}`)}
        onLoad={() => setLoading(true)}
      />
    </Card>
  );
};

export default NFTShowcaseCard;
