import React from "react";

const Header = () => {
  return (
    <header
      className="header bg-state-100"
      style={{
        width: "100%", // 화면 전체 너비
        height: "40px", // 헤더 높이
        display: "flex", // 버튼을 정렬하기 위해 flex 사용
        justifyContent: "flex-start", // 버튼을 왼쪽으로 정렬
        alignItems: "center", // 버튼을 세로 중앙 정렬
      }}
    >
      <button
        onClick={() => window.location.reload()}
        style={{
          backgroundImage: "url('/Size=Large.png')",
          backgroundPosition: "center", // 배경 이미지가 중앙에 위치하도록 설정
          backgroundRepeat: "no-repeat", // 배경 이미지가 반복되지 않도록 설정
          border: "none", // 외곽선 제거
          height: "50px", // 버튼 높이
          width: "150px", // 버튼 너비
          marginLeft: "20%", // 왼쪽 여백 추가
          backgroundColor: "transparent", // 버튼 배경색 제거
        }}
      ></button>
    </header>
  );
};

export default Header;
