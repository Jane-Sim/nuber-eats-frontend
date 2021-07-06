/**
 * header 컴포넌트를 테스트하는 파일. 현재 사용자의 verify 유무로 검증을 하라는 배너를 보여주는지 확인 가능하다.
 * 또한 useMe 커스텀 훅스에서 사용하는 graphql query를 mock 타입으로 만들어, 원하는 값을 받을 수 있도록 한다.
 */
import { render, waitFor } from "@testing-library/react";
import React from "react";
import { Header } from "../header";
import { MockedProvider } from "@apollo/client/testing";
import { ME_QUERY } from "../../hooks/useMe";
import { BrowserRouter as Router } from "react-router-dom";

describe("Header", () => {
  // 검증이 안된 사용자에게 배너 보이는지 테스트
  it("renders verify banner", async () => {
    // graphql의 query로 인한 Promise와 받아온 결과값을 통해 변경되는 state 값으로 인해 rerender를 기다려주는 waitFor를 사용한다.
    await waitFor(async () => {
      const { getByText } = render(
        // graphql의 query, mutation, result 등을 mock 타입으로 테스트하는 도구인 MockedProvider를 사용한다.
        // mocks 로 props를 전달해주면 되는데, 이때 사용하고자 하는 graphql 쿼리를 담은 변수를 가져와 넣어준다.
        // 받고자하는 mock 결과값을 지정하면 된다.
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: "",
                    role: "",
                    verified: false,
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );
      // query 결과 값을 받기위해 Promsie를 사용한다.
      await new Promise((resolve) => setTimeout(resolve, 0));
      getByText("Please verify your email.");
    });
  });
  // 검증 완료시, 배너 문구 안나타는지 확인하는 테스트
  it("renders without verify banner", async () => {
    await waitFor(async () => {
      const { queryByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: "",
                    role: "",
                    verified: true,
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
      // queryByText는, 해당 문구가 없을 때 null 값을 반환해준다.
      expect(queryByText("Please verify your email.")).toBeNull();
    });
  });
});
