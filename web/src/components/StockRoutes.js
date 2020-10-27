import React from "react";
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import { StockNavBar } from ".";
import { StockPage } from "../features";
import NoStock from "./NoStock";

export const StockRoutes = () => {
  const match = useRouteMatch();
  return (
    <StockNavBar>
      <Switch>
        <Route exact path={`${match.url}/:id`} component={StockPage} />
        <Route exact path={`${match.url}/`} component={NoStock} />
      </Switch>
    </StockNavBar>
  );
}
