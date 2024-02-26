"use client";

import { ReactNode, memo } from "react";
// @ts-ignore
import Dialog from "rc-dialog";

import styles from "./index.module.scss";

import "./rc-modal.scss";

export type ModalProps = {
  onConfirm?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onCancel?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  visible?: boolean;
  maskClosable?: boolean;
  keyboard?: boolean;
  closable?: boolean;
  destroyOnClose?: boolean;
  children: ReactNode;
  afterClose?: () => void;
};

const Modal = ({
  title = "标题",
  onConfirm,
  onCancel,
  afterClose,
  children,
  confirmText = "确认",
  cancelText = "取消",
  visible = false,
  maskClosable = true,
  keyboard = true,
  closable = true,
  destroyOnClose = false,
}: ModalProps) => {
  const renderFooter = () => (
    <div className={styles["lew-modal-footer"]}>
      {closable && (
        <button
          className={styles["lew-modal-footer-button"]}
          onClick={(e) => {
            onCancel?.(e);
          }}
        >
          {cancelText}
        </button>
      )}
      <button
        className={styles["lew-modal-footer-button"]}
        onClick={(e) => {
          onConfirm?.(e);
        }}
      >
        {confirmText}
      </button>
    </div>
  );

  return (
    <Dialog
      title={<h3 className={styles["lew-modal-title"]}>{title}</h3>}
      zIndex={888}
      visible={visible}
      onClose={() => {
        onCancel?.();
      }}
      closable={false}
      footer={renderFooter()}
      maskClosable={maskClosable}
      keyboard={keyboard}
      className={styles["lew-modal"]}
      wrapClassName={styles["lew-modal-wrap"]}
      maskAnimation="fade"
      animation="zoom"
      destroyOnClose={destroyOnClose}
      afterClose={afterClose}
    >
      <div className={styles["lew-modal-content"]}>{children}</div>
    </Dialog>
  );
};

export default memo(Modal);
