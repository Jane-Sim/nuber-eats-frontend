/**
 * 사용자가 로그인 상태일 때 보여줄 Router
 */
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { Restaurants } from "../pages/client/restaurants";
import { ConfirmEmail } from "../pages/user/confirm-email";

// client 사용자일 때, restaurant 컴포넌트로 이동시키는 router 컴포넌트.
const ClientRoutes = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
  <Route path="/confirm" exact>
    <ConfirmEmail />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  // 데이터가 없거나 로딩중이거나 에러가 있으면 아래의 컴포넌트를 반환한다.
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-widest">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {/* 로그인한 사용자의 권한이 유저일 때, restaurant 컴포넌트로 이동시킨다. */}
        {data.me.role === "Client" && ClientRoutes}
        {/* 그 외의 권한을 가진 유저는 home으로 이동시킨다. */}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
