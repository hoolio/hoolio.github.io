import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { projects, ProjectTitles } from "../const/projects";
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import { useState } from "react";
import * as motion from "motion/react-client";

interface PortfolioCarouselProps {
  onCardClick: (title: ProjectTitles) => void;
}

// https://swiperjs.com/demos#effect-coverflow
const PortfolioCarousel = (props: PortfolioCarouselProps) => {
  // Creates a spotlight effect
  const background = `radial-gradient(
    ellipse 80% 30% at 50% 80%,
    rgb(220, 220, 220) 20%,
    rgb(184, 168, 140) 60%
  )`;

  const cardSx = {
    position: "absolute",
    left: 0,
    width: "100%",
    background: "rgba(150, 150, 150, 0.6)",
    color: "white",
    "& .MuiCardHeader-subheader": {
      color: "white",
    },
  };

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      style={{ background }}
      className="w-screen h-screen flex items-center justify-center"
    >
      <Swiper
        className="w-11/12 pt-20 pb-20"
        effect={"coverflow"}
        modules={[Navigation, Pagination, EffectCoverflow]}
        spaceBetween={0}
        slidesPerView={2}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 20,
          stretch: 300,
          depth: 100,
          modifier: 1,
          slideShadows: true,
          scale: 0.8,
        }}
        style={{
          animation: "fadeAndSlide 500ms ease-out",
        }}
        pagination
        navigation
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {projects.map((project, index) => {
          const cardBody = (
            <Card sx={{ maxHeight: "60vh" }}>
              <CardHeader
                title={project.title}
                subheader={project.subheader}
                sx={{
                  ...cardSx,
                  top: 0,
                }}
              />
              <CardMedia
                component="img"
                image={project.img}
                sx={{
                  objectFit: "cover",
                  height: "100%",
                }}
              />
              {project.content && (
                <CardContent
                  sx={{
                    ...cardSx,
                    bottom: 0,
                  }}
                >
                  <p>{project.content}</p>
                </CardContent>
              )}
            </Card>
          );
          return (
            <SwiperSlide key={index}>
              {index === activeIndex ? (
                <motion.div
                  className="cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => props.onCardClick(project.title)}
                >
                  {cardBody}
                </motion.div>
              ) : (
                cardBody
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default PortfolioCarousel;
