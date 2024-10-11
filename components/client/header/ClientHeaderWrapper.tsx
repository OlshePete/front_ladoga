"use client";
import { useMotionValueEvent, useScroll } from "framer-motion";
import React, { FC,  useRef } from "react";

interface Props {
  children: JSX.Element;
}
const ClientHeaderWrapper: FC<Props> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {scrollY} = useScroll({target:containerRef})
  
useMotionValueEvent(scrollY, "change", (latest) => {
  // console.log("Page scroll: ", latest)
})
  return <div ref={containerRef}>{children}</div>;
};

export { ClientHeaderWrapper };
