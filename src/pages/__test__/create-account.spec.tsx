/**
 * create-account.tsx 컴포넌트를 테스트하는 파일.
 */
import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { CreateAccount, CREATE_ACCOUNT_MUTATION } from "../create-account";
import { render, waitFor, RenderResult } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import { UserRole } from "../../__generated__/globalTypes";

describe("<CreateAccount />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <CreateAccount />
        </ApolloProvider>
      );
    });
  });
  // title에 해당 내용이 렌더링되었는지 확인.
  it("renders OK", async () => {
    await waitFor(() =>
      expect(document.title).toBe("Create Account | Nuber Eats")
    );
  });
  // email, pasword를 유효성에 맞지않게 입력했을 때, 에러문구 렌더링되는지 확인
  it('renders validation errors', async () => {
    const {getByRole, getByPlaceholderText} = renderResult
    const email = getByPlaceholderText(/email/i) 
    const button = getByRole("cmbutton");
    // email 유효성검사
    await waitFor(() => {
      userEvent.type(email, 'wont@work')
    })
    let errorMessage = getByRole('alert')
    expect(errorMessage).toHaveTextContent(/please enter a valid email/i)
    // 이메일 입력을 안했을 때 유효성 에러검사
    await waitFor(() => {
      userEvent.clear(email)
    })
    errorMessage = getByRole('alert')
    expect(errorMessage).toHaveTextContent(/email is required/i)
    // 비밀번호 입력을 안했을 때 유효성 에러검사
    await waitFor(() => {
      userEvent.type(email, 'wont@work.com')
      userEvent.click(button)
    })
    errorMessage = getByRole('alert')
    expect(errorMessage).toHaveTextContent(/password is required/i)  })
    // mutation을 보내서 성공했을 때의 뜨는 alert 검사
    it('submits mutation with form values', async () => {
      const {getByRole, getByPlaceholderText} = renderResult
      const email = getByPlaceholderText(/email/i) 
      const password = getByPlaceholderText(/password/i) 
      const button = getByRole("cmbutton");
      const formData = {
        email: 'working@gmail.com',
        password: '12',
        role: UserRole.Client
      }
      const mockedLoginMutationResponse = jest.fn().mockResolvedValue({
        data: {
          createAccount: {
            ok: true,
            error: 'mutation-error'
          }
        }
      })
      mockedClient.setRequestHandler(
        CREATE_ACCOUNT_MUTATION,
        mockedLoginMutationResponse
      )

      // window.alert 자체가 테스팅 범주에서 벗어나므로, 즉 다른 테스트를 방해하므로
      // spyOn을 통해 null을 반환하는 mock타입의 function으로 만든다.
      jest.spyOn(window, "alert").mockImplementation(() => null);
      await waitFor(() => {
        userEvent.type(email, formData.email)
        userEvent.type(password, formData.password)
        userEvent.click(button)
      })
      expect(mockedLoginMutationResponse).toHaveBeenCalledTimes(1)
      expect(mockedLoginMutationResponse).toHaveBeenCalledWith({
        createAccountInput: {
          email: formData.email,
          password: formData.password,
          role: formData.role,
        },
      })
      expect(window.alert).toHaveBeenCalledWith("Account Created! Log in now");
      const mutationError = getByRole("alert");
      expect(mutationError).toHaveTextContent("mutation-error");

    })

});
