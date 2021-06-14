/**
 * 사용자의 프로필을 변경하는 컴포넌트.
 * 유저의 이메일과 비밀번호를 변경할 수 있다.
 * 유저의 이메일 변경시, verified 값은 false로 변경된다.
 */
import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { useMe } from "../../hooks/useMe";
import {
  editProfile,
  editProfileVariables,
} from "../../__generated__/editProfile";

// 해당 사용자의 새로운 정보로 업데이트하는 Mutation.
const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

// user Update Form props interface.
/**
 * email: 사용자의 이메일. require한 속성을 갖는다.
 * password: 사용자의 비밀번호, optional한 속성을 갖느낟.
 */
interface IFormProps {
  email?: string;
  password?: string;
}

// 로그인 form과 비슷한 형태를 제공한다.
export const EditProfile = () => {
  // 로그인한 User 데이터를 Apollo cache에서 꺼내온다.
  // 이때, refetch는 useQuery 훅에 존재하는 기능인데 graphql의 query를 refresh하여 다시 쿼리 데이터를 백엔드에서 가져오는 역할을 한다.
  // refetch시, graphql의 cache 데이터도 다시 update해주기에, writeFragment를 사용하기 번거로울 때 사용해도 괜찮다.
  const { data: userData, refetch: refreshUser } = useMe();

  // 백엔드에서 유저의 데이터를 업데이트시, Me query를 refetch하도록 실행한다.
  const onCompleted = async (data: editProfile) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && userData) {
      await refreshUser();
    }
  };

  // editProfile Mutation을 실행하는 function을 생성한다.
  const [editProfile, { loading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION, {
    onCompleted,
  });

  // useForm을  통해, email input 태그의 default값을 현재 email값으로 지정한다.
  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      email: userData?.me.email,
    },
  });

  // Save Profile 버튼 클릭시, editProfile Mutation을 실행. require한 email값과 optional한 password 값을 넣는다.
  const onSubmit = () => {
    const { email, password } = getValues();
    editProfile({
      variables: {
        input: {
          email,
          //   password가 값이 존재하면, spread 연산자로 password object를 풀어서 값을 전달한다.
          ...(password !== "" && { password }),
        },
      },
    });
  };

  return (
    <h1 className="mt-52 flex flex-col justify-center items-center">
      <h4>Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
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
          className="input"
          type="email"
          placeholder="Email"
        />
        <input
          {...register("password")}
          name="password"
          className="input"
          type="password"
          placeholder="Password"
        />
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Save Profile"
        />
      </form>
    </h1>
  );
};
