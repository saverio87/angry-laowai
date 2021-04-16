import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Hidden } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../src/logo_small.png";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    padding: "0.1rem",
    backgroundColor: "lightsteelblue",
    color: "#f9fafd",
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1,
    },
  },
  links: {
    flexGrow: 1,
  },
  linksContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="regular">
          <Typography variant="h5" className={classes.title}>
            <Box
              textAlign="left"
              fontFamily="Inter"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img src={logo} style={{ width: "2rem" }} /> &nbsp;Angry Laowai
            </Box>
          </Typography>
          <Hidden only={["sm", "xs"]}>
            <Typography className={classes.links}>
              <Grid container spacing={4} className={classes.linksContainer}>
                <Grid item>Reports</Grid>
                <Grid item>Submit a report</Grid>
                <Grid item>FAQ</Grid>
              </Grid>
            </Typography>
          </Hidden>

          <Hidden only={["xl", "lg", "md"]}>
            <div>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Reports</MenuItem>
                <MenuItem onClick={handleClose}>Submit report</MenuItem>
              </Menu>
            </div>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}
