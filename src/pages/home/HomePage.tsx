import { useEffect } from "react";
import * as motion from "motion/react-client";

import forestPan from "/forest-pan.mp4";
import spaceTimelapse from "/space-timelapse.mp4";
import {
  useAnimate,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";

const HomePage = () => {
  const gradientRange = "rgba(20, 20, 20, 1) 10%, rgba(20, 20, 20, 0)";

  const [forestVideoRef, animate] = useAnimate();

  // Video play speed starts fast (16x), then slows to normal (1x)
  const motionValue = useMotionValue(16);
  const springValue = useSpring(motionValue, { stiffness: 25, damping: 20 });
  useEffect(() => {
    // Begin speed transition
    motionValue.set(1);

    const unsubscribe = springValue.on("change", () => {
      if (forestVideoRef.current) {
        forestVideoRef.current.playbackRate = springValue.get();
      }
    });

    return () => unsubscribe();
  }, []);

  // Animate the zoom and opacity of the video
  const forestAnimateDuration = 1.5;
  const forestScale = useMotionValue(2);
  const forestTransform = useMotionTemplate`scale(${forestScale})`;
  useEffect(() => {
    animate(forestScale, 1, {
      duration: forestAnimateDuration,
      ease: "easeOut",
    });

    if (forestVideoRef.current) {
      animate(
        forestVideoRef.current,
        { opacity: 1 },
        { duration: forestAnimateDuration, ease: "easeOut" }
      );
    }
  }, [animate, forestScale]);

  // After the above animations are finished, fade in title
  const titleFadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: forestAnimateDuration,
      },
    },
  };

  return (
    <div className="relative flex flex-col">
      <div className="relative w-screen h-screen flex items-center justify-center">
        <motion.video
          ref={forestVideoRef}
          className="absolute [z-index:-1] h-screen w-auto min-w-full object-cover"
          style={{ transform: forestTransform, opacity: 0 }}
          crossOrigin="anonymous"
          playsInline={true}
          preload="auto"
          muted={true}
          loop={true}
          autoPlay={true}
          src={forestPan}
        ></motion.video>

        <div>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={titleFadeInVariants}
            className="text-6xl lg:text-8xl text-center"
          >
            Rafael Maitra Avalos
          </motion.p>
        </div>

        <div
          className="w-full absolute bottom-0"
          style={{
            height: "12vh",
            background: `linear-gradient(to top, ${gradientRange})`,
          }}
        ></div>
      </div>

      <div className="relative w-screen h-screen flex justify-center">
        <div
          className="w-full absolute top-0"
          style={{
            height: "12vh",
            background: `linear-gradient(to bottom, ${gradientRange})`,
          }}
        ></div>

        <video
          className="absolute [z-index:-1] h-screen w-auto min-w-full object-cover"
          crossOrigin="anonymous"
          playsInline={true}
          preload="auto"
          muted={true}
          loop={true}
          autoPlay={true}
          src={spaceTimelapse}
        ></video>

        <div className="flex flex-col p-12 mt-28 h-2/3 overflow-scroll lg:ml-24">
          <p className="text-white text-sm lg:text-xl lg:w-1/2">
            I was born and raised in San Francisco. I'm the middle child, but it
            hasn't been as tough as the books and movies make it out to be. I
            have one older and one younger sister. I get along and have a lot of
            fun with both of them. When I was six, our family made a big move to
            Madrid, Spain, where I spent two years at an independent British
            school. After two years, we returned to California, but instead of
            going back to San Francisco, we settled in the wilder hills of Marin
            County and started a homeschool with independent teachers.
          </p>
          <p className="mt-4 text-white text-sm lg:text-xl lg:w-1/2">
            In just a few years, I'd gone from a French school in San Francisco,
            to a British school in Madrid, a homeschool in the woods, and, now,
            also an online school with Stanford. For me, it's been great. It was
            a beautiful change of scenery. Homeschooling offered a different
            pace of life and a chance to explore my interests in a more flexible
            environment. There are trails all over my neighborhood and I started
            hiking and long-distance trail running. I loved trail running so
            much that I joined a club and started competing in races.
          </p>

          <p className="mt-4 text-white text-sm lg:text-xl lg:w-1/2">
            In my free time, I love to read and write. I read everything from
            American fantasy to Japanese manga, along with classics and
            everything else, in between. I also like drawing, coding, building,
            and learning and making music. I’ve been taking piano and electronic
            music production for years!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
