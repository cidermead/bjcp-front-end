import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import { NavLink } from 'react-router-dom';

import { navigatorStyles } from './Styles';
import categories from './NavLinks';


const NavPanel = ({ classes, handleDrawerToggle, pageUrl }) => (
  <div>
    <List disablePadding>
      <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
        Tests Menu
      </ListItem>
      <ListItem className={clsx(classes.item, classes.itemCategory)}>
        <ListItemIcon className={classes.itemIcon}>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classes.itemPrimary,
          }}
        >
          <NavLink
            className={classes.navLink}
            onClick={handleDrawerToggle}
            to="/"
          >App Home Page</NavLink>
        </ListItemText>
      </ListItem>
      {categories.map(({ id, children }) => (
        <React.Fragment key={id}>
          <ListItem className={classes.categoryHeader}>
            <ListItemText
              classes={{
                primary: classes.categoryHeaderPrimary,
              }}
            >
              {id}
            </ListItemText>
          </ListItem>
          {children.map(({ id: childId, icon, url }) => (
            <ListItem
              key={childId}
              button
              className={clsx(classes.item, pageUrl === url && classes.itemActiveItem)}
            >
              <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                }}
              >
                <NavLink
                  className={classes.navLink}
                  onClick={handleDrawerToggle}
                  to={url}
                >{childId}</NavLink>
              </ListItemText>
            </ListItem>
          ))}

          <Divider className={classes.divider} />
        </React.Fragment>
      ))}
    </List>
  </div>
);

NavPanel.defaultValues = {
  pageUrl: '/',
  handleDrawerToggle: () => null,
};

NavPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDrawerToggle: PropTypes.func,
  pageUrl: PropTypes.string.isRequired,

};

export default withStyles(navigatorStyles)(NavPanel);
