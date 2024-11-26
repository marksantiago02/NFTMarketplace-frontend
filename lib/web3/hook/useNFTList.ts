import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ContractFunctionExecutionError } from "viem";

import MARKET_ABI from "@/lib/web3/contracts/NYWMarket.json";

const MARKET_ADDRESS = process.env.NEXT_PUBLIC_MARKET_ADDRESS as `0x${string}`;

const useNFTList = () => {
  const {
    data: listData,
    isPending: isPendingList,
    writeContractAsync: listNFTAsync,
  } = useWriteContract();
  const {
    data: delistData,
    isPending: isPendingDeList,
    writeContractAsync: delistNFTAsync,
  } = useWriteContract();

  const { isLoading: isListLoading, isSuccess: isListSuccess } =
    useWaitForTransactionReceipt({
      hash: listData,
    });

  const { isLoading: isDeListLoading, isSuccess: isDeListSuccess } =
    useWaitForTransactionReceipt({
      hash: delistData,
    });

  const listNFT = async (tokenId: number, price: bigint) => {
    if (!listNFTAsync) {
      return;
    }

    try {
      return await listNFTAsync({
        address: MARKET_ADDRESS,
        abi: MARKET_ABI,
        functionName: "listNft",
        args: [tokenId, price],
      });
    } catch (err) {
      if (err instanceof ContractFunctionExecutionError) {
        console.log(err.shortMessage);
      } else {
        throw err;
      }
    }
  };

  const delistNFT = async (tokenId: number) => {
    if (!delistNFTAsync) {
      return;
    }

    try {
      return await delistNFTAsync({
        address: MARKET_ADDRESS,
        abi: MARKET_ABI,
        functionName: "delistNft",
        args: [tokenId],
      });
    } catch (err) {
      if (err instanceof ContractFunctionExecutionError) {
        console.log(err.shortMessage);
      } else {
        throw err;
      }
    }
  };

  return {
    listNFT,
    delistNFT,
    isPendingList,
    isPendingDeList,
    isListLoading: isListLoading,
    isListSuccess: isListSuccess,
    isDeListLoading: isDeListLoading,
    isDeListSuccess: isDeListSuccess,
  };
};

export default useNFTList;
