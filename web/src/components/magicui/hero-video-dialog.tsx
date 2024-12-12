"use client";

import { Play, XIcon } from "lucide-react";
import { AnimatePresence, motion, Variants } from "motion/react";
import { useState } from "react";

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out";

interface HeroVideoProps {
  animationStyle?: AnimationStyle;
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
}

const animationVariants: Record<string, Variants> = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  "from-right": {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "top-in-bottom-out": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "left-in-right-out": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
};

function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
}: HeroVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [isPlayHovered, setIsPlayHovered] = useState(false);

  function openVideo() {
    setIsVideoOpen(true);
  }

  function closeVideo() {
    setIsVideoOpen(false);
  }

  const selectedAnimation = animationVariants[animationStyle];

  return (
    <div className="relative">
      <div className="relative cursor-pointer" onClick={openVideo}>
        <img
          src={thumbnailSrc}
          alt={thumbnailAlt}
          width={1920}
          height={1080}
          className="w-full rounded-2xl"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex size-24 items-center justify-center rounded-full border border-neutral-800 backdrop-blur-md transition-transform duration-300 ease-out"
            onMouseEnter={() => setIsPlayHovered(true)}
            onMouseLeave={() => setIsPlayHovered(false)}
          >
            <div
              className={`relative flex size-20 items-center justify-center rounded-full border border-neutral-800 backdrop-blur-2xl transition-all duration-300 ease-out ${
                isPlayHovered ? "scale-105" : "scale-100"
              }`}
            >
              <Play
                className="size-8 text-white"
                style={{
                  transform: isPlayHovered ? "scale(1.1)" : "scale(1)",
                  transition: "transform 0.3s ease",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
          >
            <motion.div
              {...selectedAnimation}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative mx-4 aspect-video w-full max-w-4xl md:mx-0"
            >
              <motion.button
                className="absolute -top-16 right-0 rounded-full bg-neutral-900/50 p-2 text-xl text-white ring-1 backdrop-blur-md"
                onClick={closeVideo}
                onHoverStart={() => setIsCloseHovered(true)}
                onHoverEnd={() => setIsCloseHovered(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <XIcon className="size-5" />
              </motion.button>
              <motion.div
                className="relative isolate z-[1] size-full overflow-hidden rounded-2xl border-2 border-white"
                animate={{ scale: isCloseHovered ? 0.98 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <iframe
                  src={videoSrc}
                  className="size-full rounded-2xl"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { HeroVideoDialog };
