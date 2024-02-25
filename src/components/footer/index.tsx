import config from "@/src/config";
import CoverBackground from "../cover-background";
import cls from "classnames";

export interface FooterProps {
  className?: string;
  cover?: string;
}

export default function Footer({ cover, className }: FooterProps) {
  return (
    <CoverBackground
      cover={cover}
      height={136}
      element="footer"
      position="bottom"
      className={cls("text-[#eee]", className)}
    >
      <p>
        <a
          href="https://github.com/jerryc127/hexo-theme-butterfly"
          target="_blank"
          rel="noreferrer"
        >
          主题 | Butterfly
        </a>
      </p>
      <p>
        Copyright ©2021 - {new Date().getFullYear()} By {config.author.name}
      </p>
    </CoverBackground>
  );
}
