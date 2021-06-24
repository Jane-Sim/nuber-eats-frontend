/**
 * category 정보를 보여주는 컴포넌트
 * 카테고리 이미지, 이름을 보여준다.
 */

import React from "react";
import { Link } from "react-router-dom";

interface ICategoryProps {
  id: string;
  coverImg: string | null;
  name: string;
  slug: string;
}

export const Category: React.FC<ICategoryProps> = ({
  coverImg,
  name,
  slug,
}) => {
  return (
    // 해당 카테고리를 클릭시, 카테고리 페이지로 이동시킨다. 이때 slug 파라미터를 React Route의 path에 넣어서 보낸다.
    <Link to={`category/${slug}`}>
      <div className="flex flex-col items-center cursor-pointer">
        {/* 이미지 */}
        <div
          className="w-14 h-14 bg-cover hover:bg-gray-100 rounded-full"
          style={{ backgroundImage: `url(${coverImg})` }}
        ></div>
        {/* 카테고리명 */}
        <span className="mt-1 text-sm text-center font-medium">{name}</span>
      </div>
    </Link>
  );
};
