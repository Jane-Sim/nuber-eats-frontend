/**
 * 백엔드에 me query를 날릴 때 사용하는 graphql ME_QUERY 객체.
 * 한 번 응답받은 데이터는 apollo cache에 저장되기에,(browser inmemory) 수시로 백엔드에 쿼리를 날리지 않아도 된다.
 */

import { gql, useQuery } from "@apollo/client";
import { meQuery } from "../__generated__/meQuery";

export const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const useMe = () => {
  return useQuery<meQuery>(ME_QUERY);
};
