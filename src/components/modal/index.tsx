"use client";

import React, { ReactNode, memo } from "react";
import Dialog, { DialogProps } from "rc-dialog";
import Icon from "../icon";
import cls from "classnames";

import styles from "./index.module.scss";

import "./rc-modal.scss";

export interface ModalProps
  extends Omit<
    DialogProps,
    "title" | "onClose" | "closable" | "footer" | "animation" | "maskAnimation"
  > {
  onConfirm?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onCancel?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  closable?: boolean;
  className?: string;
  footer?: false | ReactNode;
}

const Modal = ({
  title,
  onConfirm,
  onCancel,
  children,
  confirmText = "确认",
  cancelText = "取消",
  closable = true,
  className,
  wrapClassName,
  footer = true,
  ...rest
}: ModalProps) => {
  const renderFooter = () => {
    if (footer === false) {
      return null;
    }
    if (footer === true) {
      return (
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
    }
    return footer;
  };

  return (
    <Dialog
      zIndex={888}
      {...rest}
      title={title && <h3 className={styles["lew-modal-title"]}>{title}</h3>}
      onClose={() => onCancel?.()}
      closable={
        closable
          ? {
              closeIcon: <Icon icon="mingcute:close-fill" width={24} />,
            }
          : false
      }
      footer={renderFooter()}
      className={cls(styles["lew-modal"], className)}
      classNames={{
        wrapper: cls(styles["lew-modal-wrap"], wrapClassName),
      }}
      maskAnimation="fade"
      animation="zoom"
    >
      {children}
    </Dialog>
  );
};

export default memo(Modal);
