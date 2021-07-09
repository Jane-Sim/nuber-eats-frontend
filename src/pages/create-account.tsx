/**
 * 회원가입 컴포넌트. tailwind로 css 디자인.
 */
import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import nuberLogo from "../images/logo.svg";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation";
import { UserRole } from "../__generated__/globalTypes";

// 새 사용자 생성시 사용하는 Mutatin.
// apollo tooling의 codegen CLI를 이용시, codegen이 백엔드의 LoginInput schema를 확인 후 자동으로 해당 Interface를 생성해준다.
// createAccountInput, createAccountOutput interface가 생기므로, 프론트엔드 개발자는 실수할 일이 적어진다.
const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

// form의 타입체크 인터페이스.
interface ICreateAccountForm {
  email: string;
  password: string;
  // codegen을 통해 생성된 UserRole enum을 지정.
  role: UserRole;
}

export const CreateAccount = () => {
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
  } = useForm<ICreateAccountForm>({
    // mode를 통해, ICreateAccountForm type의 isValid 유효성 확인이 가능하며, role type의 기본값 설정이 가능하다.
    mode: "onChange",
    defaultValues: { role: UserRole.Client },
  });

  // 사용자를 페이지 이동시키기 위해, react-route-dom 에서 useHistory훅을 가져온다.
  const history = useHistory();
  // Mutation 실행 후 실행되는 함수. response 값인 data를 인자로 받아온다.
  const onCompleted = (data: createAccountMutation) => {
    // response 값에서 변수를 꺼낸다.
    const {
      createAccount: { ok },
    } = data;
    // 성공시 사용자를 login 페이지인 home으로 이동시킨다.
    if (ok) {
      alert("Account Created! Log in now");
      history.push("/");
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
  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    { onCompleted }
  );

  // form의 submit이 실행되면, useForm의 getValues를 통해 email, password, role state를 꺼내와,
  // createAccount Mutatin 함수의 createAccountInput 값에 넣어서 백엔드에 보낸다.
  const onSubmit = () => {
    // Create Account 버튼을 누른 뒤 Mutation의 동작이 끝나면, 다시 Mutation을 서버에 보낼 수 있도록,
    // Mutation loading이 false일 때 아래 코드를 실행하도록 한다. (중복전송 방지)
    if (!loading) {
      const { email, password, role } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: {
            email,
            password,
            role,
          },
        },
      });
    }
  };

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Create Account | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={nuberLogo} className="w-52 mb-10" alt="nuber-eats-logo img" />
        <h4 className="w-full font-medium text-left text-3xl mb-5">
          Let's get started
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
          {/* email input. */}
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email",
              },
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
          {/* 백엔드에서 받아온 role enum객체에서 key 값만 꺼내서 keys 갯수만큼 select의 option 태그를 생성한다. */}
          <select
            {...register("role", {
              required: "true",
            })}
            className="input"
          >
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          {/* 해당 Form의 유효성과 loading 상태, 버튼의 text 값을 Button 컴포넌트에 props를 넘긴다. */}
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"Create Account"}
          />
          {createAccountMutationResult?.createAccount.error && (
            <FormError
              errorMessage={createAccountMutationResult.createAccount.error}
            />
          )}
        </form>
        {/* 로그인 페이지로 이동하는 div */}
        <div>
          Already have an account?{" "}
          <Link to="/" className="text-lime-600 hover:underline">
            Log in now
          </Link>
        </div>
      </div>
    </div>
  );
};
