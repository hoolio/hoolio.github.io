import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { projects, ProjectTitles } from "../const/projects";
import { EffectCreative } from "swiper/modules";
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import { useEffect, useState } from "react";

interface PortfolioSlideshowProps {
  onCardClick: (title: ProjectTitles) => void;
}

// https://swiperjs.com/demos#effect-creative
const PortfolioSlideshow = (props: PortfolioSlideshowProps) => {
  // Creates a spotlight effect
  const background = `radial-gradient(
    ellipse 100% 15% at 50% 80%,
    rgb(220, 220, 220) 20%,
    rgb(184, 168, 140) 60%
  )`;

  const cardSx = {
    width: "100%",
    background: "rgba(100, 100, 100, 0.3)",
    color: "white",
    "& .MuiCardHeader-subheader": {
      color: "white",
    },
  };

  // To indicate that the card is swipe-able, run an automatic swipe on page
  // load.
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  useEffect(() => {
    if (swiperInstance) {
      setTimeout(() => {
        swiperInstance.slideNext(500);
      }, 300);
    }
  }, [swiperInstance]);

  return (
    <div
      className="w-screen h-screen flex items-center justify-center"
      style={{ background }}
    >
      <Swiper
        onSwiper={setSwiperInstance}
        effect={"creative"}
        className="w-5/6"
        creativeEffect={{
          prev: {
            opacity: 0,
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
            opacity: 1,
          },
        }}
        style={{
          animation: "fade 500ms ease-out",
        }}
        // Start at the last slide since we run an automatic swipe
        initialSlide={projects.length - 1}
        modules={[EffectCreative]}
        loop
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <Card
              onClick={() => props.onCardClick(project.title)}
              sx={{ height: "50vh", background: "none" }}
              className="flex flex-col"
            >
              <CardHeader
                title={<p className="text-sm">{project.title}</p>}
                subheader={<p className="text-xs">{project.subheader}</p>}
                sx={cardSx}
              />
              <CardMedia
                component="img"
                className="flex-grow"
                image={project.img}
              />
              <CardContent sx={cardSx}>
                <p className="text-xs">{project.content}</p>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PortfolioSlideshow;
