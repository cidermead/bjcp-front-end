/* eslint-disable import/no-named-as-default */
import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Route, Switch } from "react-router-dom";

import AppLayout from "../LayoutPage";

import HomePage from "../HomePage";
import CompareStylesPage from "../CompareStylesPage";
import DonatePage from "../DonatePage";
import NotFoundPage from "../NotFoundPage";
import AboutPage from "../AboutPage";
import CopyrightPage from "../CopyrightPage";
import StyleRangePage from "../StyleRangePage";
import QuestionPage from "../QuestionPage";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends Component {
  render() {
    return (
      <AppLayout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/donate" component={DonatePage} />
          <Route path="/range" component={StyleRangePage} />
          <Route path="/styles" component={CompareStylesPage} />
          <Route path="/questions/:category/:topic" component={QuestionPage} />
          <Route path="/copyright" component={CopyrightPage} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </AppLayout>
    );
  }
}

export default hot(module)(App);
