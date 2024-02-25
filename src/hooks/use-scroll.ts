"use client";

import { useEffect, useRef, useState } from "react";
import { throttle } from "lodash-es";

enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  NONE = "NONE",
}

export default function useScrollDirection() {
  const [direction, setDirection] = useState(Direction.NONE);
  const [distance, setDistance] = useState({ y: 0, x: 0 });
  const ref = useRef({ y: 0, x: 0 });

  const _listener = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    if (scrollTop - ref.current.y > 0) {
      setDirection(Direction.DOWN);
    }
    if (scrollTop - ref.current.y < 0) {
      setDirection(Direction.UP);
    }
    if (scrollLeft - ref.current.x > 0) {
      setDirection(Direction.RIGHT);
    }
    if (scrollLeft - ref.current.x < 0) {
      setDirection(Direction.LEFT);
    }
    ref.current = {
      y: scrollTop,
      x: scrollLeft,
    };
    setDistance(ref.current);
  };

  useEffect(() => {
    const listener = throttle(_listener, 200);
    window.addEventListener("scroll", listener, false);
    listener();
    return () => {
      window.removeEventListener("scroll", listener, false);
    };
  }, []);

  return {
    up: direction === Direction.UP,
    down: direction === Direction.DOWN,
    left: direction === Direction.LEFT,
    right: direction === Direction.RIGHT,
    ...distance,
  };
}
