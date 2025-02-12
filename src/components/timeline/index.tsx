import React, { ReactNode } from "react";
import cls from "classnames";

import styles from "./index.module.scss";

export interface TimelineProps {
  items: { label?: ReactNode; children?: ReactNode }[];
  title?: ReactNode;
}

const Timeline = ({ items, title }: TimelineProps) => {
  return (
    <div className={styles["timeline"]}>
      <h1 className={cls(styles["timeline-title"], styles["timeline-item"])}>
        {title}
      </h1>
      <ul className={styles["timeline-list"]}>
        {items.map((item, index) => (
          <li key={index} className={styles["timeline-item"]}>
            {item.label && (
              <span className={styles["timeline-item-label"]}>
                {item.label}
              </span>
            )}
            {item.children}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;
