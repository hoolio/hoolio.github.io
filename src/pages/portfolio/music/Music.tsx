import { Paper } from "@mui/material";
import cosmosSuiteAudio from "/music/cosmos-suite.m4a";
import * as motion from "motion/react-client";
import TypewriterText from "../../../components/TypewriterText";
import { MOBILE_WIDTH } from "../../../const";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "./index.css";

const ARCOS_URL = "https://youtube.com/embed/hMNlQQ3rgcA?si=BJZFmVQt-ST7SWOo";

const Music = () => {
  const isMobileWidth = window.innerWidth <= MOBILE_WIDTH;

  const containerClasses =
    "relative overflow-hidden w-screen flex flex-col items-center justify-center bg-amber-100 text-gray-700";

  const staffLine = (
    <motion.div
      className="border-t-2 mb-5 border-gray-700"
      initial={{ width: 0 }}
      whileInView={{ width: "100%" }}
      transition={{ duration: 2 }}
    ></motion.div>
  );

  const paperSx = {
    padding: isMobileWidth ? "2rem" : "4rem",
    marginLeft: isMobileWidth ? "2rem" : "4rem",
    marginRight: isMobileWidth ? "2rem" : "4rem",
    backgroundColor: "#fffced",
    width: isMobileWidth ? "90vw" : "60vw",
    display: "flex",
    flexDirection: "column",
  };

  const youtubeVideoAllowParams =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

  const textClassname = "text-sm lg:text-xl font-mono mb-5 text-justify";

  return (
    <div className={containerClasses}>
      <div
        className="absolute w-full"
        style={{ top: "50%", transform: "translate(0, -50%)" }}
      >
        {!isMobileWidth && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-right mr-4 font-mono">Rafael Maitra Avalos</p>
            <p className="text-right mr-4 mb-8 font-mono">(2021, 2024-25)</p>
          </motion.div>
        )}

        {/* Draws a music staff */}
        {staffLine}
        {staffLine}
        {staffLine}
        {staffLine}
        {staffLine}
        <div className="pt-5 pb-5"></div>
        {staffLine}
        {staffLine}
        {staffLine}
        {staffLine}
        {staffLine}
      </div>

      <Swiper
        className="music-swiper w-full h-full py-20 text-gray-700"
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
      >
        <SwiperSlide key={0} className="flex items-center justify-center">
          <Paper elevation={12} sx={paperSx}>
            <div className="flex flex-col flex-grow min-h-screen">
              <p className="text-2xl lg:text-6xl text-center mb-8 lg:mb-16 font-mono">
                The Cosmos Suite
              </p>

              <p className="text-sm lg:text-lg self-end mb-2 font-mono">
                2024-25
              </p>
              <TypewriterText
                text={musicDescription}
                className={textClassname}
                speed={7}
              />
            </div>
            <div className="mt-6">
              <audio className="w-full" controls>
                <source src={cosmosSuiteAudio} type="audio/mp4" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </Paper>
        </SwiperSlide>
        <SwiperSlide key={1} className="flex items-center justify-center">
          <Paper elevation={12} sx={paperSx}>
            <div className="flex flex-col mb-10">
              <p className="text-2xl lg:text-6xl text-center mb-8 lg:mb-16 font-mono">
                Arco
              </p>
              <p className="text-sm lg:text-lg self-end mb-2 font-mono">2021</p>
              <div
                className="relative w-full"
                style={{
                  paddingBottom: "56.25%" /* 16:9 aspect ratio */,
                  height: 0,
                }}
              >
                <iframe
                  className="absolute w-full h-full top-0 left-0"
                  src={ARCOS_URL}
                  allow={youtubeVideoAllowParams}
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </Paper>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Music;

const musicDescription = `The Cosmos Suite is a collection of four of my compositions for solo piano. These pieces embody an astronomy theme. <br><br>

  The first piece in the suite is named <i>Looking Through a Telescope</i>. The different shifts in the melody signify spotting different planets and stars in the night sky through a telescope. <br><br>

  The second piece in the suite is called <i>Swirling Nebula</i>. The piece's melodic pattern represents gas churning and revolving around a spiral nebula. <br><br>
  
  The third piece in the suite is called <i>The Pillars of Creation</i>. This piece is significantly shorter than the rest of the pieces in the suite. It has a bold, semi-dissonant, curious melody. I named this song <i>The Pillars of Creation</i> because when I see pictures of the astronomical features of the Pillars of Creation, I think of them as bold and curious, like my piece. <br><br>
  
  The final piece in the suite is named <i>The Stars That Shine</i>. This was one of the first pieces of the suite that I wrote. When I was first trying to come up with a name for the piece, I knew it had to be related to astronomy. The final piece in the suite epitomizes the incredible light from stars lightyears away that shine towards Earth.`;
