import type { FC } from "react";

export type CommentType = {
  creator: string;
  contents: string;
  created_date: number;
};

export type NFTBaseType = {
  id: number;
  name: string;
  asset: string;
  tag: string[];
  creator: string;
  creator_id: string;
  price: string;
  auction_period: number;
  fire: string;
  like: number;
  prompt: string;
  comments: CommentType[];
};

type Props = {
  data: NFTBaseType;
  onClick: (type: number) => void;
};

const NFTViewCard: FC<Props> = ({ data, onClick }) => {
  return (
    <div
      className="p-2 rounded-md bg-white/5 hover:cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={() => onClick(data.id)}
    >
      <img className="!h-[400px] rounded-md" src={data.asset} alt="Not Found" />
    </div>
  );
};

export default NFTViewCard;
