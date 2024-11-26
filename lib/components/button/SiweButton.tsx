"use client";
import { useCallback, useEffect, useRef } from "react";
import { getCsrfToken, signIn } from "next-auth/react";
import { SiweMessage } from "siwe";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useConfig, useDisconnect, useSignMessage } from "wagmi";
import { Button } from "@nextui-org/button";

import { authChallenge } from "@/lib/net/modules/auth";
import WalletIcon from "@/public/icon/wallet.svg";

const SiweButton = () => {
  const { address } = useAccount();
  const { chains } = useConfig();
  const { open } = useWeb3Modal();
  const { signMessageAsync } = useSignMessage();

  const modalOpened = useRef(false);

  const onSignIn = useCallback(async () => {
    const callbackUrl = "/explore";
    if (!address) {
      localStorage.removeItem("wallteconnet");
      localStorage.removeItem("wagmi.wallet");
      localStorage.removeItem("wagmi.store");
      localStorage.removeItem("wagmi.connected");

      modalOpened.current = true;
      open();
    } else {
      modalOpened.current = false;

      try {
        const { nonce } = await authChallenge(address);
        console.log(nonce);
        const siwe = new SiweMessage({
          domain: window.location.host,
          address: address,
          statement: "Sign in with Ethereum to the app.",
          uri: window.location.origin,
          version: "1",
          chainId: chains[0].id,
          nonce: nonce,
        });

        const message = siwe.prepareMessage();
        const signature = await signMessageAsync({
          message,
        });

        signIn("siwe", {
          message: JSON.stringify(message),
          redirect: true,
          signature,
          callbackUrl,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [address]);

  useEffect(() => {
    if (address && modalOpened.current) {
      onSignIn();
    }
  }, [address, onSignIn]);

  return (
    <Button
      startContent={<WalletIcon className="text-default-500" width={24} />}
      variant="bordered"
      onClick={onSignIn}
    >
      Sign Up with Wallet
    </Button>
  );
};

export default SiweButton;
