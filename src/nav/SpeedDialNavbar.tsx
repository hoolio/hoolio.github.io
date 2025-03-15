import { Divider, Fade, SpeedDial, SpeedDialAction } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CollectionsIcon from "@mui/icons-material/Collections";
import CreateIcon from "@mui/icons-material/Create";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import EngineeringIcon from "@mui/icons-material/Engineering";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MOBILE_WIDTH } from "../const";

const SpeedDialNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Automatically open the menu on home page
  useEffect(() => {
    const timer = setTimeout(() => {
      if (location.pathname === "/") {
        setOpen(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  // If the URL has a hash, scroll to that element
  useEffect(() => {
    if (location.hash) {
      // Take out the '#' at the beginning of the hash
      let el = document.getElementById(location.hash.substring(1));
      if (el) {
        // Wait 100ms to give the components time to finish rendering
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      // Scroll to the top if there's no hash
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.hash]);

  const fabProps = {
    sx: {
      bgcolor: "transparent",
      "&:hover": {
        bgcolor: "rgba(255, 255, 255, 0.2)",
      },
      color: "white",
      border: "2px solid white",
    },
  };

  const navItems = [
    {
      label: "Home",
      icon: <HomeIcon />,
      onClick: () => navigate("/"),
    },
    {
      label: "Portfolio",
      icon: <CollectionsIcon />,
      onClick: () => navigate("/portfolio"),
    },
  ];
  const subItems = [
    {
      label: "Running",
      icon: <DirectionsRunIcon />,
      onClick: () => navigate("/portfolio#running"),
    },
    {
      label: "Engineering",
      icon: <EngineeringIcon />,
      onClick: () => navigate("/portfolio#engineering"),
    },
    {
      label: "Music",
      icon: <MusicNoteIcon />,
      onClick: () => navigate("/portfolio#music"),
    },
    {
      label: "Writing",
      icon: <CreateIcon />,
      onClick: () => navigate("/portfolio#writing"),
    },
  ];

  const speedDialActionClick = (
    e: React.MouseEvent<HTMLDivElement>,
    item: any
  ) => {
    // Don't close the menu when clicking on an item
    e.stopPropagation();
    if (item.onClick) {
      item.onClick();
    }
  };

  const speedDialAction = (item: any) => (
    <SpeedDialAction
      key={item.label}
      icon={item.icon}
      slotProps={{
        tooltip: {
          title: item.label,
        },
        fab: fabProps,
      }}
      onClick={(e) => speedDialActionClick(e, item)}
    ></SpeedDialAction>
  );

  const isMobileWidth = window.innerWidth <= MOBILE_WIDTH;

  return (
    <SpeedDial
      ariaLabel="Menu"
      open={open}
      onOpen={handleOpen}
      sx={{
        position: "fixed",
        top: isMobileWidth ? "0.5rem" : "2rem",
        right: isMobileWidth ? "0.5rem" : "2rem",
      }}
      FabProps={fabProps}
      icon={<MenuIcon />}
      direction="down"
      onClick={() => (open ? handleClose() : handleOpen())}
    >
      {navItems.map((item) => speedDialAction(item))}

      <Fade in={open}>
        <Divider
          sx={{
            borderColor: "white",
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
          }}
        />
      </Fade>

      {subItems.map((item) => speedDialAction(item))}
    </SpeedDial>
  );
};

export default SpeedDialNavbar;
