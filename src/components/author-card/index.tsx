import config from "@/src/config";
import Button from "../button";
import { addToBookmark } from "@/src/utils/bookmark";
import cls from "classnames";
import Icon from "../icon";
import Image from 'next/image'

const hoverRotateClassName = "transition duration-300 hover:rotate-[360deg]";

export default function AuthorCard() {
  return (
    <div className="card px-[24px] py-[20px] text-center">
      <Image
        src={config.author?.avatar}
        alt={config.author?.name}
        height={110}
        width={110}
        className={cls("mx-auto rounded-full", hoverRotateClassName)}
      />
      <h3 className="mt-2">{config.author?.name}</h3>
      <p className="mt-2">{config.author?.description}</p>
      <Button
        className="mt-2"
        block
        onClick={() => addToBookmark()}
        icon={<Icon icon="mdi:bookmark-plus" />}
      >
        加入书签
      </Button>
      <div className="flex justify-center text-3xl mt-2">
        <a
          href={config.author?.github}
          className={cls("mr-2", hoverRotateClassName)}
          title="github"
          target="_blank"
        >
          <Icon icon="simple-icons:github" />
        </a>
        <a
          href={config.author?.gitee}
          className={cls(hoverRotateClassName)}
          title="gitee"
          target="_blank"
        >
          <Icon icon="simple-icons:gitee" />
        </a>
      </div>
    </div>
  );
}
