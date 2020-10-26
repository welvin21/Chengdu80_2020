import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";

export default function Routes (){
  return (
    <Router>
      <NavBar>
          <Switch> 
            <Route path='/' component={Dashboard} />
            <Route path='/stocks' component='' />
          </Switch>
      </NavBar>
    </Router>
  );
};
