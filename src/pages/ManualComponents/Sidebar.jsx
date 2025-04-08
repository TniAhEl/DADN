import React from 'react';
import { FaUser, FaTools, FaChartBar, FaCalendarAlt } from 'react-icons/fa'; // Import biểu tượng Lập Lịch

const Sidebar = () => {
  return (
    <div className="min-h-screen bg-gray-800 text-white w-1/6 flex flex-col">
      <div className="flex items-center bg-gray-500 justify-center h-18 border-b border-gray-700">
        <a>DASHBOARD</a>
      </div>
      <nav className="flex-grow">
        <ul className="flex flex-col p-4 space-y-4">
          <li className="flex items-center">
            <FaUser className="mr-2" />
            <a href="/account" className="hover:underline">Tài khoản</a>
          </li>
          <li className="flex items-center">
            <FaTools className="mr-2" />
            <a href="/devices" className="hover:underline">Thiết bị</a>
          </li>
          <li className="flex items-center">
            <FaChartBar className="mr-2" />
            <a href="/reports" className="hover:underline">Báo cáo</a>
          </li>
          <li className="flex items-center">
            <FaCalendarAlt className="mr-2" />
            <a href="/schedule" className="hover:underline">Lập Lịch</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
