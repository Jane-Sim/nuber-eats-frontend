/**
 * 사용자가 로그인 상태일 때 보여줄 Router
 */
import React from "react";
import { isLoggedInVar } from "../apollo";

export const LoggedInRouter = () => (
  <div>
    <h1>Logged In</h1>
    <button onClick={() => isLoggedInVar(false)}>Log Out</button>
  </div>
);
