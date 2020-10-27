import React from "react";
import { Switch, Route } from "react-router-dom";
import { Dashboard } from "../features";
import { NavBar } from ".";
import { StockRoutes } from ".";

export const Routes = () => {
  return (
  <NavBar>
    <Switch>
      <Route path="/stocks" component={StockRoutes} />
      <Route exact path="/" component={Dashboard} />
    </Switch>
  </NavBar>
  );
}
