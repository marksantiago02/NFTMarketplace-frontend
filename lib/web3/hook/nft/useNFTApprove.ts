import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

const MARKET_ADDRESS = process.env.NEXT_PUBLIC_MARKET_ADDRESS as `0x${string}`;
const NFT_ADDRESS = process.env.NEXT_PUBLIC_NFT_ADDRESS as `0x${string}`;

import NFT_ABI from "@/lib/web3/contracts/NYWNFT.json";

const useNFTApprove = () => {
  const { data: approveNFTHash, writeContractAsync: approveNFTAsync } =
    useWriteContract();

  const { isSuccess: isApproveNFTSuccess } = useWaitForTransactionReceipt({
    hash: approveNFTHash,
  });

  const approveNFT = async (tokenId: number) => {
    if (!approveNFTAsync) {
      return;
    }
    console.log(tokenId);
    try {
      const approveTx = await approveNFTAsync({
        address: NFT_ADDRESS,
        abi: NFT_ABI,
        functionName: "approve",
        args: [MARKET_ADDRESS, BigInt(tokenId)],
      });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    approveNFT,
    isApproveNFTSuccess,
  };
};

export default useNFTApprove;
