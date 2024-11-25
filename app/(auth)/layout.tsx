"use client";
import React from "react";
import Header from "@/lib/components/layout/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[100vh] bg-dark-blue">
      <Header />
      {children}
    </div>
  );
}
