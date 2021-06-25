/**
 * 레스토랑의 디테일 페이지를 볼 수 있는 컴포넌트.
 * useParams를 통해 보고자 하는 레스토랑의 id 값을 가져올 수 있다.
 */
import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  restaurant,
  restaurantVariables,
} from "../../__generated__/restaurant";

// 특정 레스토랑의 정보를 받아오는 Query.
const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

// useParams의 타입을 지정하는 interface.
interface IRestaurantParams {
  id: string;
}

export const RestaurantDetail = () => {
  const params = useParams<IRestaurantParams>();
  // react route에서 id 파라미터 값을 가져와, 특정 레스토랑 정보를 받아오도록 query를 실행한다.
  // query의 input값인 id는 number 타입으로 보내야하므로, string에서 number로 형변환을 해준다.
  const { loading, data } = useQuery<restaurant, restaurantVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: {
          restaurantId: +params.id,
        },
      },
    }
  );

  return <h1>Restaurant Detail Page</h1>;
};
