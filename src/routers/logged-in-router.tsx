/**
 * 사용자가 로그인 상태일 때 보여줄 Router
 */
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { meQuery } from "../__generated__/meQuery";

// 백엔드에 me query를 날릴 때 사용하는 graphql ME_QUERY 객체
const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);
  // 데이터가 없거나 로딩중이거나 에러가 있으면 아래의 컴포넌트를 반환한다.
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-widest">Loading...</span>
      </div>
    );
  }
  return (
    <div>
      <h1>{data.me.email}</h1>
    </div>
  );
};
