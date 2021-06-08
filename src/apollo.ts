/**
 * 백엔드의 graphql 서버와 연동되는 apollo client 모듈 생성
 */
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LOCALSTORAGE_TOKEN } from "./constants";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);

// makeVar를 이용해 reactive variabled인 isLoggedInVar, authToken 변수를 생성한다.
/**
 * isLoggedInVar: 사용자의 로그인 유무
 * authToken: 사용자의 로그인시 갖는 토큰
 */
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

// authentication 작업을 위해, Apollo Link를 생성한다. http, auth, web sockets 링크를 가질 예정.
// 1. 첫 작업인 link chain을 위해, 서버의 HTTP URL을 HttpLink로 생성한다.
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

// 2. 또다른 Apollo Link인 authLink는, graphql 요청시 header에 토큰을 추가하여 보낼 수 있도록, setContext 를 사용한다.
// setContext는 클라이언트가 만든 requset context를 set 하는 기능이다.
// 기존의 header context를 return 후, token context를 추가해준다.
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-jwt": authTokenVar() || "",
    },
  };
});

// apollo link를 통해, authentication 작업을 할 수 있다.
// InMemoryCache를 이용해, 특정 쿼리의 key-value값을 저장한다.
// reactive variabled한 field를 참고하기에, 해당 쿼리는 자동으로 새로고침된다.
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
