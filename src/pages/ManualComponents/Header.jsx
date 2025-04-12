import React from "react";
import { FaSignOutAlt } from "react-icons/fa"; // Import biểu tượng đăng xuất từ react-icons
import logo from "../../assets/hcmut.png"; // Import logo

const Header = () => {
  return (
    <header className="bg-gray-700 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo và tên */}
        <div className="flex items-center justify-center flex-grow cursor-pointer">
          <img src={logo} alt="HCMUT Logo" className="h-10 mr-3" />
          <div className="text-lg font-bold">
            <a href="/" className="">
              Smart water
            </a>
          </div>
        </div>

        {/* Biểu tượng đăng xuất nằm ở bên phải và cách mép phải */}
        <div className="flex items-center space-x-2 ml-auto">
          <a
            href="/"
            className="text-white hover:underline flex items-center mr-5"
          >
            <FaSignOutAlt className="mr-2" /> {/* Biểu tượng đăng xuất */}
            Đăng xuất
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
