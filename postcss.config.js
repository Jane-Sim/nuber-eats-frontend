/**
 * tailwind 를 일반 CSS파일로 빌드하기 위해 사용하는 프레임워크.
 * JS 플러그인을 사용하여 CSS를 변환해준다. 파이프.
 * 플러그인으로는 tailwindcss, autoprefixer를 추가한다.
 * autopefixer: 구형 브라우저에서도 호환이 될 수 있도록 css 프로퍼티에 접두사(prefix)를 붙여준다.
 */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
