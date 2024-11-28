import { useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

interface RatioCardProps {
  size: number;
  imageSize: number;
  setImageSize: (size: number) => void;
}

export default function RatioCard({ size, imageSize ,setImageSize }: RatioCardProps) {
  const handleRatioClick = () => {
    setImageSize(size);
  }

  return (
    <Card
      radius="lg"
      onClick={handleRatioClick}
      className={`${size > 3 ? "col-span-3" : "col-span-2"} ${imageSize===size ? "bg-[#15BFFD]" : "bg-white/5"} border-none hover:cursor-pointer`}
    >
      <CardBody onClick={handleRatioClick} className="items-center justify-center">
        <div
          className={
            twMerge(
              `mb-1 rounded-sm border-slate-500 border-2`, (
              size === 1 && "w-5 h-5"
            ), size === 2 && "w-6 h-4", size === 3 && "w-4 h-6", size === 4 && "w-8 h-4", size === 5 && "w-4 h-8"
            )
          }
        >
        </div>
        <p>
          {size === 1 && "1:1"}
          {size === 2 && "4:3"}
          {size === 3 && "3:4"}
          {size === 4 && "16:9"}
          {size === 5 && "9:16"}
        </p>
      </CardBody>
    </Card>
  );
}
