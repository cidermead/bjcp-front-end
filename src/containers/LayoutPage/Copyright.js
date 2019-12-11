import React from 'react';
import {withStyles} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

import { NavLink } from 'react-router-dom';

import { copyrightStyles } from './Styles';
import PropTypes from "prop-types";

const text = {
  copyRightYear: new Date().getFullYear(),
  projectName: 'BJCP Exam Prep',
};

const Copyright = ({ classes }) => (
  <Typography
    variant="body2"
    color="textSecondary"
    align="center"
  >
    {'Copyright © '}
    <NavLink color="inherit" to="/copyright" className={classes.footerLink}>
      {`${text.projectName}`}
    </NavLink>
    {` ${text.copyRightYear}.`}
  </Typography>
);

Copyright.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(copyrightStyles)(Copyright);
