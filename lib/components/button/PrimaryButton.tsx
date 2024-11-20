import { Button } from "@nextui-org/button";
import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  text: string;
  className?: string;
  varient?: "primary" | "secondary";
  onClick?: () => void;
  isLoading?: boolean;
};

const PrimaryButton: React.FC<ButtonProps> = ({
  text,
  className,
  varient = "primary",
  onClick,
  isLoading
}) => {
  return (
    <Button
      variant="light"
      size="sm"
      className={twMerge(
        "w-[180px] h-[40px] px-3 group relative p-4 overflow-hidden rounded text-white transition-all duration-300 ease-out bg-[#181B36]",
        className,
        varient === "primary" ? "btn" : "btn-reverse"
      )}
      onClick={onClick}
      isLoading={isLoading}
    >
      <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
      <span
        className={twMerge(
          "relative w-full text-center uppercase",
          varient === "secondary" && "font-small"
        )}
      >
        {text}
      </span>
    </Button>
  );
}

export default PrimaryButton;