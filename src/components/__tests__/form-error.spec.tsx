/**
 * form 전송시, 사용되는 에러 컴포넌트를 테스트하는 파일.
 */
import { render } from "@testing-library/react";
import React from "react";
import { FormError } from "../form-error";

describe("FormError", () => {
  it("renders OK with props", () => {
    const { getByText } = render(<FormError errorMessage="test" />);
    getByText("test");
  });
});
