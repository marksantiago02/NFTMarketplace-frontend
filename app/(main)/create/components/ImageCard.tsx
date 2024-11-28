"use client";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { Button, Card, Image, Tooltip } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify/react";

import useSaveImage from "@/lib/hooks/image/useSaveImage";
import useToast from "@/lib/hooks/toast/useToast";

import "./style.scss";

type CardProps = {
  id: number;
  selectedImage: number;
  setSelectedImage: (type: number) => void;
  imgSrc: string;
  prompt: string;
};

export default function ImageCard(props: CardProps) {
  const { id, imgSrc, selectedImage, setSelectedImage, prompt } = props;
  const { address } = useAccount();

  const { isSaving, isSaved, setIsSaved, saveImage } = useSaveImage();
  const customToast = useToast();

  useEffect(() => {
    if (isSaved === "success") {
      customToast("success", "Successfully Saved");
      setIsSaved("");
    } else if (isSaved === "failed") {
      customToast("failed", "Already exist in your artwork");
      setIsSaved("");
    }
  }, [isSaved]);

  function handleClick() {
    setSelectedImage(id);
  }

  return (
    <Card
      className={twMerge(
        "card-container border-blue-400 w-full h-full relative",
        selectedImage === id && "border-2 ring-4"
      )}
    >
      <Image
        alt="Failed"
        className="object-cover hover:cursor-pointer min-w-[250px] min-h-[250px]"
        src={imgSrc}
        isZoomed
      />
      <div className="overlay" onClick={handleClick}>
        <Tooltip
          showArrow
          content="Save to your artwork"
          color="primary"
          placement="bottom-end"
          size="sm"
        >
          <Button
            isIconOnly
            className="absolute right-3 top-3 z-20 bg-background/60 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
            radius="full"
            size="sm"
            variant="flat"
            onPress={() => saveImage(address as string, imgSrc, prompt)}
          >
            <Icon
              className="text-default-900/50 hover:text-danger-400"
              icon="solar:heart-bold"
              width={20}
            />
          </Button>
        </Tooltip>
      </div>
    </Card>
  );
}
