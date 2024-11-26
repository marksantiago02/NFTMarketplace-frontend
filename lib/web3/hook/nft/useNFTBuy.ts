import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ethers } from "ethers";

import MARKET_ABI from "@/lib/web3/contracts/NYWMarket.json";

const MARKET_ADDRESS = process.env.NEXT_PUBLIC_MARKET_ADDRESS as `0x${string}`;

const useNFTBuy = () => {
  const {
    data: buyNFTHash,
    isPending: isBuyNFTPending,
    writeContractAsync: buyNFTAsync,
  } = useWriteContract();

  const { isLoading: isBuyNFTLoading, isSuccess: isBuyNFTSuccess } =
    useWaitForTransactionReceipt({
      hash: buyNFTHash,
    });

  const buyNFT = async (tokenId: number, price: number) => {
    if (!buyNFTAsync) {
      return;
    }
    console.log(tokenId);
    try {
      return await buyNFTAsync({
        address: MARKET_ADDRESS,
        abi: MARKET_ABI,
        functionName: "buyNft",
        args: [BigInt(tokenId)],
        value: ethers.parseEther(price.toString()),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    buyNFT,
    isBuyNFTPending,
    isBuyNFTLoading,
    isBuyNFTSuccess,
  };
};

export default useNFTBuy;
