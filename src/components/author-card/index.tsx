import React from "react";
import config from "@/src/config";
import Button from "../button";
import { addToBookmark } from "@/src/utils/bookmark";
import cls from "classnames";
import Icon from "../icon";
import Image from "../image";
import Link from "next/link";

const hoverRotateClassName = "transition duration-300 hover:rotate-[360deg]";

export default function AuthorCard() {
  return (
    <div className="card px-[24px] py-[20px] text-center">
      <Image
        src={config.avatar}
        alt={config.name}
        className={cls(
          "mx-auto rounded-full w-[110px] h-[110px] object-cover",
          hoverRotateClassName
        )}
      />
      <h3 className="mt-2">{config?.name}</h3>
      <p className="mt-2">{config?.description}</p>
      <Button
        className="mt-2"
        block
        onClick={() => addToBookmark()}
        icon={<Icon icon="mdi:bookmark-plus" />}
      >
        加入书签
      </Button>
      <div className="flex justify-center text-2xl mt-2 gap-2">
        <a
          href={config.github}
          className={hoverRotateClassName}
          title="github"
          target="_blank"
        >
          <Icon icon="simple-icons:github" />
        </a>
        <a
          href={config.gitee}
          className={hoverRotateClassName}
          title="gitee"
          target="_blank"
        >
          <Icon icon="simple-icons:gitee" />
        </a>
        <Link
          href="/feed.xml"
          className={hoverRotateClassName}
          title="rss"
          target="_blank"
        >
          <Icon icon="mingcute:rss-2-fill" />
        </Link>
      </div>
    </div>
  );
}
