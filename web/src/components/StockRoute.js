import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import StockNavBar from "./StockNavBar";
import StockPage from "./StockPage";

export default function StockRoute() {
  const match = useRouteMatch();
  return (
    <StockNavBar>
      <Switch>
        <Route exact path={`${match.url}/aapl`}>
          <StockPage />
        </Route>
        <Route exact path={`${match.url}/`}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </StockNavBar>
  );
}
