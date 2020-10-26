import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
import StockRoute from "./StockRoute";

export default function Routes() {
  return (
    <Router>
      <NavBar>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/stocks" component={StockRoute} />
        </Switch>
      </NavBar>
    </Router>
  );
}
