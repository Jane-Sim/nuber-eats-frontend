describe("Create Account", () => {
    const user = cy;
    it("should see email / password validation errors", () => {
      user.visit("/");
      // 사용자 생성하기 링크를 클릭한다.
      user.findByText(/create an account/i).click();

      user.findByPlaceholderText(/email/i).type("non@good");
      user.findByRole("alert").should("have.text", "Please enter a valid email");
      user.findByPlaceholderText(/email/i).clear();
      user.findByRole("alert").should("have.text", "Email is required");
      user.findByPlaceholderText(/email/i).type("real@mail.com");
      user
        .findByPlaceholderText(/password/i)
        .type("a")
        .clear();
      user.findByRole("alert").should("have.text", "Password is required");
    });
    it("should be able to create account and login", () => {
      user.visit("/create-account");

      // 회원가입 페이지에서 계정을 생성한다.
      user.findByPlaceholderText(/email/i).type("client@mail.com");
      user.findByPlaceholderText(/password/i).type("12345");
      user.findByRole("cmbutton").click();
      // wait을 통해 회원가입 후 로그인 페이지로 이동하는 시간을 cypress에게 준다.
      user.wait(1000);

      // 계정이 만들어지면, 로그인 페이지로 이동된다. 로그인 후 토큰생성까지 확인.
      user.findByPlaceholderText(/email/i).type("client@mail.com");
      user.findByPlaceholderText(/password/i).type("12345");
      user.findByRole("cmbutton").click();
      user.window().its("localStorage.nuber-token").should("be.a", "string");
    });
  });