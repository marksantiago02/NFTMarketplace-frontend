"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Image,
  Switch,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

import MultiCarousel from "@/lib/components/carousel/MultiCarousel";
import NFTShowcaseCard from "@/lib/components/card/NFTShowcaseCard";
import PrimaryButton from "@/lib/components/button/PrimaryButton";
import ImageContainer from "@/lib/components/container/ImageCotainer";
import { fetchServer } from "@/lib/net/fetch/fetch";
import useColNums from "@/lib/hooks/useColNums";

import FeaturedIcon from "@/public/icon/featured.svg";
import PFPIcon from "@/public/icon/pfp.svg";
import VideoIcon from "@/public/icon/movie.svg";
import MusicIcon from "@/public/icon/music.svg";
import NewIcon from "@/public/icon/new.svg";

import NFTDetails from "@/app/(main)/explore/NFTDetails.json";

import type { CommentType } from "@/lib/components/card/NFTViewCard";
import type { NFTData } from "@/app/(main)/profile/tabs/TabNFT";

const Explorer = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [selectedNFT, setSelectedNFT] = useState(-1);
  const [listedNFTs, setListedNFTs] = useState<NFTData[]>([]);

  const router = useRouter();

  const cols = useColNums();

  useEffect(() => {
    const fetchListedNFTs = async () => {
      const res = await fetchServer("/nft/listed");

      setListedNFTs(res);
    };

    fetchListedNFTs();
  }, []);

  return (
    <div>
      <div className="relative">
        <img
          className="w-full max-h-[600px]"
          src="/metaverse.png"
          alt="Not Found"
        />
        <div className="absolute top-0 w-full h-full bg-transparent/5" />
      </div>
      <div className="container">
        <div className="flex justify-between items-center my-6">
          <span>
            <Breadcrumbs
              separator=">>"
              itemClasses={{
                separator: "px-2",
              }}
            >
              <BreadcrumbItem>Home</BreadcrumbItem>
              <BreadcrumbItem onClick={() => setSelectedNFT(-1)}>
                NFT EXPLORE
              </BreadcrumbItem>
              {selectedNFT !== -1 && (
                <BreadcrumbItem>
                  {NFTDetails[selectedNFT - 1].name}
                </BreadcrumbItem>
              )}
            </Breadcrumbs>
          </span>
          <Switch defaultSelected color="secondary">
            <span>Buy Now</span>
          </Switch>
        </div>
        <div>
          <div className="flex flex-col lg:flex-row gap-4 p-2 mt-6 bg-white/10 rounded-md">
            <Input
              aria-label="Search"
              classNames={{
                inputWrapper: "w-full h-full bg-white/10",
              }}
              labelPlacement="outside"
              placeholder="Search Prompts"
              radius="sm"
              startContent={
                <Icon
                  className="text-default-500"
                  icon="solar:magnifer-linear"
                  width={20}
                />
              }
            />
            <div className="svg-container flex flex-wrap lg:flex-nowrap gap-2 font-medium">
              <span
                className={`${selectedItem == 0 ? "text-light-blue" : ""} item`}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedItem(0)}
              >
                <FeaturedIcon
                  className={
                    selectedItem == 0 ? "fill-light-blue" : "fill-white"
                  }
                />
                Featured
              </span>
              <span
                className={`${selectedItem == 1 ? "text-light-blue" : ""} item`}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedItem(1)}
              >
                <PFPIcon
                  className={
                    selectedItem == 1 ? "fill-light-blue" : "fill-white"
                  }
                />
                PFP
              </span>
              <span
                className={`${
                  selectedItem == 2 ? "text-light-blueeee" : ""
                } item`}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedItem(2)}
              >
                <VideoIcon
                  className={
                    selectedItem == 2 ? "fill-light-blue" : "fill-white"
                  }
                />
                Video
              </span>
              <span
                className={`${selectedItem == 3 ? "text-light-blue" : ""} item`}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedItem(3)}
              >
                <MusicIcon
                  className={
                    selectedItem == 3 ? "fill-light-blue" : "fill-white"
                  }
                />
                Music
              </span>
              <span
                className={`${selectedItem == 4 ? "text-light-blue" : ""} item`}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedItem(4)}
              >
                <NewIcon
                  className={
                    selectedItem == 4 ? "fill-light-blue" : "fill-white"
                  }
                />
                Newest
              </span>
            </div>
          </div>
          <div className="explorer-identifier mt-8 flex flex-wrap gap-2 lg:gap-4">
            <Button radius="full">#Kimchi-Challenge</Button>
            <Button radius="full">#AvengerDAO</Button>
            <Button radius="full">#abstract</Button>
            <Button radius="full">#illustration</Button>
            <Button radius="full">#film</Button>
            <Button radius="full">#technology</Button>
            <Button radius="full">#sketch</Button>
            <Button radius="full">#pixel</Button>
            <Button radius="full">#cartoon</Button>
            <Button radius="full">#anime</Button>
          </div>

          <div className="mt-16 text-center">
            <h2 className="">Latest NFTs</h2>
            <p className="mb-10">The latest NFTs by NYW artists and users</p>
            <ImageContainer cols={cols}>
              {listedNFTs.map((nft, index) => {
                return (
                  <NFTShowcaseCard
                    key={index}
                    asset={`${process.env.NEXT_PUBLIC_API_BASE_URL}${nft.asset_url}`}
                    hash={nft.asset_hash}
                  />
                );
              })}
            </ImageContainer>
          </div>

          <div className="text-center">
            <div className="mt-16">
              <h2>Hot</h2>
              <p>
                The largest and unique Super rare NFT marketplace For
                crypto-collectibles
              </p>
              <div className="mt-10">
                <MultiCarousel
                  selectedNFT={selectedNFT}
                  setSelectedNFT={setSelectedNFT}
                  delay={2500}
                  data={NFTDetails}
                />
              </div>
              <div className="flex justify-center mt-12">
                <PrimaryButton
                  className="w-[300px]"
                  text="show all hot models"
                />
              </div>
            </div>
            <div className="mt-16">
              <h2>Most used</h2>
              <p>
                The largest and unique Super rare NFT marketplace For
                crypto-collectibles
              </p>
              <div className="mt-10">
                <MultiCarousel
                  selectedNFT={selectedNFT}
                  setSelectedNFT={setSelectedNFT}
                  delay={2000}
                  data={NFTDetails}
                />
              </div>
              <div className="flex justify-center mt-12">
                <PrimaryButton
                  className="w-[300px]"
                  text="View All Voice Models"
                />
              </div>
            </div>
            <div className="mt-16">
              <h2>Hot</h2>
              <p>
                The largest and unique Super rare NFT marketplace For
                crypto-collectibles
              </p>
              <div className="mt-10">
                <MultiCarousel
                  delay={3000}
                  data={NFTDetails}
                  selectedNFT={selectedNFT}
                  setSelectedNFT={setSelectedNFT}
                />
              </div>
              <div className="flex justify-center mt-12">
                <PrimaryButton
                  className="w-[300px]"
                  text="view all Video Models"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorer;
