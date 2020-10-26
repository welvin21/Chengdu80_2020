import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
import StockRoute from "./StockRoute";

export default function Routes() {
  return (
  <NavBar>
    <Switch>
      <Route path="/stocks" component={StockRoute} />
      <Route path="/" component={Dashboard} />
    </Switch>
  </NavBar>
  );
}
