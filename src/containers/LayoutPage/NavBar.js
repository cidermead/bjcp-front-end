import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';
import AppBar from '@material-ui/core/AppBar/AppBar';
import InfoIcon from '@material-ui/icons/Info';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { withStyles } from "@material-ui/core";
import { barStyles } from './Styles';

const NavBar = ({ classes, handleDrawerToggle }) => (
  <AppBar position="fixed" className={classes.appBar}>
    <Toolbar>
      <Grid container spacing={1} alignItems="center">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          BJCP Exam Prep
        </Typography>
        <Grid item xs />
        <Grid item>
          <Tooltip title="Donate">
            <NavLink
              className={classes.navLink}
              to="/donate"
            >
              <IconButton color="inherit">
                <AttachMoneyIcon />
              </IconButton>
            </NavLink>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="About">
            <NavLink
              className={classes.navLink}
              to="/about"
            >
              <IconButton color="inherit">
                <InfoIcon />
              </IconButton>
            </NavLink>
          </Tooltip>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(barStyles)(NavBar);
