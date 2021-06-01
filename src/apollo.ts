/**
 * 백엔드의 graphql 서버와 연동되는 apollo client 모듈 생성
 */
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
