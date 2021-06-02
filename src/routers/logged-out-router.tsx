/**
 * 사용자가 로그아웃 상태일 때 보여줄 Router.
 * login 버튼 클릭시 isLoggedInVar의 값을 false로 변경한다.
 */
import React from "react";
import { isLoggedInVar } from "../apollo";

export const LoggedOutRouter = () => {
  const onClick = () => {
    isLoggedInVar(true);
  };
  return (
    <div>
      <h1>Logged Out</h1>
      <button onClick={onClick}>Click to login</button>
    </div>
  );
};
