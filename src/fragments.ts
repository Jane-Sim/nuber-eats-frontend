/**
 * Restaurants entity 속성 값을 받아올 때 사용하는 fragment.
 * fragment = Query, Mutation 의 필드 안에서 재활용 가능한 작은 단위의 필드.
 */
import { gql } from "@apollo/client";

// 레스토랑 결과 값 fragment
export const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantParts on Restaurant {
    id
    name
    coverImg
    category {
      name
    }
    address
    isPromoted
  }
`;

// 카테고리 결과 값 fragment
export const CATEGORY_FRAGMENT = gql`
  fragment CategoryParts on Category {
    id
    name
    coverImg
    slug
    restaurantCount
  }
`;
