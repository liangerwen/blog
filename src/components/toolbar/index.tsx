"use client";

import Button from "../button";
import Icon from "../icon";
import cls from "classnames";
import { useTheme } from "../theme";
import useScroll from "@/src/hooks/use-scroll";

export default function Toolbar() {
  const { toggle } = useTheme();
  const { y } = useScroll();

  const actions = [
    {
      title: "深浅转换",
      icon: <Icon icon="line-md:light-dark" className="text-xl" />,
      onClick: () => toggle(),
    },
    {
      title: "返回顶部",
      icon: <Icon icon="icon-park-outline:rocket-one" className="text-xl" />,
      onClick: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
  ];

  return (
    <div
      className={cls(
        "fixed flex flex-col bottom-[40px] transition duration-300 right-[20px] opacity-80",
        y < 30 && "translate-x-[58px]"
      )}
    >
      {actions.map((i) => (
        <Button key={i.title} {...i} className="mt-2 rounded-md" />
      ))}
    </div>
  );
}
