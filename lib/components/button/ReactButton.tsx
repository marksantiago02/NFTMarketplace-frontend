import FireIcon from "@/public/icon/fire.svg";
import LikeIcon from "@/public/icon/like.svg";

export default function ReactButton({
  type,
  value,
}: {
  type: "fire" | "like";
  value: number;
}) {
  return (
    <span className="flex gap-1 items-center">
      {type === "fire" ? <FireIcon /> : <LikeIcon />}
      <span className="font-semibold text-lg">{value}</span>
    </span>
  );
}
