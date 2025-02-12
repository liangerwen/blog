"use client";

import React, { useState } from "react";
import { ImgHTMLAttributes } from "react";
import cls from "classnames";

const Image = (props: ImgHTMLAttributes<HTMLImageElement>) => {
  const [error, setError] = useState(false);

  return error ? (
    <img
      {...props}
      className={cls(props.className, "bg-[var(--button-bg)]")}
      src="/images/404.png"
    />
  ) : (
    <img
      {...props}
      onError={(e) => {
        setError(true);
        return props.onError?.(e);
      }}
    />
  );
};

export default Image;
