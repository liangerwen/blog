import React from "react";
import config from "@/src/config";
import CoverBackground from "@/src/components/cover-background";
import Footer from "@/src/components/footer";
import MainContainer from "@/src/components/main-container";
import { type Post } from "@/.contentlayer/generated";
import Image from "@/src/components/image";
import dayjs from "dayjs";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allPosts } from "@/src/data";
import Timeline, { TimelineProps } from "@/src/components/timeline";
import Icon from "@/src/components/icon";
import { Metadata } from "next";
import PaginationWithArchives from "./pagination";

export const metadata: Metadata = {
  title: `归档 | ${config.name}`,
};

interface PageProps {
  params?: {
    current: string;
  };
}

export default function Archives({ params }: PageProps) {
  const current = params === undefined ? "1" : params.current;
  const page = Number(current);
  // 参数不正确
  if (!/^[1-9]\d*$/.test(current)) {
    return notFound();
  }
  const pageSize = config.post.pageSize || 10;
  const maxPageNumber = Math.max(Math.ceil(allPosts.length / pageSize), 1);
  // 超过数量
  if (page > maxPageNumber) {
    return notFound();
  }
  const posts = allPosts.slice((page - 1) * pageSize, page * pageSize);
  const archives = posts.reduce((acc, cur) => {
    const year = dayjs(cur.createTime).format("YYYY");
    const curAccIdx = acc.findIndex((i) => i.date === year);
    if (curAccIdx >= 0) {
      acc[curAccIdx].posts.push(cur);
    } else {
      acc.push({
        date: year,
        posts: [cur],
      });
    }
    return acc;
  }, [] as { date: string; posts: Post[] }[]);
  const items: TimelineProps["items"] = archives
    .map((i) => [
      { label: i.date },
      ...i.posts.map((p) => ({
        children: (
          <div className="flex gap-2" key={p.title}>
            <Link
              href={`/${p._raw.flattenedPath}`}
              className="cover-img-box w-20 overflow-hidden"
            >
              <Image src={p.cover} className="cover-img" />
            </Link>
            <div>
              <p className="flex gap-1">
                <Icon icon="solar:calendar-bold-duotone" />
                {dayjs(p.createTime).format("YYYY-MM-DD")}
              </p>
              <Link
                href={`/${p._raw.flattenedPath}`}
                className="inline-block no-underline transform hover:translate-x-2 transition-transform duration-300"
              >
                {p.title}
              </Link>
            </div>
          </div>
        ),
      })),
    ])
    .flat();
  return (
    <>
      <CoverBackground cover="/images/rixiang.png" element="header" />
      <MainContainer className="card p-10 md:p-5" rootClassName="fade-move-up">
        <Timeline items={items} title={`全部文章-共${allPosts.length}篇`} />
        <PaginationWithArchives total={allPosts.length} currentPage={page} />
      </MainContainer>
      <Footer cover="/images/rixiang.png" className="fade-move-up" />
    </>
  );
}
