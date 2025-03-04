import { useRef } from "react";
import Running from "./running/Running";
import Engineering from "./engineering/Engineering";
import { Helmet } from "react-helmet";
// import Lego from "./lego/Lego";
import Music from "./music/Music";
import Writing from "./writing/Writing";
import scrollIntoView from "scroll-into-view";
import { ProjectTitles } from "../../const/projects";
import PortfolioCarousel from "../../components/PortfolioCarousel";
import PortfolioSlideshow from "../../components/PortfolioSlideshow";
import { MOBILE_WIDTH } from "../../const";

import "./index.css";

const PortfolioPage = () => {
  // Store a reference to each project component so we can auto-scroll to it
  const projectRefs = {
    [ProjectTitles.RUNNING]: useRef(null),
    [ProjectTitles.ENGINEERING]: useRef(null),
    // [ProjectTitles.LEGO]: useRef(null),
    [ProjectTitles.MUSIC]: useRef(null),
    [ProjectTitles.WRITING]: useRef(null),
  };

  // Auto-scroll to the project when selected
  const onCardClick = (title: ProjectTitles) => {
    if (projectRefs[title] && projectRefs[title].current) {
      scrollIntoView(projectRefs[title].current, {
        time: 5000,
      });
    }
  };

  const isMobileWidth = window.innerWidth <= MOBILE_WIDTH;

  return (
    <>
      <Helmet>
        <link rel="preload" href="/running/MtTamTrailRun.jpg" as="image" />
        <link rel="preload" href="/running/Track.jpg" as="image" />
        <link rel="preload" href="/running/TrailRun.jpg" as="image" />
        <link
          rel="preload"
          href="/engineering/BalsaEarthquakeTower.jpg"
          as="image"
        />
        <link rel="preload" href="/engineering/BalsaBridge.jpg" as="image" />
        <link
          rel="preload"
          href="/engineering/MixopterasModel.jpg"
          as="image"
        />
        <link
          rel="preload"
          href="/engineering/MixopterasModel2.jpg"
          as="image"
        />
      </Helmet>

      <div id="portfolioPage" className="flex flex-col">
        {isMobileWidth ? (
          <PortfolioSlideshow onCardClick={onCardClick} />
        ) : (
          <PortfolioCarousel onCardClick={onCardClick} />
        )}

        <div className="w-screen flex flex-col">
          <div ref={projectRefs[ProjectTitles.RUNNING]}>
            <Running />
          </div>
          <div ref={projectRefs[ProjectTitles.ENGINEERING]}>
            <Engineering />
          </div>
          {/* <div ref={projectRefs[ProjectTitles.LEGO]}>
          <Lego />
        </div> */}
          <div ref={projectRefs[ProjectTitles.MUSIC]}>
            <Music />
          </div>
          <div ref={projectRefs[ProjectTitles.WRITING]}>
            <Writing />
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioPage;
