import React from 'react';
import { FaUser, FaHome, FaTools, FaChartBar } from 'react-icons/fa'; // Import các biểu tượng từ react-icons

const Sidebar = () => {
  return (
    <div className="h-screen bg-gray-800 text-white w-1/6 flex flex-col">
      <div className="flex items-center bg-gray-500 justify-center h-18 border-b border-gray-700">
      </div>
      <nav className="flex-grow">
        <ul className="flex flex-col p-4 space-y-4">
          <li className="flex items-center">
            <FaUser className="mr-2" />
            <a href="/account" className="hover:underline">Tài khoản</a>
          </li>
          <li className="flex items-center">
            <FaHome className="mr-2" />
            <a href="/greenhouse" className="hover:underline">Nhà kính</a>
          </li>
          <li className="flex items-center">
            <FaTools className="mr-2" />
            <a href="/devices" className="hover:underline">Thiết bị</a>
          </li>
          <li className="flex items-center">
            <FaChartBar className="mr-2" />
            <a href="/reports" className="hover:underline">Báo cáo</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;