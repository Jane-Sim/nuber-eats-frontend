/**
 * 루트 경로에 있는 App.tsx 파일을 테스트 하기 위해,
 * jest가 coverage 테스트를 하는 src/component 경로에 app.tsx 새 파일을 생성하여, app 파일도 테스트 추가.
 */
import { useReactiveVar } from "@apollo/client";
import React from "react";
import { isLoggedInVar } from "../apollo";
import { LoggedInRouter } from "../routers/logged-in-router";
import { LoggedOutRouter } from "../routers/logged-out-router";

export const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
};
