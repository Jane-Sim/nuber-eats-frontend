/**
 * 백엔드의 graphql 서버와 연동되는 apollo client 모듈 생성
 */
import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { LOCALSTORAGE_TOKEN } from "./constants";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);

// makeVar를 이용해 reactive variabled인 isLoggedInVar, authToken 변수를 생성한다.
/**
 * isLoggedInVar: 사용자의 로그인 유무
 * authToken: 사용자의 로그인시 갖는 토큰
 */
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

// InMemoryCache를 이용해, 특정 쿼리의 key-value값을 저장한다.
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
          token: {
            read() {
              return authTokenVar();
            },
          },
        },
      },
    },
  }),
});
