import { useCallback } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ContractFunctionExecutionError } from "viem";

import NFTABI from "@/lib/web3/contracts/NYWNFT.json";

const NFT_ADDRESS = process.env.NEXT_PUBLIC_NFT_ADDRESS as `0x${string}`;

const useNFTMint = () => {
  const {
    data: mintData,
    isPending: isPendingMint,
    writeContractAsync,
  } = useWriteContract();

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: mintData,
  });

  const mintNFT = useCallback(
    async (metadataURL: string, royalty: number) => {
      if (!writeContractAsync) {
        return;
      }

      try {
        return await writeContractAsync({
          address: NFT_ADDRESS,
          abi: NFTABI,
          functionName: "create",
          args: [metadataURL, royalty],
        });
      } catch (err) {
        if (err instanceof ContractFunctionExecutionError) {
          console.log(err);
        } else {
          throw err;
        }
      }
    },
    [writeContractAsync]
  );

  return {
    mintNFT,
    isPendingMint,
    isMintLoading: isLoading,
    isMintSuccess: isSuccess,
  };
};

export default useNFTMint;
