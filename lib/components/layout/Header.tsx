"use client";
import { useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import { Image } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Badge,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

import ToggleProfile from "@/lib/components/profile/ToggleProfile";
import PrimaryButton from "@/lib/components/button/PrimaryButton";
import { useAccount } from "wagmi";

export default function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { address } = useAccount();
  const path = usePathname();

  const onLogo = useCallback(() => {
    router.push("/");
  }, []);

  const logoElement = useMemo(() => {
    return (
      <Image
        classNames={{ img: "w-16 h-16" }}
        src="/logo.png"
        className="hover:cursor-pointer"
        onClick={onLogo}
        alt="Not Found"
      />
    );
  }, []);

  // const headerTrailing = useMemo(
  //   () => (
  //     <div>
  //       {session && address ? (
  //         <ToggleProfile />
  //       ) : (
  //         <PrimaryButton
  //           text={path === "/signin" ? "Get Started" : "Connect Wallet"}
  //           className="w-32 md:w-40"
  //           onClick={() => router.push("/signin")}
  //           varient="secondary"
  //         />
  //       )}
  //     </div>
  //   ),
  //   [session, status]
  // );

  return (
    <div className="px-4 z-50 w-full fixed top-4">
      <Navbar
        classNames={{
          base: "bg-transparent backdrop-filter-none",
          wrapper:
            "px-4 sm:px-6 bg-white/15 border-1 border-white/30 backdrop-blur-xl backdrop-saturate-150 rounded-full",
          item: "data-[active=true]:text-primary max-w-[1536px]",
        }}
        height="100px"
        maxWidth="2xl"
      >
        <NavbarBrand>
          <NavbarMenuToggle className="mr-2 h-6 sm:hidden" />
          {logoElement}
        </NavbarBrand>
        <NavbarContent
          className="ml-4 hidden h-12 w-full max-w-fit gap-8 rounded-full px-8 sm:flex"
          justify="start"
        >
          <NavbarItem isActive={path.includes("explore") ? true : false}>
            <Link className="flex gap-2 text-inherit" href="/explore">
              Explorer NFT
            </Link>
          </NavbarItem>
          <NavbarItem isActive={path.includes("create") ? true : false}>
            <Link
              aria-current="page"
              className="flex gap-2 text-inherit"
              href="/create"
            >
              Create NFT
            </Link>
          </NavbarItem>
          <NavbarItem isActive={path.includes("earn") ? true : false}>
            <Link className="flex gap-2 text-inherit" href="/earn">
              EARN
            </Link>
          </NavbarItem>
          <NavbarItem isActive={path.includes("campaign") ? true : false}>
            <Link className="flex gap-2 text-inherit" href="/campaigns">
              Campaigns
            </Link>
          </NavbarItem>
        </NavbarContent>
        {session && address ? (
          <NavbarContent
            className="ml-auto flex justify-center items-center h-12 max-w-fit gap-0 rounded-full p-0 px-2 bg-white/30 dark:bg-white/30"
            justify="end"
          >
            {/* Theme change */}
            <NavbarItem className="hidden lg:flex">
              <Button isIconOnly radius="full" variant="light">
                <Icon
                  className="text-white"
                  icon="solar:sun-linear"
                  width={24}
                />
              </Button>
            </NavbarItem>
            {/* Notifications */}
            <NavbarItem className="flex">
              <Popover offset={12} placement="bottom-end">
                <PopoverTrigger>
                  <Button
                    disableRipple
                    isIconOnly
                    className="overflow-visible"
                    radius="full"
                    variant="light"
                  >
                    <Badge
                      color="danger"
                      content="5"
                      showOutline={false}
                      size="md"
                    >
                      <Icon
                        className="text-white"
                        icon="solar:bell-linear"
                        width={22}
                      />
                    </Badge>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="max-w-[90vw] p-0 sm:max-w-[380px]">
                  <span>KKK</span>
                </PopoverContent>
              </Popover>
            </NavbarItem>
            {/* User Menu */}
            <NavbarItem className="flex items-center">
              <ToggleProfile />
            </NavbarItem>
          </NavbarContent>
        ) : (
          <PrimaryButton
            text={path === "/signin" ? "Get Started" : "Connect Wallet"}
            className="w-32 md:w-40"
            onClick={() => router.push("/signin")}
            varient="secondary"
          />
        )}

        {/* Mobile Menu */}
        <NavbarMenu>
          <NavbarMenuItem isActive>
            <Link
              aria-current="page"
              className="w-full"
              color="primary"
              href="/explore"
            >
              Explorer NFT
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="w-full" color="foreground" href="/create">
              Create NFT
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="w-full" color="foreground" href="/earn">
              EARN
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="w-full" color="foreground" href="/campaigns">
              Campaigns
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
