/**
 * form 양식의 공용 button 컴포넌트.
 * input의 state 값이 바뀔 때마다, 버튼의 색상과 click 이벤트 활성화가 변경된다.
 */
import React from "react";

// Button props interface.
/**
 * canClick: 사용자가 버튼을 클릭할 수 있는지의 유무. form의 유효성이 확인되면, true로 변경된다.
 * loading: 해당 button을 클릭했을 때, 백엔드 graphql에 갔다올 동안의 loading 상태를 나타낸다. 평소엔 false가 디폴트 값.
 * actionText: 버튼의 text.각 버튼마다의 text를 지정할 수 있다.
 */
interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    className={`text-lg font-medium focus:outline-none text-white py-4  transition-colors ${
      // 사용자의 유효성이 확인되면, 버튼색이 라임 색으로 변하고, 확인되지 않으면 회색으로 변경되면서 클릭 이벤트를 무효화한다.
      canClick
        ? "bg-lime-600 hover:bg-lime-700"
        : "bg-gray-300 pointer-events-none "
    }`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);
