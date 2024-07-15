"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  children: React.ReactNode;
  opposite?: boolean;
  containerClass?: string;
  tag?: keyof JSX.IntrinsicElements; // add this prop
  styles?: React.scssProperties; // add this prop
}

const TextWrapper = ({
  children,
  opposite = false,
  containerClass = '',
  tag = 'p', // default tag is 'p'
  styles={},
}: Props) => {
  const text = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: text,
    offset: ["start end", "end start"],
  });
  const toValue = opposite ? -30 : 30;
  const opacity = useTransform(scrollYProgress, [1, 0.8, 0], [1, 1, 0]);
  const x = useTransform(scrollYProgress, [1, 0.4, 0], [0, 0, toValue]);
  const colorChange = useTransform(
    scrollYProgress,
    [0.4, 0.6, 0.8, 1],
    [
      "hsla(180, 7%, 75%, 1)",
      "hsla(180, 7%, 75%, 1)",
      "hsla(180, 7%, 75%, 1)",
      "hsla(180, 7%, 75%, 1)",
    ]
  );

  const Element = motion(tag as keyof typeof motion); // create a motion element with the specified tag

  return (
    <div ref={text} className={containerClass}>
      <Element style={{ opacity, x, color: colorChange,fontSize:tag==='p'?'1.5rem':"inherit", ...styles }} >
        {children}
      </Element>
    </div>
  );
};

export { TextWrapper };