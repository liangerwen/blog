"use client";

import React, { createElement } from "react";
import { createRoot } from "react-dom/client";

import styles from "./index.module.scss";

export type MessageProps = {
  message: string;
};

const Message = ({ message }: MessageProps) => {
  return <>{message}</>;
};

export default Message;

export const $message = (msg: string, time = 2000) => {
  const container = document.createElement("div");
  container.className = styles["lew-message"];
  document.body.append(container);
  const message = createRoot(container);
  setTimeout(() => {
    message.unmount();
    container.remove();
  }, time);
  message.render(createElement(Message, { message: msg }));
};
