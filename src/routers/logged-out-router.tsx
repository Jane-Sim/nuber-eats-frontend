/**
 * 사용자가 로그아웃 상태일 때 보여줄 Router.
 * login 버튼 클릭시 isLoggedInVar의 값을 false로 변경한다.
 */
import React from "react";
import { useForm } from "react-hook-form";

// form의 타입체크 인터페이스.
interface IForm {
  email: string;
  password: string;
}

export const LoggedOutRouter = () => {
  /**
   * react에서 form을 쉽게 만들 수 있도록 해주는 useForm 커스텀 훅.
   * {options}
   * register: input을 form 형태로 만들어주며, input 값의 유효형 검사, require 기능과 메시지 등의 옵션 값을 넣을 수 있다.
   * watch: register를 통해 생성된 input의 state 값을 계속해서 감시하며 state 값을 반환한다.
   * handleSubmit: submit을 핸들링하는 기능이다. 성공, 실패시 호출할 함수를 추가할 수 있으며 함수에 data 인자를 넘긴다. data와 watch 값은 동일하다.
   * errors: submit의 에러문을 반환한다. errors 에서 특정 문구를 꺼내어 상황에 맞게 개발도 가능.
   */
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  // submit 성공시 호출하는 함수
  const onSubmit = (data: Object) => {
    console.log(watch());
    //console.log(data);
  };
  // submit 실패시 호출하는 함수
  const onInvalid = () => {
    console.log("fail");
    console.log(errors.email?.message);
  };
  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          {/* email input. gmail 이메일 유효성 추가. */}
          <input
            {...register("email", {
              required: "this is require",
              pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/,
            })}
            name="email"
            type="email"
            placeholder="email"
          />
          {/* email에서 에러시, 에러 문구를 표시 */}
          {errors.email?.message && (
            <span className="font-bold text-red-600">
              {errors.email?.message}
            </span>
          )}
          {/* email에서 gmail 유효성 검사 실패시, 에러 문구를 표시 */}
          {errors.email?.type === "pattern" && (
            <span className="font-bold text-red-600">Only gmail allowed</span>
          )}
        </div>
        <div>
          {/* password input. */}
          <input
            {...register("password", { required: true })}
            name="password"
            type="password"
            required
            placeholder="password"
          />
        </div>
        {/* submit 버튼 */}
        <button className="bg-yellow-300 text-white">Submit</button>
      </form>
    </div>
  );
};
