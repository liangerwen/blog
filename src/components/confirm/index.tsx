"use client";

import React, { ReactNode } from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";

import Modal, { ModalProps } from "../modal";

export type ConfirmProps = Pick<
  ModalProps,
  | "title"
  | "onConfirm"
  | "onCancel"
  | "confirmText"
  | "cancelText"
  | "afterClose"
> & { content?: ReactNode };

export const Confirm = ({
  title = "标题",
  onConfirm,
  onCancel,
  confirmText = "确认",
  cancelText = "取消",
  content = "",
  afterClose,
}: ConfirmProps) => {
  const [visible, setVisible] = useState(true);
  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={() => {
        onCancel?.();
        setVisible(false);
      }}
      onConfirm={() => {
        onConfirm?.();
        setVisible(false);
      }}
      confirmText={confirmText}
      cancelText={cancelText}
      maskClosable={false}
      keyboard={false}
      destroyOnClose={true}
      afterClose={afterClose}
    >
      {content}
    </Modal>
  );
};

export default Confirm;

export const $confirm = ({
  title = "标题",
  onConfirm,
  onCancel,
  confirmText = "确认",
  cancelText = "取消",
  content,
}: ConfirmProps) => {
  const container = document.createElement("div");
  document.body.append(container);
  const modal = createRoot(container);
  modal.render(
    React.createElement(Confirm, {
      title,
      onConfirm,
      onCancel,
      confirmText,
      cancelText,
      content,
      afterClose: () => {
        modal.unmount();
        container.remove();
      },
    })
  );
};
