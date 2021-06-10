/**
 * 사용자의 verify 검증여부를 알려주는 페이지. 사용자가 이메일로 검증시, 해당 페이지를 빠져나간다.
 */

import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import {
  verifyEmail,
  verifyEmailVariables,
} from "../../__generated__/verifyEmail";
import { parse } from "query-string";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const [verifyEmail, { loading: verifyingEmail }] = useMutation<
    verifyEmail,
    verifyEmailVariables
  >(VERIFY_EMAIL_MUTATION);
  // url에서 검증에 필요한 code 파라미터 값을 꺼낸다.
  const { search } = useLocation();
  const { code } = parse(search);

  useEffect(() => {
    if (typeof code === "string") {
      // 해당 유저의 검증 값을 변경하도록 Mutation을 날린다.
      //   verifyEmail({
      //     variables: {
      //       input: {
      //         code,
      //       },
      //     },
      //   });
    }
  }, []);

  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
      <h4 className="text-gray-700 text-sm">
        Please wait, don't close this page...
      </h4>
    </div>
  );
};
