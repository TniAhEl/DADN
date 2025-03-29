import React from 'react';
import logo from '../../assets/hcmut.png'; 

const Header = () => {
  return (
    <header className="bg-gray-700 text-white py-4">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex items-center">
          <img src={logo} alt="HCMUT Logo" className="h-10 mr-3" />
          <div className="text-lg font-bold">
            <a href="/" className="hover:underline">Smart water</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;