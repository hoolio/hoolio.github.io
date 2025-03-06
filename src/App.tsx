import { Route, Routes, useLocation } from "react-router-dom";
import SpeedDialNavbar from "./nav/SpeedDialNavbar";
import HomePage from "./pages/home/HomePage";
import PortfolioPage from "./pages/portfolio/PortfolioPage";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

const forestPan = "/forest-pan.mp4";
const spaceTimelapse = "/space-timelapse.mp4";
const prefetchVideos = async (sources: string[]) =>
  Promise.all(
    sources.map((src) =>
      fetch(src)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        })
        .catch((err) => console.error("Video prefetch failed:", err))
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

  // Don't display the page until videos are fully loaded
  const [videosLoaded, setVideosLoaded] = useState(false);
  useEffect(() => {
    prefetchVideos([forestPan, spaceTimelapse])
      .then(() => setVideosLoaded(true))
      .catch((err) => console.error("Error preloading videos:", err));
  }, []);

  if (!videosLoaded) {
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
