import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import StockNavBar from "./StockNavBar";
import StockPage from "./StockPage";

export default function StockRoute() {
  let match = useRouteMatch();
  console.log(`${match.path}/:id`);
  return (
    <StockNavBar>
      <Switch>
        <Route exact path={`${match.path}/:id`} component={StockPage}/>
        <Route exact path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </StockNavBar>
  );
}
