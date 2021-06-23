/**
 * Restaurants entity 속성 값을 받아올 때 사용하는 fragment.
 * fragment = Query, Mutation 의 필드 안에서 재활용 가능한 작은 단위의 필드.
 */
import { gql } from "@apollo/client";

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
