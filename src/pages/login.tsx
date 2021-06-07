/**
 * 로그인 컴포넌트. tailwind로 css 디자인.
 */
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import nuberLogo from "../images/logo.svg";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";

// 로그인시 사용하는 Mutatin.
// apollo tooling의 codegen CLI를 이용해서, codegen이 백엔드의 LoginInput schema를 확인 후 Interface를 생성해준다.
// LoginInput, LoginOutput interface가 생기므로, 프론트엔드 개발자는 실수할 일이 적어진다.
const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

// form의 타입체크 인터페이스.
interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  /**
   * react에서 form을 쉽게 만들 수 있도록 해주는 useForm 커스텀 훅.
   * {options}
   * register: input을 form 형태로 만들어주며, input 값의 유효형 검사, require 기능과 메시지 등의 옵션 값을 넣을 수 있다.
   * getValues: register를 통해 생성된 input의 state 값을 반환한다. watch와의 차이점은, 실시간 감시를 하지 않는다는 점이다.
   * handleSubmit: submit을 핸들링하는 기능이다. 성공, 실패시 호출할 함수를 추가할 수 있으며 함수에 data 인자를 넘긴다. data와 watch 값은 동일하다.
   * formState: 해당 양식의 상태를 반환한다. 유효성, input의 값이 적혀져 있는지 등을 확인 가능하다.
   * errors: submit의 에러문을 반환한다. errors 에서 특정 문구를 꺼내어 상황에 맞게 개발도 가능.
   */
  const {
    register,
    getValues,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<ILoginForm>({ mode: "onChange" });

  // Mutation 실행 후 실행되는 함수. response 값인 data를 인자로 받아온다.
  const onCompleted = (data: loginMutation) => {
    // response 값에서 변수를 꺼낸다.
    const {
      login: { error, ok, token },
    } = data;
    // 성공시 로그를 token 로그를 찍느다.
    if (ok) {
      console.log(token);
    }
  };

  // useMutation 훅을 이용해, Mutation을 날릴 수 있다.
  //------------------------------------
  // useMutation<Mutation의 interface, Mutation의 input interface> 타입을 지정함으로, 프론트엔드 개발자는 input, response 데이터의 type을 실수할 일이 적어진다.
  // useMutation(Mutation 함수, {loading, error, data} 객체) 를 넣을 수 있는데,
  // 두 번째 파라미터 값인 {loading, error, data}에서 loading은 해당 Mutation의 진행중인 상태를 반환하고, error는 에러를 반환, data는 response 값을 반환한다.
  // 두 번째 파라미터 값에 함수를 넣을 수 있는데, 해당 함수는 loading, error, data를 인자로 받을 수 있다.
  //------------------------------------
  // useMutation 훅은 해당 Mutation을 실행시키는 Mutation function과 {data, loading, called, error} 원소를 가진 배열을 반환한다.
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  // form의 submit이 실행되면, useForm의 getValues를 통해 email, password state를 꺼내와,
  // login Mutatin 함수의 loginInput 값에 넣어서 백엔드에 보낸다.
  const onSubmit = () => {
    // login 버튼을 누른 뒤 Mutation의 동작이 끝나면, 다시 Mutation을 서버에 보낼 수 있도록,
    // Mutation loading이 false일 때 아래 코드를 실행하도록 한다.
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={nuberLogo} className="w-52 mb-10" alt="nuber-eats-logo img" />
        <h4 className="w-full font-medium text-left text-3xl mb-5">
          Welcome back
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
          {/* email input. */}
          <input
            {...register("email", {
              required: "Email is required",
            })}
            name="email"
            type="email"
            placeholder="Email"
            className="input mb-3"
          />
          {/* email에서 에러시, 에러 문구를 표시 */}
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          {/* password input. */}
          <input
            {...register("password", {
              required: "Password is required",
            })}
            name="password"
            type="password"
            placeholder="Password"
            className="input"
          />
          {/* password에서 에러시, 에러 문구를 표시 */}
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {/* password에서 10자 이하 에러타입일 때, 에러 문구를 표시 */}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage={"Password must be more than 10 chars."} />
          )}
          {/* 해당 Form의 유효성과 loading 상태, 버튼의 text 값을 Button 컴포넌트에 props를 넘긴다. */}
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"Log in"}
          />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        {/* 회원가입 div */}
        <div>
          New to Nuber?{" "}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
