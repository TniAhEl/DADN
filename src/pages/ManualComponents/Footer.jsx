import React from 'react';
import logo from '../../assets/hcmut.png'; // Đảm bảo rằng bạn đã đặt ảnh hcmut.png trong thư mục assets

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white py-4">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex justify-between w-full mb-4">
        <div>
          <div className="flex items-center">
            <img src={logo} alt="HCMUT Logo" className="h-14 mr-5" />
            <p className="text-lg font-bold">Smart water</p>
          </div>
          <p className="text-center">&copy; 2025 Smart water. All rights reserved.</p>
          </div>
          <nav>
            <ul className="flex space-x-10">
              <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:underline">Terms of Service</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;