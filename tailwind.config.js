/**
 * tailwind를 확장할 수 있도록 해주는 config 파일.
 * tailwind css를 커스텀 가능하다.
 */

const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // extend 기능을 통해 color의 색상을 확장한다.
    // tailwind의 color 팔레트를 통해 기본 색상이 아닌 다른 색상들도 사용 가능하다.
    extend: {
      colors: {
        lime: colors.lime,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
