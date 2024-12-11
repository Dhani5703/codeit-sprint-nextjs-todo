import React, { useEffect, useState } from "react";

const Header = () => {
  const [logo, setLogo] = useState("/Size=Large.png");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setLogo("/Size=Small.png");
      } else {
        setLogo("/Size=Large.png");
      }
    };

    // 초기화 및 리스너 설정
    handleResize();
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="w-full h-16 flex items-center bg-white m-0 px-6">
      <button
        onClick={() => (window.location.href = "/")}
        className="h-[50px] w-[150px] bg-center bg-no-repeat bg-transparent md:ml-[20%] ml-0"
        style={{
          backgroundImage: `url('${logo}')`,
        }}
      ></button>
    </header>
  );
};

export default Header;
