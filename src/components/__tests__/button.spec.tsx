/**
 * button.tsx 파일의 컴포넌트를 테스트하는 파일.
 * 사용자가 버튼을 클릭할 수 있는 상태와 로딩시의 컴포넌트 결과물을 테스트 가능하다.
 */
import { render } from "@testing-library/react";
import React from "react";
import { Button } from "../button";

describe("Button", () => {
  // 사용자가 버튼을 클릭할 수 있게 활성화된 컴포넌트 결과에서, actionText의 props 값이 잘 나오는지 확인한다.
  it("should render OK with props", () => {
    const { getByText } = render(
      <Button canClick={true} loading={false} actionText={"test"} />
    );
    getByText("test");
  });
  // 버튼을 클릭하여 서버 통신으로 인해 로딩되는 상황에서, Loading이라는 텍스트와
  // canClick이 false 로 버튼이 비활성화시, 유저의 클릭 이벤트를 막는 class인 pointer-events-none를 포함하는지 테스트한다.
  it("should display loading", () => {
    // container를 통해 생성된 요소에 접근 가능하다. DOM API를 통해서도 접근 가능.
    const { getByText, container } = render(
      <Button canClick={false} loading={true} actionText={"test"} />
    );
    getByText("Loading...");
    // Button 컴포넌트를 가져와 해당 이벤트가 실행되는지 확인.
    expect(container.firstChild).toHaveClass("pointer-events-none");
  });
});
