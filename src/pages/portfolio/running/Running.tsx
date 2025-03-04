import { Masonry } from "@mui/lab";
import trackImg from "/running/Track.jpg";
import trailRunImg from "/running/TrailRun.jpg";
import { Paper } from "@mui/material";
import * as motion from "motion/react-client";
import { useMotionTemplate, useScroll, useTransform } from "motion/react";
import { MOBILE_WIDTH } from "../../../const";

import "./index.css";

const Running = () => {
  const { scrollYProgress } = useScroll();
  const vw = window.innerWidth / 100;
  const vh = window.innerHeight / 100;

  // Magnify effect when first scrolling into the page
  const containerScale = useMotionTemplate`scale(${useTransform(
    scrollYProgress,
    [0, 0.1],
    [1.2, 1]
  )})`;

  // Title animation
  const titleSlide = useTransform(scrollYProgress, [0, 0.1], [20 * vw, 2 * vw]);

  // Animations of the different texts on screen

  const leftHeaderOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const leftHeaderBlur = useMotionTemplate`blur(${useTransform(
    scrollYProgress,
    [0, 0.1],
    [15, 0]
  )}px)`;
  const leftHeaderSlide = useTransform(
    scrollYProgress,
    [0, 0.25],
    [0, 70 * vh]
  );

  // Image animations
  const trackImgY = useTransform(scrollYProgress, [0, 0.3], [300, -300]);
  const trailImgY = useTransform(scrollYProgress, [0, 0.5], [0, -600]);
  const trailImgYMobile = useTransform(
    scrollYProgress,
    [0, 0.5],
    [-300, -1200]
  );

  const isMobileWidth = window.innerWidth <= MOBILE_WIDTH;

  const containerClasses =
    "overflow-hidden w-screen flex flex-col items-center justify-center bg-[#7a967d]";

  return (
    <div className={containerClasses}>
      <motion.div style={{ transform: containerScale }}>
        <Masonry
          columns={isMobileWidth ? 2 : 3}
          spacing={0.01} // Bugged shrink animation if set to 0.
          sx={{
            borderTop: "1px solid white",
            marginTop: "1rem",
          }}
        >
          {/* Row 1 */}
          <div
            className={`relative border-r ${
              isMobileWidth && "border-b"
            } border-white`}
            style={{ height: "120vh" }}
          >
            <motion.p
              className="absolute text-2xl lg:text-4xl right-8 left-6"
              style={{
                top: leftHeaderSlide,
                opacity: leftHeaderOpacity,
                filter: leftHeaderBlur,
              }}
            >
              Running is my main and favorite physical activity
            </motion.p>
          </div>
          <div
            className="border-b border-white relative"
            style={{ height: "10vh" }}
          >
            <motion.p
              className="text-2xl absolute bottom-1"
              style={{
                left: titleSlide,
              }}
            >
              Running
            </motion.p>
          </div>

          {!isMobileWidth && (
            <div className="border-b border-white" style={{ height: "10vh" }} />
          )}

          {/* Row 2 */}
          <div
            className={`relative border-b ${
              !isMobileWidth && "border-r"
            } border-white`}
            style={{ height: "40vh" }}
          >
            <motion.div style={{ y: trackImgY }}>
              <Paper
                className="absolute -left-8 top-10 p-3"
                sx={{ boxShadow: "5px 10px 30px rgba(0,0,0,0.3)" }}
                square
              >
                <img id="trackImg" src={trackImg}></img>
              </Paper>
            </motion.div>
          </div>
          <div
            className="flex items-center justify-center border-b border-white"
            style={{ height: "40vh" }}
          >
            <p className="text-sm lg:text-xl px-4">
              My relationship with running started when I moved to Marin County,
              California. Marin is a real gateway, connecting San Francisco to
              our south with wine country to the north. I love the nature here,
              and running the Marin trails lets me experience it often and
              first-hand.
            </p>
          </div>

          {/* Row 3 */}
          <div className="relative" style={{ height: "60vh" }}>
            <p
              className="absolute text-xl left-2 -z-10"
              style={isMobileWidth ? { bottom: "30vh" } : { bottom: "10vh" }}
            >
              I like getting better and working on my form and stamina
            </p>
          </div>
          <div style={{ height: isMobileWidth ? "40vh" : "60vh" }}>
            <div className="w-1/2 h-full border-r border-white"></div>
          </div>

          {/* Row 4 */}
          <div style={{ height: isMobileWidth ? "20vh" : "40vh" }}></div>
          <div className="relative" style={{ height: "40vh" }}>
            <div className="w-1/2 h-full border-r border-white"></div>
            <motion.div
              style={{ y: isMobileWidth ? trailImgYMobile : trailImgY }}
            >
              <Paper
                className="absolute p-3"
                sx={{
                  boxShadow: "5px 10px 30px rgba(0,0,0,0.3)",
                  left: isMobileWidth ? "5vw" : "-15vw",
                  top: "5vh",
                }}
                square
              >
                <img id="trailRunImg" src={trailRunImg}></img>
              </Paper>
            </motion.div>
          </div>

          {/* Row 5 */}
          <div
            className={`relative ${
              !isMobileWidth && "border-r"
            } border-b border-white`}
            style={{ height: isMobileWidth ? "40vh" : "70vh" }}
          >
            <p className="absolute text-sm lg:text-xl right-4 -top-40 lg:top-0 text-right">
              Since 2020, I've been lucky to have the same director of my
              homeschool, YiOu Wang. On top of being a great teacher and leader,
              YiOu is one of the greatest long-distance trail runners in the
              world. She's sponsored and participates in races all over the
              globe. She got me and my sisters into trail running, and it's been
              terrific. I've competed in the world-famous Dipsea Race many years
              in a row, which starts in Mill Valley and runs up and over the Mt.
              Tam mountains and onto Stinson Beach. I like surfing there, too!
            </p>
          </div>
          <div
            className="relative border-b border-white overflow-visible"
            style={{ height: isMobileWidth ? "10vh" : "40vh" }}
          >
            <p
              className={`absolute text-xl bottom-2 ${
                isMobileWidth ? "left-2" : "right-0"
              } whitespace-nowrap`}
            >
              I love to run every week on the trails!
            </p>
          </div>
          <div style={{ height: isMobileWidth ? "20vh" : "40vh" }}>
            <div className="w-1/2 h-full border-r border-white"></div>
          </div>

          {/* Row 6 */}
          {!isMobileWidth && (
            <>
              <div style={{ height: "5vh" }}></div>
              <div style={{ height: "5vh" }}></div>
              <div style={{ height: "5vh" }}></div>
            </>
          )}
        </Masonry>
      </motion.div>
    </div>
  );
};

export default Running;
