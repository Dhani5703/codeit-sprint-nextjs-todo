import React from "react";

const Header = () => {
  return (
    <header className="w-full h-10 flex items-center bg-white m-0 p-6">
      <button
        onClick={() => window.location.reload()}
        className="ml-[20%] h-[50px] w-[150px] bg-center bg-no-repeat bg-transparent"
        style={{
          backgroundImage: "url('/Size=Large.png')",
        }}
      ></button>
    </header>
  );
};

export default Header;
