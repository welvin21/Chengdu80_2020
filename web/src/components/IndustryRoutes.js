import React from "react";
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import { IndustryNavBar } from "./IndustryNavBar";
import NoStock from "./NoStock";
import { IndustryTabs } from "../features/IndustryTabs";

export const IndustryRoutes = () => {
  const match = useRouteMatch();
  return (
    <IndustryNavBar>
      <Switch>
        <Route exact path={`${match.url}/:industry`} component={IndustryTabs} />
        <Route exact path={`${match.url}/`} component={NoStock} />
      </Switch>
    </IndustryNavBar>
  );
}
