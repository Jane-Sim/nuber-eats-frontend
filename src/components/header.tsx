/**
 * 모든 페이지에서 보여지는 header 컴포넌트.
 * 페이지 이동이 실행될 때마다, graphql 서버에서 가져온 User 데이터가 저장된 apollo cache 데이터를 꺼내어 사용한다.
 */
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import nuberLogo from "../images/logo.svg";

export const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 p-3 text-center text-base text-white">
          <span>Please verify your email.</span>
        </div>
      )}
      <header className="py-4">
        <div className="w-full px-5 xl:px-0 max-w-screen-2xl mx-auto flex justify-between items-center">
          <Link to="/">
            <img src={nuberLogo} className="w-36" alt="Nuber Eats" />
          </Link>{" "}
          <span className="text-xs">
            {/* 사용자의 프로필 변경 페이지로 이동 */}
            <Link to="/edit-profile">
              <FontAwesomeIcon icon={faUser} className="text-xl" />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
