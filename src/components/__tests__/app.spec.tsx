/**
 * App.tsx 파일의 컴포넌트를 테스트하는 파일.
 * 유저 입장에서, app 컴포넌트에 접근시 로그인 유무 상태로 LoggedInRouter, LoggedOutRouter 컴포넌트가 렌더링되는지를 테스트할 수 있다.
 */
import { render, waitFor } from "@testing-library/react";
import { debug } from "console";
import React from "react";
import { isLoggedInVar } from "../../apollo";
import { App } from "../app";

// 유저가 로그아웃 상태일 때, LoggedOuteRouter 렌더링이 되도록 mock 타입의 컴포넌트 렌더링 결과 값을 반환한다.
// LoggedOutRouter에서는 apollo를 통해 graphql 쿼리를 날리므로, 현재는 에러가 나기에 App 컴포넌트 렌더링 유무만 테스트할 수 있도록 mock을 사용한다.
jest.mock("../../routers/logged-out-router", () => {
  return {
    LoggedOutRouter: () => <span>logged-out</span>,
  };
});
// 유저가 로그인 상태일 때, LoggedInRouter 렌더링이 되도록 mock 타입의 컴포넌트 렌더링 결과 값을 반환한다.
jest.mock("../../routers/logged-in-router", () => {
  return {
    LoggedInRouter: () => <span>logged-in</span>,
  };
});

describe("App", () => {
  // 사용자가 로그아웃 상태일 때, render 함수를 통해 컴포넌트의 렌더링 순서와 성공 유무를 판단할 수 있다.
  // render 함수는 테스트 가능한 다양한 함수를 제공하는데, debug 함수는 렌더된 컴포넌트를 콘솔로 찍어서 보여주며,
  // getByText는 렌더링된 컴포넌트에서 특정 text가 있는지를 알려주는 함수다.
  it("renders LoggedOutRouter", () => {
    const { debug, getByText } = render(<App />);
    // debug();
    getByText("logged-out");
  });
  // 사용자가 로그인시, LoggedInRouter를 렌더링 하는지 확인하는 테스트.
  // 사용자의 로그인 상태를 변경해야하기에, ReactiveVar인 isLoggedInVar를 통해 사용자 로그인 상태를 변경한다.
  // 로그인 상태가 변경된 후 테스트를 진행해야 하므로, async, await을 통해 상태 변경 완료 후 테스트를 진행한다.
  it("renders LoggedInRouter", async () => {
    const { debug, getByText } = render(<App />);
    //
    await waitFor(() => {
      isLoggedInVar(true);
    });
    debug();
    getByText("logged-in");
  });
});
