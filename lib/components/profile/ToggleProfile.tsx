"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

import ProfileMenu from "./profile-kit/ProfileMenu";

const ToggleProfile = () => {
  const profileRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(false);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setActive(false);
    }
  };

  useLayoutEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <div className="relative">
      <div
        ref={profileRef}
        className={active ? "block absolute top-[50px] right-0" : "hidden"}
      >
        <ProfileMenu />
      </div>
      <div
        ref={buttonRef}
        className="p-2 rounded-full hover:cursor-pointer hover:opacity-30 transition-opacity duration-500"
        onClick={() => setActive(!active)}
      >
        <Icon icon="teenyicons:user-circle-outline" className="w-6 h-6" />
      </div>
    </div>
  );
};

export default ToggleProfile;
