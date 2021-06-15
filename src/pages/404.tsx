/**
 * 사용자가 존재하지 않는 경로의 페이지로 접근하거나, 권한이 없는 페이지로 접근시 보여주는 에러 페이지
 * Link 컴포넌트를 통해 사용자를 home으로 이동시킨다.
 */
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className="h-screen flex flex-col items-center justify-center">
    <Helmet>
      <title>Not Found | Nuber Eats</title>
    </Helmet>
    <h2 className="font-semibold text-2xl mb-3">Page Not Found.</h2>
    <h4 className="font-medium text-base mb-5">
      The page you're looking for does not exist or has moved.
    </h4>
    <Link className="hover:underline text-lime-600" to="/">
      Go back home &rarr;
    </Link>
  </div>
);
