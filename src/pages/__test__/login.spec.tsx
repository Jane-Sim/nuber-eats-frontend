/**
 * login.tsx 컴포넌트를 테스트하는 파일. Email input 값을 유저처럼 변경해보고,
 * 변경된 state 값에 따른 로그인 유효성 테스트를 할 수 있다.
 */
import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import React from "react";
import { Login, LOGIN_MUTATION } from "../login";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Login", () => {
  // render처리되어, 해당 render값을 저장하는 renderResult변수.
  let renderResult: RenderResult;
  // createMockClient를 통해, ApolloProvider의 client를 mock 타입으로 사용가능하다. mutation, query등의 테스트도 가능.
  let mockClient: MockApolloClient;

  // 반복되는 렌더링 코드를 줄이기 위해, beforeEach를 사용한다.
  beforeEach(async () => {
    // helmet의 state 값 변경을 기다리기 위해 waitFor를 사용한다.
    await waitFor(async () => {
      mockClient = createMockClient();
      renderResult = render(
        <HelmetProvider>
          <Router>
            <ApolloProvider client={mockClient}>
              <Login />
            </ApolloProvider>
          </Router>
        </HelmetProvider>
      );
    });
  });
  it("should render OK", async () => {
    // helmet의 title 값을 테스트하기 위해 waitFor를 사용한다.
    await waitFor(() => {
      expect(document.title).toBe("Login | Nuber Eats");
    });
  });

  // Email의 유효성 실패 테스트.
  it("display email validation erros", async () => {
    // getByPlaceholderText는 특정 input 태그의 placeholder의 text를 가져올 수 있다.
    // getByRole은 특정 태그의 value 값을 가져오게끔 하는 속성 값이다. 특정 컴포넌트의 태그에 role="example" 로 속성 값을 표시하고, 해당 role에 적은 특정 값으로 불러오면 된다.
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    // getByPlaceholderText 함수에 특정 placeholder명을 넣거나 (ex) "Email"), regular expression 을 이용해 (ex) /email/i, i는 대소문자 구분 안함.) placeholder의 value 값을 편리하게 가져올 수 있다.
    const email = getByPlaceholderText(/email/i);
    // email의 state 값을 변경하므로 waitFor를 사용한다.
    await waitFor(() => {
      // user가 직접 input 태그에 키보들 값을 변경하는 것처럼, userEvent 를 통해 유저처럼 input값 변경 이벤트를 발생시킬 수 있다.
      // 해당 user event 모듈인 userEvent를 사용하면 된다. type() 함수를 통해 key down, onchange event 등을 트리거하여 사용가능하다.
      // ex) email 의 placeholder의 값을 정규식에 맞지 않도록 넣으면, 에러 문구인 Please enter a valid email 로 렌더링된걸 확인 가능하다.
      userEvent.type(email, "this@wont");
    });
    // form-error.tsx 컴포넌트의 errorMessage 태그의 value 값을 getByRole를 통해가져온다.
    let errorMessage = getByRole("alert");
    // 유효성 에러 텍스트가 뜨는지 확인한다.
    expect(errorMessage).toHaveTextContent(/please enter a valid email/i);
    // email input 값에 아무런 값을 안 넣었을 때도 유효성검사가 가능하다.
    await waitFor(() => {
      userEvent.clear(email);
    });
    // debug();
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/email is required/i);
  });

  // password의 유효성 실패 테스트.
  it("display password required errors", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const submitBtn = getByRole("cmbutton");
    // 패스워드를 input에 적지 않고 form 실행시,
    await waitFor(() => {
      userEvent.type(email, "this@wont.com");
      userEvent.click(submitBtn);
    });
    // debug();
    // password 에러 문구를 확인할 수 있다.
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Password is required/i);
  });

  // mutation의 실행횟수와 input 값을 확인하는 테스트
  it("submits form and calls mutation", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole("cmbutton");

    // mutation의 input값.
    const formData = {
      email: "real@test.com",
      password: "123",
    };

    // mutation 실행시, 응답받을 mock타입 결과값을 생성한다.
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: "XXX",
          error: null,
        },
      },
    });
    // mutation을 실행하기 전에, setRequestHandler를 통해 mutation을 캐치하여 mutation 테스트가 가능하게 만든다.
    // setRequestHandler(mutation을 담은 변수, mock타입 결과값)
    mockClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);

    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
    });

    // mutation이 1번 실행되고, input값을 가지고 실행되었는지 테스트가 가능하다.
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      loginInput: {
        ...formData,
      },
    });
  });
});
