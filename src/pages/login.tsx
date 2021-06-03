/**
 * 로그인 컴포넌트. tailwind로 css 디자인.
 */
import React from "react";
import { useForm } from "react-hook-form";

// form의 타입체크 인터페이스.
interface ILoginForm {
  email?: string;
  password?: string;
}

export const Login = () => {
  /**
   * react에서 form을 쉽게 만들 수 있도록 해주는 useForm 커스텀 훅.
   * {options}
   * register: input을 form 형태로 만들어주며, input 값의 유효형 검사, require 기능과 메시지 등의 옵션 값을 넣을 수 있다.
   * getValues: register를 통해 생성된 input의 state 값을 반환한다. watch와의 차이점은, 실시간 감시를 하지 않는다는 점이다.
   * handleSubmit: submit을 핸들링하는 기능이다. 성공, 실패시 호출할 함수를 추가할 수 있으며 함수에 data 인자를 넘긴다. data와 watch 값은 동일하다.
   * errors: submit의 에러문을 반환한다. errors 에서 특정 문구를 꺼내어 상황에 맞게 개발도 가능.
   */
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();
  const onSubmit = () => {};

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center">
        <h3 className="text-3xl text-gray-800">Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mt-5 px-5"
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
            <span className="font-medium text-red-500">
              {errors.email?.message}
            </span>
          )}
          {/* password input. */}
          <input
            {...register("password", {
              required: "Password is required",
            })}
            name="password"
            type="password"
            placeholder="Password"
            className="input "
          />
          {/* password에서 에러시, 에러 문구를 표시 */}
          {errors.password?.message && (
            <span className="font-medium text-red-500">
              {errors.password?.message}
            </span>
          )}
          {/* password에서 10자 이하 에러타입일 때, 에러 문구를 표시 */}
          {errors.password?.type === "minLength" && (
            <span className="font-medium text-red-500">
              Password must be more than 10 chars.
            </span>
          )}
          <button className="btn mt-3">Log In</button>
        </form>
      </div>
    </div>
  );
};
