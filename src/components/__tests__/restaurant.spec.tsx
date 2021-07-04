/**
 * restaurant.tsx 컴포넌트를 테스트하는 파일.
 * 레스토랑 정보, 카테고리명 등의 테스트를 할 수 있다.
 */
import { render } from "@testing-library/react";
import React from "react";
import { Restaurant } from "../restaurant";
import { BrowserRouter as Router } from "react-router-dom";

describe("Restaurant", () => {
  // 렌더링시, 레스토랑 이름과 카테고리명, 특정 카테고리로 이동하는 a 태그의 href 속성을 확인할 수 있다.
  it("renders OK with props", () => {
    const restaurantProps = {
      id: "1",
      name: "name",
      categoryName: "categoryName",
      coverImg: "lala",
    };
    // <Link> 태그를 대신할 수 있도록, <BrowserRouter> 태그를 사용한다.
    const { getByText, container } = render(
      <Router>
        <Restaurant {...restaurantProps} />
      </Router>
    );
    getByText(restaurantProps.name);
    getByText(restaurantProps.categoryName);
    expect(container.firstChild).toHaveAttribute(
      "href",
      `/restaurants/${restaurantProps.id}`
    );
  });
  // 레스토랑 이미지가 없을 때, 기본 이미지를 보여주는지 확인하는 테스트.
  it("coverImg not found", () => {
    const restaurantProps = {
      id: "1",
      name: "name",
      categoryName: "categoryName",
      coverImg: "",
    };
    const { container } = render(
      <Router>
        <Restaurant {...restaurantProps} />
      </Router>
    );
    // 백그라운드 url이 기본 이미지 경로를 가리키는지 확인.
    expect(container.firstChild).toHaveStyle(
      "backgroundImage: url(../images/default-restaurant.jpg}"
    );
  });
});
