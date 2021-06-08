/**
 * 사용자가 로그인 상태일 때 보여줄 Router
 */
import { useQuery, gql } from "@apollo/client";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Restaurants } from "../pages/client/restaurants";
import { meQuery } from "../__generated__/meQuery";

// client 사용자일 때, restaurant 컴포넌트로 이동시키는 router 컴포넌트.
const ClientRoutes = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
];

// 백엔드에 me query를 날릴 때 사용하는 graphql ME_QUERY 객체
const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);
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
      <Switch>
        {/* 로그인한 사용자의 권한이 유저일 때, restaurant 컴포넌트로 이동시킨다. */}
        {data.me.role === "Client" && ClientRoutes}
        {/* 그 외의 권한을 가진 유저거나, /potato 경로로 들어온 유저는 home으로 이동시킨다. */}
        <Redirect from="/potato" to="/" />
      </Switch>
    </Router>
  );
};
