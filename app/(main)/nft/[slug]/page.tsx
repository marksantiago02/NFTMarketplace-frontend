"use client";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  Button,
  Image,
  Input,
  Accordion,
  AccordionItem,
  Pagination,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

import MultiCarousel from "@/lib/components/carousel/MultiCarousel";
import PrimaryButton from "@/lib/components/button/PrimaryButton";
import NFTDetails from "@/app/(main)/explore/NFTDetails.json";
import FireIcon from "@/public/icon/fire.svg";
import LikeIcon from "@/public/icon/like.svg";
import FollowIcon from "@/public/icon/follow.svg";
import { shortenAddress } from "@/lib/components/profile/profile-kit/ProfileHeader";
import { fetchServer, postServer } from "@/lib/net/fetch/fetch";

import useToast from "@/lib/hooks/toast/useToast";
import useComments from "@/lib/hooks/nft/useComments";
import useLike from "@/lib/hooks/nft/useLike";
import useNFTBuy from "@/lib/web3/hook/nft/useNFTBuy";
import usePagination from "@/lib/hooks/nft/usePagination";

type DetailedNFTData = {
  token_name?: string;
  token_id?: number;
  creator?: string;
  owner?: string;
  asset_url?: string;
  prompt?: string;
  created_date?: string;
  likes?: number;
  price?: number;
  royalty?: number;
};

const CommentCard = ({
  creator,
  comment,
}: {
  creator: string;
  comment: string;
}) => {
  return (
    <div className="flex items-center gap-4 py-4 border-b-1 border-gray-700/30">
      <img
        className="w-8 h-8 lg:w-12 lg:h-12"
        src="/asset/avatar.png"
        alt="Not Found"
      />
      <div>
        <p className="font-small">{shortenAddress(creator)}</p>
        <p className="small-font mt-2">{comment}</p>
      </div>
    </div>
  );
};

