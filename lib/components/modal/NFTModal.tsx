"use client";
import { useEffect, useState, type FC } from "react";
import { useAccount } from "wagmi";
import {
  Accordion,
  AccordionItem,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

import PrimaryButton from "@/lib/components/button/PrimaryButton";
import { shortenAddress } from "@/lib/components/profile/profile-kit/ProfileHeader";

import { postServer } from "@/lib/net/fetch/fetch";
import useNFTList from "@/lib/web3/hook/useNFTList";
import useNFTApprove from "@/lib/web3/hook/nft/useNFTApprove";
import useToast from "@/lib/hooks/toast/useToast";

import type { NFTData } from "@/app/(main)/profile/tabs/TabNFT";
import { ethers } from "ethers";

type Props = {
  type: "list" | "delist";
  isOpen: boolean;
  onClose: () => void;
  data: NFTData | undefined;
};

const NFTModal: FC<Props> = ({ type, isOpen, onClose, data }) => {
  const [listPrice, setListPrice] = useState<string>("");

  const { address } = useAccount();
  const {
    isPendingList,
    isListLoading,
    isListSuccess,
    isPendingDeList,
    isDeListLoading,
    isDeListSuccess,
    listNFT,
    delistNFT,
  } = useNFTList();

  const { approveNFT } = useNFTApprove();

  const customToast = useToast();

  useEffect(() => {
    if (isListSuccess) {
      customToast("success", "Successfully listed");
    }
  }, [isListSuccess]);

  useEffect(() => {
    if (isDeListSuccess) {
      customToast("success", "Successfully delisted");
    }
  }, [isDeListSuccess]);

  const handleListNFT = async () => {
    if (data?.token_id === undefined || data?.token_id === null) {
      customToast("failed", "Invalid Token ID");
      return;
    }
    if (listPrice === "") {
      customToast("failed", "Please enter a price");
      return;
    }

    try {
      const tx = await listNFT(
        data?.token_id as number,
        ethers.parseEther(listPrice)
      );

      if (tx) {
        await approveNFT(data?.token_id as number);
        setTimeout(async () => {
          if (tx) {
            const response = await postServer("/nft/list", {
              tx,
              address: address as string,
              token_id: data?.token_id as number,
              price: listPrice,
            });
          }
        }, 30000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelistNFT = async () => {
    if (data?.token_id === undefined || data?.token_id === null) {
      customToast("failed", "Invalid Token ID");
      return;
    }

    try {
      const tx = await delistNFT(data?.token_id as number);

      if (tx) {
        setTimeout(async () => {
          if (tx) {
            const response = await postServer("/nft/delist", {
              tx,
              address: address as string,
              token_id: data?.token_id as number,
            });
          }
        }, 30000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      backdrop="blur"
      size="2xl"
      isOpen={isOpen}
      onClose={onClose}
      className="z-50 bg-[#19172c]"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {data?.token_name}
            </ModalHeader>
            <ModalBody className="font-small items-center">
              <Image
                className="max-h-[600px]"
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data?.asset_url}`}
                alt="NYW"
              />
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
                  indicator={
                    <Icon icon="solar:alt-arrow-down-linear" width={24} />
                  }
                  title="Detailed Information"
                >
                  <p>
                    <span className="font-semibold">Token ID</span>:{" "}
                    {data?.token_id}
                  </p>
                  <p className="mt-1">
                    {" "}
                    <span className="font-semibold">Prompt</span>:{" "}
                    {data?.prompt}
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold">Creator</span>:{" "}
                    {shortenAddress(data?.creator as string)}
                  </p>
                </AccordionItem>
              </Accordion>
            </ModalBody>
            <ModalFooter>
              {type === "list" ? (
                <Input
                  classNames={{
                    inputWrapper: "w-full h-full bg-white/10 py-2",
                    input: "text-md",
                  }}
                  placeholder="Insert Listing Price"
                  value={listPrice}
                  onChange={(e) => setListPrice(e.target.value)}
                  startContent={<span>ETH</span>}
                  endContent={
                    <PrimaryButton
                      isLoading={isListLoading || isPendingList}
                      text="List Now"
                      onClick={handleListNFT}
                    />
                  }
                />
              ) : (
                <PrimaryButton
                  isLoading={isDeListLoading || isPendingDeList}
                  text="Delist"
                  onClick={handleDelistNFT}
                />
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NFTModal;
