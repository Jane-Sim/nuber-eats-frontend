/**
 * client가 로그인시, 처음 보여지는 Restaurants 페이지
 */
import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Category } from "../../components/category";
import { Restaurant } from "../../components/restaurant";
import { RESTAURANT_FRAGMENT } from "../../fragments";
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
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IFormProps {
  searchTerm: string;
}

export const Restaurants = () => {
  // restaurant의 페이지 수를 저장하는 state.
  const [page, setPage] = useState(1);
  // restaurants Query에 page 인덱스를 input 값에 넣어, 페이징된 restaurant 데이터를 가져온다.
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });
  // 오른쪽 버튼 클릭시, page state값이 1 오른다. state값이 변경되면, useQuery가 해당 state를 갖고 있기에 refetch를 진행한다.
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const history = useHistory();
  // 사용자가 submit 실행시, 사용자의 입력 값을 search 페이지의 파라미터 값으로 넘기면서 페이지 이동을 한다.
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    // http://localhost:3000/search?term=blabla
    history.push({
      pathname: "/search",
      search: `?term=${searchTerm}`,
    });
  };

  return (
    <section>
      <Helmet>
        <title>Home | Nuber Eats</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className="bg-gray-800 w-full py-40 flex items-center justify-center"
      >
        <input
          {...register("searchTerm", { required: true, min: 3 })}
          name="searchTerm"
          type="Search"
          className="input rounded-md border-0 w-3/4 md:w-3/12"
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
                key={category.id}
                id={category.id + ""}
                coverImg={category.coverImg}
                name={category.name}
                slug={category.slug}
              />
            ))}
          </div>
          {/* 레스토랑 수만큼 레스토랑 컴포넌트를 생성한다. */}
          <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.restaurants.results?.map((restaurant) => (
              <Restaurant
                key={restaurant.id}
                id={restaurant.id + ""}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          {/* 페이징 컴포넌트 */}
          <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
            {/* 1보다 큰 페이지일 때, 왼쪽 화살표를 보여준다. */}
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            {/* 현재 유저가 보는 페이지 수와 총 페이지 수를 보여준다. */}
            <span>
              Page {page} of {data?.restaurants.totalPages}
            </span>
            {/* 현재 페이지보다 총 페이지 수가 더 남았을 때, 오른쪽 화살표를 보여준다. */}
            {page !== data?.restaurants.totalPages ? (
              <button
                onClick={onNextPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
