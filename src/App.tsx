import { useReactiveVar } from "@apollo/client";
import React from "react";
import { isLoggedInVar } from "./apollo";
import { LoggedInRouter } from "./routers/logged-in-router";
import { LoggedOutRouter } from "./routers/logged-out-router";

// useReactiveVar 훅을 이용해서 makeVar로 만든 isLoggedInVar변수를 가져온다.
// true면 LoggedInRouter 컴포넌트로 사용자를 route 해준다.
function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
