/**
 * client가 로그인시, 처음 보여지는 Restaurants 페이지
 */
import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Category } from "../../components/category";
import { Restaurant } from "../../components/restaurant";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";

// 레스토랑의 모든 카테고리와 페이징된 레스토랑 데이터를 가져오는 Query.
const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const Restaurants = () => {
  // restaurants Query에 page 인덱스를 input 값에 넣어, 페이징된 restaurant 데이터를 가져온다.
  const { data, loading, error } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });
  return (
    <section>
      <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <input
          type="Search"
          className="input"
          placeholder="Search restaurants..."
        />
      </form>
      {/* 백엔드에 Query가 loading중이지 않을 때, 카테고리 영역을 보여준다. */}
      {!loading && (
        <div className="max-w-screen-2xl pb-20 mx-auto mt-8">
          <div className="flex justify-around max-w-sm mx-auto">
            {/* 가져온 카테고리 수만큼 카테고리 아이콘 느낌의 이미지를 추가해준다. */}
            {data?.allCategories.categories?.map((category) => (
              <Category
                id={category.id + ""}
                coverImg={category.coverImg}
                name={category.name}
              />
            ))}
          </div>
          {/* 레스토랑 수만큼 레스토랑 컴포넌트를 생성한다. */}
          <div className="grid mt-16 grid-cols-3 gap-x-5 gap-y-10">
            {data?.restaurants.results?.map((restaurant) => (
              <Restaurant
                id={restaurant.id + ""}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
