"use client";
import Image from "next/image";
import { Tabs, Tab } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useDisclosure } from "@nextui-org/react";
import { useMediaQuery, useTheme } from "@mui/material";

import NFTModal from "@/lib/components/modal/NFTModal";
import { CopyLink } from "@/lib/components/profile/profile-kit/ProfileHeader";
import TabNFT from "./tabs/TabNFT";
import TabArtwork from "./tabs/TabArtwork";
import TabListed from "./tabs/TabList";

import type { NFTData } from "./tabs/TabNFT";

const ProfilePage = () => {
  const theme = useTheme();
  const screenSize = {
    isSmall: useMediaQuery(theme.breakpoints.down("md")),
    isMedium: useMediaQuery(theme.breakpoints.between("md", "xl")),
    isLarge: useMediaQuery(theme.breakpoints.up("xl")),
  };

  const { address } = useAccount();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [selectedData, setSelectedData] = useState<NFTData>();
  const [modalType, setModalType] = useState<"list" | "delist">("list");

  return (
    <div className="main-pt">
      <div className="container">
        <div className="flex flex-col items-center gap-6 pt-16">
          <Image src="/profile.png" width={200} height={200} alt="Avatar" />
          <CopyLink url={address as string} className="text-lg" />
          <div className="flex gap-3 text-xl font-bold">
            <span>0 followers</span>
            <span>·</span>
            <span>0 following</span>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full flex flex-col items-center">
            <Tabs
              classNames={{
                tabList: "mx-4 mt-6 text-medium bg-white/5 py-2",
                tabContent: "text-large",
              }}
              size="lg"
            >
              <Tab
                key="artwork"
                textValue="Artwork"
                title={
                  <div className="flex items-center gap-1.5">
                    <Icon icon="material-symbols:wall-art-outline" width={20} />
                    <p>Artwork</p>
                  </div>
                }
              >
                <TabArtwork
                  cols={screenSize.isLarge ? 4 : screenSize.isMedium ? 3 : 2}
                />
              </Tab>
              <Tab
                key="nft"
                textValue="NFTs"
                title={
                  <div className="flex items-center gap-1.5">
                    <Icon icon="ri:nft-line" width={20} />
                    <p>NFTs</p>
                  </div>
                }
                className="w-full"
              >
                <TabNFT
                  setModalType={setModalType}
                  setSelected={setSelectedData}
                  open={onOpen}
                  cols={screenSize.isLarge ? 4 : screenSize.isMedium ? 3 : 2}
                />
              </Tab>
              <Tab
                key="list"
                textValue="Listing"
                title={
                  <div className="flex items-center gap-1.5">
                    <Icon icon="gg:list" width={20} />
                    <p>Listing</p>
                  </div>
                }
              >
                <TabListed
                  setModalType={setModalType}
                  setSelected={setSelectedData}
                  open={onOpen}
                  cols={screenSize.isLarge ? 4 : screenSize.isMedium ? 3 : 2}
                />
              </Tab>
              <Tab
                key="like"
                textValue="Liked"
                title={
                  <div className="flex items-center gap-1.5">
                    <Icon icon="wpf:like" width={20} />
                    <p>Liked</p>
                  </div>
                }
              >
                <h2>Liked</h2>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>

      <NFTModal
        type={modalType}
        isOpen={isOpen}
        onClose={onClose}
        data={selectedData}
      />
    </div>
  );
};

export default ProfilePage;
