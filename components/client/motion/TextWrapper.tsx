"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  children: React.ReactNode;
  opposite?:boolean
}

const TextWrapper = ({ children, opposite = false }: Props) => {
  const text = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: text,
    offset: ["start end", "end start"],
  });
  const toValue = opposite?-100:100
  const opacity = useTransform(scrollYProgress, [1, 0.8, 0], [1, 1, 0]);
  const x = useTransform(scrollYProgress, [1, 0.4, 0], [0, 0, toValue]);
  const colorChange = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      "hsla(180, 7%, 75%, 0.5)",
      "hsla(180, 7%, 75%, 0.6)",
      "hsla(180, 7%, 75%, 1)",
      "hsla(180, 7%, 75%, 1)",
      "hsla(180, 7%, 75%, 1)",
      "hsla(180, 7%, 75%, 1)",
    ]
  );

  return (
    <div ref={text}>
      <motion.p style={{ opacity, x, color: colorChange }}>{children}</motion.p>
    </div>
  );
};
export {TextWrapper}