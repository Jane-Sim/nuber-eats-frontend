/** e2e 테스트는 e2e 폴더 내에 *.cy.{js,jsx,ts,tsx} 형태로 파일을 생성해야한다. */
//const cypress = require("cypress");

describe("First Test", () => {
    it("should go to homepage", () => {
        // cy는 cypress의 줄임말.
        cy.visit("http://localhost:3000")
        .title()
        .should("eq", "Login | Nuber Eats");
    })
})