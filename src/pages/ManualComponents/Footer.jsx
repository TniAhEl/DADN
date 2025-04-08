import React from 'react';
import logo from '../../assets/hcmut.png'; // Đảm bảo rằng bạn đã đặt ảnh hcmut.png trong thư mục assets

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white py-6">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center mb-4">
          <div className="flex items-center mb-2">
            <img src={logo} alt="HCMUT Logo" className="h-14 mr-4" />
            <p className="text-lg font-bold">Smart water</p>
          </div>
          <p className="text-center text-gray-400">&copy; 2025 Smart water. All rights reserved.</p>
        </div>
        <nav className="w-full">
          <ul className="flex justify-center space-x-8 text-sm">
            <li><a href="/privacy-policy" className="hover:underline hover:text-blue-400">Privacy Policy</a></li>
            <li><a href="/terms-of-service" className="hover:underline hover:text-blue-400">Terms of Service</a></li>
            <li><a href="/contact" className="hover:underline hover:text-blue-400">Contact</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
