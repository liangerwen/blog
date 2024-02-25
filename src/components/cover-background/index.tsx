import { gradientColor } from "@/src/utils/color";
import { ReactNode } from "react";
import cls from "classnames";

export interface CoverBackgroundProps {
  element?: "div" | "footer" | "header";
  cover?: string;
  children?: ReactNode;
  height?: number | "full";
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
        "bg-cover bg-no-repeat bg-center mark flex justify-center items-center",
        className
      )}
      style={{
        backgroundImage: cover ? `url(${cover})` : gradientColor(),
        height: height === "full" ? "100%" : height,
        backgroundPosition: position,
      }}
    >
      <div className="absolute w-full text-center">{children}</div>
    </Element>
  );
}
