// components/Header.tsx

import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <button onClick={() => window.location.reload()}>로고</button>
    </header>
  );
};

export default Header;
