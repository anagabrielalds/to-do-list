import React, { useRef } from "react";
import { Box, AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Button, Divider } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from "@mui/icons-material/Menu";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from "../context/theme";

const drawerWidth = 240;

export default function MenuApp() {

  const [open, setOpen] = React.useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const drawerRef = useRef(null);

  const menuItensUser = [
    { text: "Home", url: "/", icon: <HomeIcon /> },
    { text: "Categorias", url: "/category", icon: <CategoryIcon /> },
    { text: "Perfil", url: "/user", icon: <PersonIcon /> },
    { text: "Logout", url: "/logout", icon: <LogoutIcon /> }
  ]

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleOutsideClick = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <Box >
      <AppBar position="sticky" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Lista de Tarefas <TaskAltIcon />
          </Typography>
          <Box sx={{ flexGrow: 4, mr: 2, display: 'flex', justifyContent: 'right' }}>
            <Button
              onClick={toggleTheme}
              sx={{ my: 2, color: 'white' }}
            >
              {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
            </Button>
          </Box>
        </Toolbar>

      </AppBar>
  
      <Drawer
        ref={drawerRef}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            top: `64px`,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
         <Divider />
        <List>
          {menuItensUser.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton href={item.url}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
