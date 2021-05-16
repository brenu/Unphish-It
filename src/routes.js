import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Result from "./pages/Result";

export default function Routes() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/result">
            <Result />
          </Route>
        </Switch>
    </Router>
  );
}