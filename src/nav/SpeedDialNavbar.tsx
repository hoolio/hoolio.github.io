import { SpeedDial, SpeedDialAction } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CollectionsIcon from "@mui/icons-material/Collections";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SpeedDialNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

  return (
    <SpeedDial
      ariaLabel="Menu"
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      sx={{
        position: "fixed",
        top: "2rem",
        right: "2rem",
      }}
      FabProps={fabProps}
      icon={<MenuIcon />}
      direction="down"
    >
      {navItems.map((item) => (
        <SpeedDialAction
          key={item.label}
          icon={item.icon}
          tooltipTitle={item.label}
          FabProps={fabProps}
          onClick={item.onClick}
        />
      ))}
    </SpeedDial>
  );
};

export default SpeedDialNavbar;
