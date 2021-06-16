/**
 * restaurant 정보를 보여주는 컴포넌트
 * 레스토랑 이미지, 이름, 카테고리를 보여준다.
 */

import React from "react";
import defaultImg from "../images/default-restaurant.jpg";

interface IRestaurantProps {
  id: string;
  coverImg: string | null;
  name: string;
  categoryName?: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  coverImg,
  name,
  categoryName,
}) => (
  <div className="flex flex-col">
    {coverImg ? (
      // 레스토랑 이미지가 있을 때
      <div
        style={{ backgroundImage: `url(${coverImg})` }}
        className="bg-cover bg-center mb-3 py-28"
      ></div>
    ) : (
      // 레스토랑 이미지가 없을 때
      <div
        style={{ backgroundImage: `url(${defaultImg})` }}
        className="bg-cover bg-center mb-3 py-28"
      ></div>
    )}
    {/* 레스토랑 이름 */}
    <h3 className="text-xl">{name}</h3>
    <span className="border-t mt-2 py-2 text-xs opacity-50 border-gray-400">
      {/* 카테고리 이름 */}
      {categoryName}
    </span>
  </div>
);
