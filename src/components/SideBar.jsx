import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import logo from "/src/assets/logo.svg";
import { ListItemButton } from "@mui/material";
import Divider from "@mui/material/Divider";
import FaceIcon from "@mui/icons-material/Face";
import { Link } from "react-router-dom";
import '/src/styles/sidebar.css'
import SearchIcon from '@mui/icons-material/Search';

function Sidebar(username) {
  username = "Peter";
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{width: "200px",
        flexShrink:0,
        '& .MuiDrawer-paper': {
          width: "200px",
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <img src={logo}
                 style={{
                   alignSelf: "center",
                   width: "90px",
                   marginBottom: "20px"
                 }}
                 alt="Breddit" />
          </ListItemIcon>
        </ListItem>
        <Link className={"appLink"} to={"/"}>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </Link>
        <Link className={"appLink"} to={"/create"}><ListItemButton>
          <ListItemIcon>
            <AddCircleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Make a post" />
        </ListItemButton></Link>
        <Link className={"appLink"} to={"/search"}><ListItemButton>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItemButton></Link>
        <Divider></Divider>
        <ListItemButton>
          <ListItemIcon>
            <FaceIcon />
          </ListItemIcon>
          <ListItemText>
            Logged in as {username}
          </ListItemText>
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export default Sidebar;
