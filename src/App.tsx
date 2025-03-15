import { Route, Routes, useLocation } from "react-router-dom";
import SpeedDialNavbar from "./nav/SpeedDialNavbar";
import HomePage from "./pages/home/HomePage";
import PortfolioPage from "./pages/portfolio/PortfolioPage";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

const videos = ["/forest-pan.mp4", "/space-timelapse.mp4"];
const images = [
  "/running/MtTamTrailRun.jpg",
  "/running/Track.jpg",
  "/running/TrailRun.jpg",
  "/engineering/BalsaEarthquakeTower.jpg",
  "/engineering/BalsaBridge.jpg",
  "/engineering/MixopterasModel.jpg",
  "/engineering/MixopterasModel2.jpg",
  "/writing/writing-1.jpg",
];

// Videos are stored in cache when fetched with fetch(), whereas images must
// be loaded with an img element.
const prefetchMedia = async () =>
  Promise.all(
    videos
      .map((src) =>
        fetch(src).then((res) => {
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        })
      )
      .concat(
        images.map(
          (src) =>
            new Promise<void>((resolve, reject) => {
              const img = new Image();
              img.src = src;
              img.onload = () => resolve();
              img.onerror = (e) =>
                reject(new Error(`Failed to load ${src}: ${e}`));
            })
        )
      )
  );

const App = () => {
  const { pathname } = useLocation();

  // Ensure we start at the top of the page when navigating pages.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Browser also preserves scroll position when refreshing, which messes up
  // the animations. Disable it here.
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  // Don't display the page until images and videos are fully loaded
  const [prefetchComplete, setPrefetchComplete] = useState(false);
  useEffect(() => {
    prefetchMedia()
      .then(() => setPrefetchComplete(true))
      .catch((err) => console.error("Error preloading media:", err));
  }, []);

  if (!prefetchComplete) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <CircularProgress size={80} />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <SpeedDialNavbar />
      <p className="fixed bottom-4 right-4 z-10 lg:text-2xl">
        rafael.m.avalos@icloud.com
      </p>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
