'use client'
import React, { LegacyRef, MutableRefObject, useEffect, useRef } from 'react'
import SectionLayout from './SectionLayout'
import {motion, useScroll, useTransform} from 'framer-motion'
import styles from './VideoSection.module.scss'
function VideoSection({url}:{url:string}) {
    const video = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: video,
      offset: ["start end", "end start"],
    });
  
    const opacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 1, 0]);
    const scale = useTransform(
      scrollYProgress,
      [0, 0.6, 0.8, 0.9],
      [1, 0.8, 0.8, 0]
    );
    const videoRef = useRef<MutableRefObject<LegacyRef<HTMLVideoElement>>>(null);

    useEffect(() => {
        setTimeout(()=>{
        //    @ts-ignore
             videoRef.current?.play()
        },5000)
    }, [videoRef]);
  return (
    <SectionLayout>
    <motion.div
      className={styles.video}
      ref={video}
      style={{
        opacity,
        scale,
      }}
    >
      <video
        id="background-video"
        loop
        // @ts-ignore
        ref={videoRef}
        autoPlay
        muted
        style={{
          position: "relative",
          width: "100%",
          height: "15rem",
          left: 0,
          top: 0,
        }}
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* <iframe
        src="https://www.youtube.com/embed/OuaUjkZhfqQ"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe> */}
    </motion.div>
  </SectionLayout>
  )
}

export default VideoSection