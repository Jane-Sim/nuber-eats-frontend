/**
 * 사용자가 로그인 상태일 때 보여줄 Router
 */
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { Restaurants } from "../pages/client/restaurants";
import { Search } from "../pages/client/search";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";

// client 사용자일 때, restaurant 컴포넌트로 이동시키는 router 컴포넌트. client는 confirm, edit-profile 컴포넌트로 접근가능하다.
const ClientRoutes = [
  <Route key={1} path="/" exact>
    <Restaurants />
  </Route>,
  <Route key={2} path="/confirm">
    <ConfirmEmail />
  </Route>,
  <Route key={3} path="/edit-profile">
    <EditProfile />
  </Route>,
  <Route key={4} path="/search">
    <Search />
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
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
