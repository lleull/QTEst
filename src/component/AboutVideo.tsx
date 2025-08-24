import { useEffect, useState, useRef } from "react";
import { Play } from "lucide-react";
import { AnimatePresence, motion, useInView, useAnimationControls } from "framer-motion";

const variant1 = {
  visible: { opacity: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, transition: { duration: 0.5 } },
};

export default function AboutVideo() {
  const video_con = useRef<HTMLDivElement>(null);
  const isInView = useInView(video_con, { margin: "0px 0px -40% 0px", once: false });
  const controls = useAnimationControls();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  };

  useEffect(() => {
    controls.start(isInView ? "visible" : "hidden");
  }, [isInView, controls]);

  return (
    <div
      ref={video_con}
      className="relative w-full my-20 px-8 sm:px-[100px] flex flex-col items-center"
    >
      <motion.div
        variants={variant1}
        animate={controls}
        className="relative w-full max-w-5xl shadow-[0px_0px_50px_#ff000055] "
      >
        {/* <div className="absolute left-0 top-0 w-full h-full scale-105 bg-[radial-gradient(circle,_#ff0000_0%,_transparent_100%)]"></div> */}
        <video
          ref={videoRef}
          onWaiting={() => setIsBuffering(true)}
          onCanPlay={() => setIsBuffering(false)}
          className="relative w-full"
          loop
          muted
          controls={false}
        >
          <source src="/vid.mp4" type="video/mp4" />
        </video>
        <div className="absolute left-0 top-0 w-full h-full cursor-pointer" onClick={handlePlay}>
          <AnimatePresence>
            {isBuffering && (
              <>
                <motion.div
                  exit={{ opacity: 0 }}
                  className="absolute w-full h-full bg-black opacity-25"
                ></motion.div>
                <motion.div
                  initial={{ x: "-50%", y: "-50%" }}
                  exit={{ opacity: 0 }}
                  animate={{
                    rotate: 360,
                    transition: { repeat: Infinity, ease: "linear", duration: 1 },
                  }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 opacity-50 border-8 border-white border-t-transparent rounded-full"
                ></motion.div>
              </>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!isPlaying && (
              <>
                {!isBuffering && (
                  <motion.div
                    exit={{ opacity: 0 }}
                    className="absolute w-full h-full bg-black opacity-50"
                  ></motion.div>
                )}
                <motion.div
                  exit={{ opacity: 0 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-fit p-8 bg-red-600 rounded-full"
                >
                  <Play size={50} color="white" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
