"use client";
import React, { FC, useEffect, useRef, useState } from "react";

interface Props {
  children: JSX.Element;
}
const ClientHeaderWrapper: FC<Props> = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [headerSeparatorOpacity, setHeaderSeparatorOpacity] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      const handleScroll = () => {
        const currentScrollPosition = window.scrollY;
        setScrollPosition(currentScrollPosition);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [containerRef]);

  useEffect(() => {
    const headerSeparator =
      containerRef.current?.querySelector("#header_separator");

    if (headerSeparator) {
      if (scrollPosition > 100) {
        headerSeparator.classList.add("hide");
      } else {
        headerSeparator.classList.remove("hide");
      }
    }
  }, [scrollPosition]);

  return <div ref={containerRef}>{children}</div>;
};

export { ClientHeaderWrapper };
