import React from "react";
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import { IndustryNavBar } from "./IndustryNavBar";
import { IndustryPage } from "../features/IndustryPage"
import NoStock from "./NoStock";

export const IndustryRoutes = () => {
  const match = useRouteMatch();
  return (
    <IndustryNavBar>
      <Switch>
        <Route exact path={`${match.url}/:industry`} component={IndustryPage} />
        <Route exact path={`${match.url}/`} component={NoStock} />
      </Switch>
    </IndustryNavBar>
  );
}
