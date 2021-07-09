/**
 * 4040 컴포넌트를 테스트하는 파일. Helmet을 통한 document의 title 값을 확인 가능하다.
 */
import { render, waitFor } from "../../test-utils";
import React from "react";
import { NotFound } from "../404";

describe("<NotFound />", () => {
  it("renders OK", async () => {
    render(<NotFound />);

    // helmet이 바로 확인이 불가능 하기에, render가 끝난 후에 확인이 가능하도록 waitFor를 사용한다.
    await waitFor(() => {
      expect(document.title).toBe("Not Found | Nuber Eats");
    });
  });
});
