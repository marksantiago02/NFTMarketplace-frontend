"use client";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Button, Image, Input } from "@nextui-org/react";

import { fetchServer, postServer } from "@/lib/net/fetch/fetch";
import useNFTMint from "@/lib/web3/hook/nft/useNFTMint";
import useToast from "@/lib/hooks/toast/useToast";
import PromptAccordion from "@/lib/components/accordion/PromptAccordion";
import ReactButton from "@/lib/components/button/ReactButton";
import PrimaryButton from "@/lib/components/button/PrimaryButton";
import { shortenAddress } from "@/lib/components/profile/profile-kit/ProfileHeader";

type DetailedArtworkData = {
  image_name: string;
  image_owner: string;
  image_prompt: string;
  created_date: string;
};

export default function ArtworkDetailView({
  params,
}: {
  params: { slug: string };
}) {
  const hash = params.slug;

  const [detailedArtworkData, setDetailedArtworkData] =
    useState<DetailedArtworkData | null>();
  const [nftName, setNftName] = useState("");
  const [royalty, setRoyalty] = useState(0);

  const { isMintLoading, isMintSuccess, mintNFT } = useNFTMint();
  const customToast = useToast();
  const { address } = useAccount();

  const detailedData = useCallback(async () => {
    try {
      const res = await fetchServer(`/artwork/${hash}`);
      setDetailedArtworkData(res[0]);
    } catch (err) {}
  }, [params.slug]);

  useEffect(() => {
    detailedData();
  }, []);

  useEffect(() => {
    if (isMintSuccess) {
      customToast("success", "Successfully minted your NFT");
    }
  }, [isMintSuccess]);

  const mintNow = async () => {
    if (nftName === "") {
      customToast("failed", "Insert NFT name");
      return;
    }

    try {
      const res = await postServer("/nft/mintbyartwork", {
        address: address as string,
        name: nftName,
        url: detailedArtworkData?.image_name,
      });

      if (res.success === true) {
        const { metadataURL, assetURL } = res;

        console.log(metadataURL);
        try {
          const tx = await mintNFT(metadataURL, royalty);

          if (tx) {
            setTimeout(async () => {
              if (tx) {
                const response = await postServer("/nft/save", {
                  tx,
                  assetURL,
                  prompt: detailedArtworkData?.image_prompt,
                });
              }
            }, 30000);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="main-pt">
      <div className="max-w-[1024px] mx-auto px-4">
        <h2 className="mt-10">_</h2>
        <div className="my-4 flex justify-between">
          <div>
            <div>
              Created by{" "}
              {detailedArtworkData &&
                shortenAddress(detailedArtworkData?.image_owner as string)}
            </div>
            <div>{detailedArtworkData?.created_date}</div>
          </div>
          <div className="flex gap-3 lg:gap-6">
            <ReactButton type="fire" value={3767} />
            <ReactButton type="like" value={0} />
          </div>
        </div>

        <div className="flex justify-center">
          {detailedArtworkData ? (
            <Image
              className="max-h-[700px] lg:min-h-[400px] lg:min-w-[400px]"
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${detailedArtworkData?.image_name}`}
              isLoading={detailedArtworkData === null ? true : false}
              alt="Not Found"
            />
          ) : (
            <div className="loader w-[200px] h-[200px]"></div>
          )}
        </div>

        <div className="mt-6">
          <PromptAccordion text={detailedArtworkData?.image_prompt || ""} />
        </div>

        <div className="mt-6 flex gap-3">
          <Input
            type="number"
            min={0}
            placeholder="Royalty"
            value={royalty.toString()}
            onChange={(e) => setRoyalty(parseInt(e.target.value))}
            classNames={{
              inputWrapper: "w-full h-full bg-white/10 py-2 rounded-md",
              input: "text-lg",
              base: "max-w-[200px]",
            }}
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">%</span>
              </div>
            }
          />
          <Input
            classNames={{
              inputWrapper: "w-full h-full bg-white/10 py-2",
              input: "text-lg",
            }}
            placeholder="Insert NFT Name"
            value={nftName}
            onChange={(e) => setNftName(e.target.value)}
            endContent={
              <PrimaryButton
                onClick={mintNow}
                text="Mint Now"
                isLoading={isMintLoading}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}
