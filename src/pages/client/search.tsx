/**
 * 사용자의 입력한 값으로 특정 레스토랑들을 검색하여 보여줄 페이지.
 */
import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  searchRestaurant,
  searchRestaurantVariables,
} from "../../__generated__/searchRestaurant";

// 사용자가 입력한 값에 해당되는 레스토랑의 데이터를 가져오는 Query. (페이징)
const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  // useLocation을 통해 URL의 파라미터 값을 가져온다.
  const location = useLocation();
  // useHistory을 통해 브라우저의 history API를 이용한다.
  const history = useHistory();

  /**
   * useLazyQuery를 사용해서 Query를 특정 시점, 조건에 실행할 수 있도록 사용할 수 있다.
   * useLazyQuery는 QueryTuple 인 Array 값을 반환한다.
   * const [특정 시점에 사용가능한 void Query함수, Query 함수 실행 후 받는 응답 값 data.] = useLazyQuery();
   * useQuery는 React가 마운트, 렌더링시 자동으로 실행되기에 useLazyQuery를 이용하면 개발자가 원하는 시점(버튼 클릭)에 Query가 실행되는 장점이 있다.
   */
  const [callQuery, { loading, data, called }] =
    useLazyQuery<searchRestaurant, searchRestaurantVariables>(
      SEARCH_RESTAURANT
    );
  useEffect(() => {
    // term 파라미터의 값인 query를 꺼낸 뒤, query 값이 없으면 사용자를 메인 페이지로 이동시킨다.
    const [_, query] = location.search.split("?term=");
    if (!query) {
      // push와 replace의 차이점은, 해당 페이지를 history API에 추가하느냐 유무차이. push (추가) / replcae(대체)
      return history.replace("/");
    }
    // query 값이 있을 경우에만 사용자가 입력한 값으로 레스토랑 데이터를 가져온다.
    callQuery({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
  }, [history, location.search, callQuery]);
  console.log(loading, data, called);
  return (
    <div>
      <Helmet>
        <title>Home | Nuber Eats</title>
      </Helmet>
    </div>
  );
};
