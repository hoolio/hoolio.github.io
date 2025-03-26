import { Button, Grid2 } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import balsaBridgeImg from "/engineering/BalsaBridge.jpg";
import balsaTowerImg from "/engineering/BalsaEarthquakeTower.jpg";
import mixoModel from "/engineering/MixopterasModel.jpg";
import mixoModel2 from "/engineering/MixopterasModel2.jpg";

import * as motion from "motion/react-client";
import {
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useState } from "react";
import { MOBILE_WIDTH } from "../../../const";

const BIRD_DESIGN_DOC_URL =
  "https://docs.google.com/document/d/1bY2uUNabcpcHDA_o5yMPObdpWLupojX4gUrv_6asOCg/edit?usp=sharing";
const BIRD_VIDEO_URL =
  "https://www.youtube.com/embed/SKW1gxlzTO8?si=AQ-LFQJZan_NNdGt";
const FROG_HOUSE_VIDEO_URL =
  "https://www.youtube.com/embed/L6i_Yp8Pn6Y?si=YOv6yp0I7JSuKcNb";

const Engineering = () => {
  const isMobileWidth = window.innerWidth <= MOBILE_WIDTH;

  const { scrollYProgress } = useScroll();
  const vh = window.innerHeight / 100;

  // Title animation parameters
  const titleSlide = useMotionTemplate`translateY(${useTransform(
    scrollYProgress,
    isMobileWidth ? [0.15, 0.35] : [0.2, 0.4],
    [-15 * vh, 0]
  )}px)`;

  // Grid animation parameters

  // Space between grids shrink as page scrolls (except on mobile)
  const gridSpacingTransform = useTransform(
    scrollYProgress,
    [0.2, 0.6],
    [4, 1]
  );
  const [gridSpacing, setGridSpacing] = useState(4);
  useMotionValueEvent(gridSpacingTransform, "change", (v: any) =>
    setGridSpacing(v)
  );

  // 12 units = 1 column grid, 6 units = 2 column grid
  const gridSize = isMobileWidth ? 12 : 6;

  const slideInitial = { opacity: 0, y: -40 };
  const slideInView = { opacity: 1, y: 0 };
  const slideViewport = { amount: 0.8 as const }; // Fixes type check
  const slideTransition = { duration: 0.5 };

  const mixoStyle = isMobileWidth ? { width: "80vw" } : { height: "38vh" };

  const youtubeVideoAllowParams =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

  const containerClasses =
    "relative overflow-hidden w-screen flex flex-col items-center justify-center bg-slate-800";

  return (
    <motion.div className={containerClasses}>
      <motion.p
        className="absolute top-4 text-4xl"
        style={{ right: "5vw", transform: titleSlide }}
      >
        Engineering
      </motion.p>
      <motion.p
        className="text-lg mt-24 px-8 lg:px-24"
        initial={slideInitial}
        whileInView={slideInView}
        viewport={slideViewport}
        transition={slideTransition}
      >
        I've always been interested in Engineering and think that I when I grow
        up, I may want to be an Engineer. I don't know exactly what form it will
        take, but I love building, tinkering, coding, and taking things apart
        and putting them back together.
      </motion.p>
      <motion.p
        className="text-lg px-8 mt-4 self-start lg:px-24"
        initial={slideInitial}
        whileInView={slideInView}
        viewport={slideViewport}
        transition={slideTransition}
      >
        These are examples of some my more recent engineering projects:
      </motion.p>

      {/* Balsa projects */}
      <Grid2
        sx={{
          marginTop: "5vh",
          marginBottom: "10vh",
          paddingLeft: "5vw",
          paddingRight: "5vw",
          width: "100%",
        }}
        container
        spacing={isMobileWidth ? 0 : gridSpacing}
      >
        <Grid2
          className="flex flex-col border-r border-b border-white pt-4 pr-4"
          size={gridSize}
        >
          <motion.p
            className="text-2xl text-right mb-4 mr-4"
            initial={slideInitial}
            whileInView={slideInView}
            viewport={slideViewport}
            transition={slideTransition}
          >
            Balsa projects
          </motion.p>

          <motion.div
            className={`flex ${isMobileWidth && "flex-col"} m-4 items-center`}
            initial={slideInitial}
            whileInView={slideInView}
            viewport={slideViewport}
            transition={slideTransition}
          >
            <motion.p className="mb-4 lg-mb-0 lg:mr-8 text-right">
              As part of a larger project on physics, weight distribution, and
              material sciences, I built a balsa wood bridge. The point of the
              experiment was to make a bridge that would be able to handle heavy
              weights and loads of pressure under a real-life scenario,
              including a forceful earthquake.
            </motion.p>
            <motion.img
              style={{ width: isMobileWidth ? "80vw" : "25vw" }}
              src={balsaBridgeImg}
            ></motion.img>
          </motion.div>
          <motion.div
            className={`flex ${isMobileWidth && "flex-col"} m-4 items-center`}
            initial={slideInitial}
            whileInView={slideInView}
            viewport={slideViewport}
            transition={slideTransition}
          >
            <motion.img
              style={{ width: isMobileWidth ? "80vw" : "25vw" }}
              src={balsaTowerImg}
            ></motion.img>
            <motion.p className="mt-4 lg:mt-0 lg:ml-8">
              I learned a lot and was happy with how my bridge performed. It did
              better than I thought it was going to! But under extreme pressure
              it also crumbled, which gave me a number of ideas on how to
              improve the design, which I documented and planned for in later
              projects.
            </motion.p>
          </motion.div>
        </Grid2>

        {/* Bird model */}

        <Grid2
          className="border-l border-b border-white pl-4 pb-4"
          size={gridSize}
        >
          <motion.div
            initial={slideInitial}
            whileInView={slideInView}
            viewport={slideViewport}
            transition={slideTransition}
          >
            <p className="text-2xl mb-2 ml-4 mt-4">Bird model</p>
            <div className="ml-4">
              <Button
                variant="outlined"
                sx={{ color: "white" }}
                endIcon={<LaunchIcon />}
                href={BIRD_DESIGN_DOC_URL}
                target="_blank"
              >
                Design doc
              </Button>
            </div>
          </motion.div>

          <motion.div className="flex flex-col m-4">
            <motion.div
              initial={slideInitial}
              whileInView={slideInView}
              viewport={slideViewport}
              transition={slideTransition}
            >
              <p className="my-4">
                I have always been fascinated with birds and bird flight. I
                wanted to build an animatronic model that accurately
                demonstrated the beatings of an eagle's wings. By using balsa
                wood, servo motors, super glue, screws, a 9-volt battery, and an
                Arduino Uno circuit board, I constructed a golden eagle model
                bird.
              </p>
              <p className="my-2">
                First, I drew a detailed to-scale sketch of the eagle. Then I
                programmed and tested the Arduino Uno board to move the servos
                at the correct angles to imitate bird flight. Next, I cut out
                the different parts of the eagle out of balsa wood such as the
                wings, the body, and the head. Then, I glued and screwed all the
                different components together. Finally, I connected a power
                source. I built this model to capture the lifelike beatings of a
                golden eagle's wings.
              </p>
            </motion.div>
            <motion.div
              className="relative w-full mt-8"
              style={{
                paddingBottom: "56.25%" /* 16:9 aspect ratio */,
                height: 0,
              }}
              initial={slideInitial}
              whileInView={slideInView}
              viewport={slideViewport}
              transition={slideTransition}
            >
              <iframe
                className="absolute w-full h-full top-0 left-0"
                src={BIRD_VIDEO_URL}
                allow={youtubeVideoAllowParams}
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        </Grid2>

        {/* Frog house */}

        <Grid2
          className="border-r border-t border-white pt-8 pr-8"
          size={gridSize}
        >
          <motion.p
            className="text-2xl text-right mb-4"
            initial={slideInitial}
            whileInView={slideInView}
            viewport={slideViewport}
            transition={slideTransition}
          >
            Frog house
          </motion.p>

          <motion.p
            className="my-2"
            initial={slideInitial}
            whileInView={slideInView}
            viewport={slideViewport}
            transition={slideTransition}
          >
            I had this idea to help people in crisis, such as in a flood or an
            earthquake. By using legos, I created a mobile unit that would
            assist people in need and contain necessary medical, basic, and
            emotional support.
          </motion.p>

          <motion.div
            className="relative w-full mt-8 pr-4 mb-8 lg:mb-0"
            style={{
              paddingBottom: "56.25%" /* 16:9 aspect ratio */,
              height: 0,
            }}
            initial={slideInitial}
            whileInView={slideInView}
            viewport={slideViewport}
            transition={slideTransition}
          >
            <iframe
              className="absolute w-full h-full top-0 left-0"
              src={FROG_HOUSE_VIDEO_URL}
              allow={youtubeVideoAllowParams}
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </motion.div>
        </Grid2>

        {/* Mixopteras */}

        <Grid2
          className="border-l border-t border-white pl-8 pt-8"
          size={gridSize}
        >
          <motion.p
            className="text-2xl mb-4"
            initial={slideInitial}
            whileInView={slideInView}
            viewport={slideViewport}
            transition={slideTransition}
          >
            Mixopteras
          </motion.p>
          <motion.div className="flex flex-col">
            <motion.div
              initial={slideInitial}
              whileInView={slideInView}
              viewport={slideViewport}
              transition={slideTransition}
            >
              <p>
                This is a paper-mache model of an ancient sea scorpion. The
                purpose of the exercise was to replicate the Mixoptera's
                movements, abilities, and habits. And the ultimate purpose was
                to gain an insight into the way these fascinating sea creatures
                actually lived.
              </p>
            </motion.div>

            <motion.div className="flex flex-col lg:flex-row mt-12">
              <motion.img
                className="mr-8 mb-6 lg:mb-0"
                style={mixoStyle}
                src={mixoModel}
                initial={slideInitial}
                whileInView={slideInView}
                viewport={slideViewport}
                transition={slideTransition}
              ></motion.img>
              <motion.img
                style={mixoStyle}
                src={mixoModel2}
                initial={slideInitial}
                whileInView={slideInView}
                viewport={slideViewport}
                transition={slideTransition}
              ></motion.img>
            </motion.div>
          </motion.div>
        </Grid2>
      </Grid2>
    </motion.div>
  );
};

export default Engineering;
