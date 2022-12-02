/** e2e 테스트는 e2e 폴더 내에 *.cy.{js,jsx,ts,tsx} 형태로 파일을 생성해야한다. 
 * cypress는 본래 jest처럼 findBy와 findAllBy 의 명령어를 사용할 수 없다. 
 * 대신 cy.get('[name="password"]') 으로 element를 찾을 수 있다.
 * 그래서 @testing-library/cypress 라이브러리를 설치해줘야한다.
*/
//const cypress = require("cypress");


describe("Log In", () => {
  it("should see login page", () => {
      // cy는 cypress의 줄임말.
    cy.visit("/").title().should("eq", "Login | Nuber Eats");
  })
  it("can fill out the form", () => {
    cy.visit("/");
    cy.findByPlaceholderText(/email/i).type("owner@naver.com");
    cy.findByPlaceholderText(/password/i).type("12345");
    cy.findByRole("cmbutton").should("not.have.class", "pointer-events-none");
  });
  it("can see email / password validation errors", () => {
    cy.visit("/");
    cy.findByPlaceholderText(/email/i).type("bad@email")
    cy.findByRole("alert").should("have.text", "Please enter a valid email");
  });
})