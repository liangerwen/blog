import { gradientColor } from "@/src/utils/color";
import { ReactNode } from "react";
import cls from "classnames";
import Icon from "../icon";

export interface CoverBackgroundProps {
  element?: "div" | "footer" | "header";
  cover?: string;
  children?: ReactNode;
  height?: number | "fullScreen";
  position?: "center" | "top" | "left" | "right" | "bottom";
  className?: string;
}

export default function CoverBackground({
  element: Element = "div",
  cover,
  children,
  height = 400,
  position = "center",
  className,
}: CoverBackgroundProps) {
  return (
    <Element
      className={cls(
        "bg-cover bg-no-repeat bg-center mark flex justify-center items-center relative",
        className
      )}
      style={{
        backgroundImage: cover ? `url(${cover})` : gradientColor(),
        height: height === "fullScreen" ? "100vh" : height,
        backgroundPosition: position,
      }}
    >
      <div className="absolute w-full text-center">{children}</div>
      {height === "fullScreen" && (
        <div
          role="button"
          className="text-[var(--button-color)] text-2xl animate-scroll-down-effect absolute bottom-[10px]"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            });
          }}
        >
          <Icon icon="ep:arrow-down-bold" />
        </div>
      )}
    </Element>
  );
}
