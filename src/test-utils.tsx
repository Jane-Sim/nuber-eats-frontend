/**
 * 테스트 작업시, 중복되는 provider, router 등의 반복 작업을 줄이기 위해
 * @testing-library/react 라이브러리의 Custom Render를 이용한다.
 */
import React from "react";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";

type children = React.PropsWithChildren<{}>;

// 테스트할 컴포넌트를 자식으로 받아온다.
const AllTheProviders: React.FC<children> = ({ children }) => {
  return (
    <HelmetProvider>
      <Router>{children}</Router>
    </HelmetProvider>
  );
};

// 해당 ui에 해당되는 자식 컴포넌트와, 특정 옵션값을 같이 렌더하도록 커스텀한다.
const customRender = (ui: React.ReactElement, options?: any) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// testing 라이브러리의 모든 기능을 사용할 수 있도록 export한다.
export * from "@testing-library/react";
export { customRender as render };
