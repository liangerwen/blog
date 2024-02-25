"use client";

import Page from "@/src/components/page";
import { notFound } from "next/navigation";

interface PageProps {
  params?: {
    current: string;
  };
}

export default function PageList({ params }: PageProps) {
  let current = params === undefined ? "1" : params.current;
  // 参数不正确
  if (!/^[1-9]\d*$/.test(current)) {
    return notFound();
  }
  return <Page current={Number(current)} />;
}
