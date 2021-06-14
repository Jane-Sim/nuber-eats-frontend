/**
 * 사용자의 verify 검증을 변경해주는 페이지. 유저가 첫 로그인시 검증이 안되었거나, 검증 이메일의 버튼을 통해 해당 페이지에 들어온다.
 * 사용자가 이메일로 계정 검증시, 해당 페이지를 빠져나간다.
 */

import { useApolloClient, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import {
  verifyEmail,
  verifyEmailVariables,
} from "../../__generated__/verifyEmail";
import { parse } from "query-string";
import { useMe } from "../../hooks/useMe";

// 해당 사용자의 이메일 검증을 확인하는 Mutation.
const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  // 로그인한 User 데이터를 Apollo cache에서 꺼내온다.
  const { data: userData } = useMe();
  // apollo cache에서 현재 사용자의 verified 값을 변경하기 위해, useAolloCient 훅을 통해 apollo client 객체를 가져온다.
  const client = useApolloClient();
  const history = useHistory();
  // 사용자가 첫 로그인시, 계정 검증유무를 확인하기 위해, 백엔드 graphql에 Mutation을 날리고 난 뒤, 실행하는 함수.
  const onCompleted = (data: verifyEmail) => {
    const {
      verifyEmail: { ok },
    } = data;
    // 사용자가 검증이 완료되었다면, 현재 유저의 apollo cache데이터에서 User의 verified 요소를 true로 변경한다.
    if (ok && userData?.me.id) {
      /**
       * 직접 apollo cache 값을 수정할 수 있도록, writeFragment를 통해 접근한다.
       * 이때, apollo cache에서는 User cache의 id 값을 저장해두는데, 'User:1' 형식으로 id값을 지정한다.
       * 해당 데이터 Type과(User), entity의 id 값(1)을 함께 저장하는 것이다.
       * fragment의 뜻은 User의 model 에서, 특정 요소인 fragment만 수정한다. 라는 뜻이다. 일종의 Type의 일부분이라고 생각하면 된다.
       * fragment 원하는 이름(VerifiedUser) on 변경할 객체 Type(User) 형식으로 fragment를 작성하면 된다.
       * 그 후 변경하고자 하는 verified 요소를 지정한 뒤, data 객체를 통해 변경할 값을 넣어서 send로 보낸다.
       */
      client.writeFragment({
        id: `User:${userData.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });
      // cache 값을 write 한 뒤, 해당 유저를 restaurant 페이지로 이동시킨다.
      history.push("/");
    }
  };
  // verifyEmail Mutation을 실행하는 function을 생성한다.
  const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
    {
      onCompleted,
    }
  );

  // 해당 유저가 url에서 검증에 필요한 code 파라미터 값을 꺼낸다.
  const { search } = useLocation();
  const { code } = parse(search);

  // 사용자가 해당 페이지에 도착하면, verifyEmail Mutation을 날려서 보안 검증을 한다.
  useEffect(() => {
    if (typeof code === "string") {
      // 해당 유저의 검증 값을 변경하도록 Mutation을 날린다.
      verifyEmail({
        variables: {
          input: {
            code,
          },
        },
      });
    }
  }, [code, verifyEmail]);

  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
      <h4 className="text-gray-700 text-sm">
        Please wait, don't close this page...
      </h4>
    </div>
  );
};
