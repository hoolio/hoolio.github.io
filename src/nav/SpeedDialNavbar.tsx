import { Divider, Fade, SpeedDial, SpeedDialAction } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CollectionsIcon from "@mui/icons-material/Collections";
import CreateIcon from "@mui/icons-material/Create";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import EngineeringIcon from "@mui/icons-material/Engineering";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { HashLink } from "react-router-hash-link";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

  // navigate() doesn't work with anchor links (#), so we use HashLink
  // instead.
  const navItems = [
    {
      label: "Home",
      icon: <HomeIcon />,
      onClick: () => navigate("/"),
    },
    {
      label: "Portfolio",
      icon: (
        <HashLink smooth to="/portfolio#">
          <CollectionsIcon />
        </HashLink>
      ),
    },
  ];
  const subItems = [
    {
      label: "Running",
      icon: (
        <HashLink smooth to="/portfolio#running">
          <DirectionsRunIcon />
        </HashLink>
      ),
    },
    {
      label: "Engineering",
      icon: (
        <HashLink smooth to="/portfolio#engineering">
          <EngineeringIcon />
        </HashLink>
      ),
    },
    {
      label: "Music",
      icon: (
        <HashLink smooth to="/portfolio#music">
          <MusicNoteIcon />
        </HashLink>
      ),
    },
    {
      label: "Writing",
      icon: (
        <HashLink smooth to="/portfolio#writing">
          <CreateIcon />
        </HashLink>
      ),
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

  const onPortfolioPage = location.pathname.includes("portfolio");

  return (
    <SpeedDial
      ariaLabel="Menu"
      open={open}
      onOpen={handleOpen}
      sx={{
        position: "fixed",
        top: "2rem",
        right: "2rem",
      }}
      FabProps={fabProps}
      icon={<MenuIcon />}
      direction="down"
      onClick={() => (open ? handleClose() : handleOpen())}
    >
      {navItems.map((item) => speedDialAction(item))}
      {onPortfolioPage && (
        <Fade in={open}>
          <Divider
            sx={{
              borderColor: "white",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            }}
          />
        </Fade>
      )}

      {onPortfolioPage && subItems.map((item) => speedDialAction(item))}
    </SpeedDial>
  );
};

export default SpeedDialNavbar;