const PaginationComments = ({
  hash,
  address,
}: {
  hash: string;
  address: string;
}) => {
  const [page, setPage] = useState<number>(1);
  const [commentText, setCommentText] = useState("");

  const { data, maxPage, totalCnt, fetchData } = usePagination(hash, page);
  const { createComments } = useComments();

  const handleComment = async () => {
    await createComments(hash, address as string, commentText);
    fetchData();
    setCommentText("");
  };

  return (
    <div className="mt-10">
      <h2>Comment</h2>
      <p>Write your comment for this NFT:</p>
      <div className="mt-6">
        <Input
          aria-label="Search"
          classNames={{
            inputWrapper: "w-full h-full p-2 bg-white/10",
          }}
          labelPlacement="outside"
          placeholder="Share your thoughts"
          radius="sm"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          startContent={
            <img className="w-8" src="/asset/avatar.png" alt="Not Found" />
          }
          endContent={
            <Button
              className="bg-light-blue text-dark-blue font-semibold"
              onClick={handleComment}
            >
              Send
            </Button>
          }
        />
      </div>
      <div className="mt-6">
        {data &&
          data?.map((comment, index) => {
            return (
              <CommentCard
                key={index}
                creator={comment.creator}
                comment={comment.contents}
              />
            );
          })}
      </div>
      <div className="flex justify-between items-center py-3">
        <span>
          {totalCnt === 0 ? "No comment" : `Show List ${page} of ${totalCnt}`}
        </span>
        <div>
          <Pagination
            isCompact
            showControls
            showShadow
            variant="light"
            className="text-dark-blue"
            page={page}
            total={maxPage}
            onChange={(page: number) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default function NFTDetailView({
  params,
}: {
  params: { slug: string };
}) {
  const hash = params.slug;

  const [detailedNFTData, setDetailedNFTData] =
    useState<DetailedNFTData | null>();
  const [selectedNFT, setSelectedNFT] = useState(-1);

  const { address } = useAccount();
  const customToast = useToast();
  const { likeNFT } = useLike();
  const { isBuyNFTLoading, isBuyNFTPending, isBuyNFTSuccess, buyNFT } =
    useNFTBuy();

  const fetchDetailedData = useCallback(async () => {
    try {
      const res: DetailedNFTData = await fetchServer(`/nft/${hash}`);
      setDetailedNFTData(res);
    } catch (err) {
      console.log(err);
    }
  }, [params.slug]);

  useEffect(() => {
    fetchDetailedData();
  }, [params.slug]);

  useEffect(() => {
    if (isBuyNFTSuccess) {
      customToast("success", "Successfully Buy NFT");
    }
  }, [isBuyNFTSuccess]);

  // const handleApprove = async () => {
  //   if (detailedNFTData?.token_id !== undefined) {
  //     const approveRes = await approveNFT(detailedNFTData?.token_id);
  //   } else {
  //     customToast("failed", "NFT is not available");
  //     return;
  //   }
  // };

  const handlePurchase = async () => {
    try {
      const tx = await buyNFT(
        detailedNFTData?.token_id as number,
        detailedNFTData?.price as number
      );

      if (tx) {
        setTimeout(async () => {
          const reponse = await postServer(`/nft/${hash}/buy`, {
            tx,
            address,
            token_id: detailedNFTData?.token_id,
          });
        }, 30000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = () => {
    likeNFT(hash, address as string);
  };

  return (
    <div className="main-pt">
      <div id="detailed-container" className="container">
        <div className="flex flex-col lg:flex-row gap-6 mt-4 lg:mt-10">
          <div className="p-2 lg:bg-white/10 rounded-md">
            {detailedNFTData && (
              <Image
                className="max-h-[600px]"
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${detailedNFTData.asset_url}`}
                alt="Not Found"
              />
            )}
          </div>
          <div className="w-full">
            <h2>{detailedNFTData?.token_name}</h2>
            <div className="flex justify-between mt-1">
              <div className="flex gap-2">
                <img src="/asset/avatar.png" alt="Not Found" />
                <div>
                  <p>{detailedNFTData?.creator}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 lg:gap-6">
                <span className="flex items-center gap-1">
                  <button onClick={handleLike}>
                    <LikeIcon />
                  </button>
                  <span>{detailedNFTData?.likes}</span>
                </span>
                <span>
                  <FollowIcon />
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row mt-6 gap-y-2">
              <div className="lg:w-[30%]">
                <p>Current Price</p>
                <p className="text-2xl font-semibold">
                  {detailedNFTData?.price} ETH
                </p>
              </div>
              <div>
                <p>Loyalty Fee</p>
                <p className="text-2xl font-semibold">
                  {detailedNFTData?.royalty} %
                </p>
              </div>
            </div>
            <div className="mt-8">
              {address?.toLocaleLowerCase !=
                detailedNFTData?.owner?.toLocaleLowerCase() && (
                <PrimaryButton
                  className="w-[200px]"
                  isLoading={isBuyNFTLoading || isBuyNFTPending}
                  text="Purchase NFT"
                  onClick={handlePurchase}
                />
              )}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Accordion
            fullWidth
            keepContentMounted
            className="gap-3 px-0"
            itemClasses={{
              base: "!bg-white/10",
              title: "font-medium",
              trigger: "py-4 md:py-6",
              content: "pt-0 pb-6 text-base text-default-500",
              indicator: "data-[open=true]:rotate-180",
            }}
            selectionMode="multiple"
            variant="splitted"
          >
            <AccordionItem
              key={0}
              indicator={<Icon icon="solar:alt-arrow-down-linear" width={24} />}
              title="Prompt"
            >
              {detailedNFTData?.prompt}
            </AccordionItem>
          </Accordion>
        </div>

        <PaginationComments address={address as string} hash={hash} />

        <div className="mt-10 text-center">
          <h2>More by SDXL 1.0 </h2>
          <p>
            The largest and unique Super rare NFT marketplace For
            crypto-collectibles
          </p>
          <div className="mt-8">
            <MultiCarousel
              data={NFTDetails}
              delay={2500}
              selectedNFT={selectedNFT}
              setSelectedNFT={setSelectedNFT}
            />
          </div>
        </div>
        <div className="mt-10 text-center">
          <h2>You might also like</h2>
          <p>
            The largest and unique Super rare NFT marketplace For
            crypto-collectibles
          </p>
          <div className="mt-8">
            <MultiCarousel
              data={NFTDetails}
              delay={3000}
              selectedNFT={selectedNFT}
              setSelectedNFT={setSelectedNFT}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
