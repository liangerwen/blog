import { useEffect, useRef, useState } from "react";
import Icon from "../icon";

interface CopyProps {
  content: string;
}

export default function Copy({ content = "" }: CopyProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>();

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return copied ? (
    <Icon icon="charm:tick" className="cursor-pointer !text-[#4CD263]" />
  ) : (
    <Icon
      icon="solar:copy-bold"
      className="cursor-pointer hover:text-[#49b1f5]"
      onClick={() => {
        navigator.clipboard.writeText(content).then(() => {
          setCopied(true);
          timer.current = setTimeout(() => {
            setCopied(false);
            timer.current = null;
          }, 3000);
        });
      }}
    />
  );
}
