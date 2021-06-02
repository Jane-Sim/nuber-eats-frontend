/**
 * 백엔드의 graphql 서버와 연동되는 apollo client 모듈 생성
 */
import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

// makeVar를 이용해 reactive variabled인 isLoggedInVar 변수를 생성한다.
export const isLoggedInVar = makeVar(false);

// InMemoryCache를 이용해, 특정 쿼리의 key-value값을 저장한다.
// isLoggedIn 변수는 클라이언트에서 사용자의 로그인, 로그아웃 변수 값을 저장할 목적으로 사용된다.
// reactive variabled한 field를 참고하기에, 해당 쿼리는 자동으로 새로고침된다.
export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
        },
      },
    },
  }),
});
