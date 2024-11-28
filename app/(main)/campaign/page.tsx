"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Campaign() {
  const router = useRouter();
  useEffect(() => {
    router.push("/soon");
  }, []);
  return <div></div>;
}
