/**
 * graphql의 설정파일
 * `client` 객체를 먼저 적어주고
 * `service`는 apollo 서버의 url을 넣으면 된다. codegen이 백엔드에 접근해서 schema를 확인할 수 있도록 해준다.
 * `includes`는, apollo이 프론트엔드에서, gql 태그를 확인하고, typescript definition을 나에게 주기 위해, 특정 파일들을 확인할 경로를 넣어주면 된다.
 * 여기서는 모든 파일의 전체 tsx, ts 파일을 참고할 수 있도록 와일드 카드인 glob으로 적어준다.
 * (폴더가 5번 중첩되어도 상관없다. 또한 node_module, tests 폴더는 기본적으로 제외된다.)
 * `tagName`은 graphql 문장을 생성할 때 사용한 태그를 말한다. 지금은 gql``태그를 사용했기에 gql로 적어준다. graphql 태그 등 본인이 적은 태그를 넣어준다.
 */
module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "nuber-eats-backend",
      url: "http://localhost:4000/graphql",
    },
  },
};
