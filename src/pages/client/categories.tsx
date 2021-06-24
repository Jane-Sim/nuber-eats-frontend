/**
 * 사용자에게 특정 카테고리와 해당 카테고리가 갖고있는 레스토랑 리스트를 보여주는 카테고리 페이지
 */
import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { category, categoryVariables } from "../../__generated__/category";

// 특정 slug 요소를 가진 category 정보와 해당되는 레스토랑들도 가져온다.
const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface ICategoryParams {
  slug: string;
}

export const Categories = () => {
  // useParams를 통해 React Route의 path 값에 포함된 parameter 값을 객체로 가져온다. ex) {slug: "bbg"}
  const params = useParams<ICategoryParams>();
  // category Query에 page, slug값을 input 값에 넣어 데이터를 가져온다.
  const { data, loading } = useQuery<category, categoryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page: 1,
          slug: params.slug,
        },
      },
    }
  );
  console.log(data);
  return <h1>Category</h1>;
};
