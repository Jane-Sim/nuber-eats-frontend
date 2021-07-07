/**
 * form 전송시, 사용되는 공통 에러 component.
 */
import React from "react";

interface IFormErrorProps {
  errorMessage: string;
}

export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => (
  // 컴포넌트 테스트를 위해, errorMessage text를 반환하기 위해 구별된 role 속성을 추가한다.
  <span role="alert" className="font-medium text-red-500">
    {errorMessage}
  </span>
);
