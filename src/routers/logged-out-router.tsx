/**
 * 사용자가 로그인 상태가 아닐 때, 보여줄 LoggedOutRouter.
 */
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotFound } from "../pages/404";
import { CreateAccount } from "../pages/create-account";
import { Login } from "../pages/login";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
        {/* 위의 경로가 다른 존재하지 않는 경로로 접근시, 404페이지로 이동시킨다. */}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
