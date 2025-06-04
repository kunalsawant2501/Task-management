import React from "react";

const Header = ({ username = "username", onLogout }) => {
  return (
    <header className="bg-[#2E333A] px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-[#F2F2F2] text-lg font-medium">
        Hello <span className="font-bold uppercase"> {username} 👋</span>
      </div>

      <button
        onClick={onLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium"
      >
        Log Out
      </button>
    </header>
  );
};

export default Header;
