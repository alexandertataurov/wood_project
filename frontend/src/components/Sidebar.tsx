import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import { Menu, Home, Info, AccountCircle, Login, Logout, PersonAdd } from "@mui/icons-material";
import { Settings } from "@mui/icons-material";


const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Кнопка открытия меню */}
      <IconButton onClick={toggleDrawer(true)} sx={{ position: "absolute", top: 15, left: 15, color: "white" }}>
        <Menu />
      </IconButton>

      {/* Боковое меню */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Главная" />
          </ListItem>
          <ListItem button component={Link} to="/about" onClick={toggleDrawer(false)}>
            <ListItemIcon><Info /></ListItemIcon>
            <ListItemText primary="О проекте" />
          </ListItem>

          {user ? (
            <>
              <ListItem button component={Link} to="/profile" onClick={toggleDrawer(false)}>
                <ListItemIcon><AccountCircle /></ListItemIcon>
                <ListItemText primary="Профиль" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemIcon><Logout /></ListItemIcon>
                <ListItemText primary="Выйти" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button component={Link} to="/login" onClick={toggleDrawer(false)}>
                <ListItemIcon><Login /></ListItemIcon>
                <ListItemText primary="Вход" />
              </ListItem>
              <ListItem button component={Link} to="/register" onClick={toggleDrawer(false)}>
                <ListItemIcon><PersonAdd /></ListItemIcon>
                <ListItemText primary="Регистрация" />
              </ListItem>
            </>
          )}
          {user && (
            <ListItem button component={Link} to="/settings" onClick={toggleDrawer(false)}>
              <ListItemIcon><Settings /></ListItemIcon>
              <ListItemText primary="Настройки" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
