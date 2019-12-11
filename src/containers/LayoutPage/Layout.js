import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { ThemeProvider } from '@material-ui/core/styles';

import Navigator from './NavPanel';
import NavBar from './NavBar';
import Copyright from './Copyright';

import { theme, layoutStyles } from './Styles';

import {
  getPageUrl,
} from "../../reducers/pageReducer";

import {
  getStyleRangeResult,
} from "../../reducers/stylesReducer";

const Layout = ({ container, children, pageUrl }) => {
  const classes = layoutStyles();
  const [ mobileOpen, setMobileOpen ] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <NavBar handleDrawerToggle={handleDrawerToggle} />

        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              classes={{
                paper: classes.drawerPaper,
              }}
              container={container}
              onClose={handleDrawerToggle}
              open={mobileOpen}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              variant="temporary"
            >
              <Navigator
                handleDrawerToggle={handleDrawerToggle}
                pageUrl={pageUrl}
              />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <Navigator
                pageUrl={pageUrl}
              />
            </Drawer>
          </Hidden>
        </nav>

        <div className={classes.app}>
          <div className={classes.toolbar} />
          <main className={classes.main}>
            { children }
          </main>
          <footer className={classes.footer}>
            <Copyright />
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
  children: PropTypes.object,
  pageUrl: PropTypes.string,
};


const mapStateToProps = (state) => ({
  pageUrl: getPageUrl(state),
  styleRangeResult: getStyleRangeResult(state),
});

export default connect(mapStateToProps)(Layout);
