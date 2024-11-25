"use client";

import React from "react";
import {
  Button,
  Input,
  Link,
  Divider,
  User,
  Checkbox,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

import PrimaryButton from "@/lib/components/button/PrimaryButton";
import WalletIcon from "@/public/icon/wallet.svg";

export default function Component() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="auth__container relative flex h-screen w-screen">
      {/* Sign Up Form */}
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="flex w-full max-w-sm flex-col items-center gap-4 p-4">
          <div className="w-full text-left">
            <p className="pb-2 text-xl font-medium">Create Account</p>
            <p className="text-small text-default-500">
              Sign up for a new account to get started
            </p>
          </div>

          <form
            className="flex w-full flex-col gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              isRequired
              label="Email Address"
              name="email"
              placeholder="Enter your email"
              type="email"
              variant="underlined"
            />
            <Input
              isRequired
              endContent={
                <button type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <Icon
                      className="pointer-events-none text-2xl text-default-400"
                      icon="solar:eye-closed-linear"
                    />
                  ) : (
                    <Icon
                      className="pointer-events-none text-2xl text-default-400"
                      icon="solar:eye-bold"
                    />
                  )}
                </button>
              }
              label="Password"
              name="password"
              placeholder="Create a password"
              type={isVisible ? "text" : "password"}
              variant="underlined"
            />
            <Input
              isRequired
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm your password"
              type={isVisible ? "text" : "password"}
              variant="underlined"
            />
            <Checkbox isRequired className="py-4" size="sm">
              I agree with the&nbsp;
              <Link href="#" size="sm">
                Terms
              </Link>
              &nbsp; and&nbsp;
              <Link href="#" size="sm">
                Privacy Policy
              </Link>
            </Checkbox>
            <PrimaryButton className="w-full" text="Sign Up" />
          </form>

          <div className="flex w-full items-center gap-4 py-2">
            <Divider className="flex-1" />
            <p className="shrink-0 text-tiny text-default-500">OR</p>
            <Divider className="flex-1" />
          </div>

          <div className="flex w-full flex-col gap-2">
            <Button
              startContent={<Icon icon="flat-color-icons:google" width={24} />}
              variant="bordered"
            >
              Sign Up with Google
            </Button>
            <Button
              startContent={
                <WalletIcon className="text-default-500" width={24} />
              }
              variant="bordered"
            >
              Sign Up with Wallet
            </Button>
          </div>

          <p className="text-center text-small">
            Already have an account?&nbsp;
            <Link href="/signin" size="sm">
              Log In
            </Link>
          </p>
        </div>
      </div>

      {/* Right side */}
      <div
        className="relative hidden w-1/2 flex-col-reverse rounded-medium p-10 shadow-small lg:flex"
        style={{
          backgroundImage:
            "url(https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/white-building.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
}
