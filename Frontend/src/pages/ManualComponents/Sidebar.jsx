import React, { useState } from "react";
import { FaUser, FaTools, FaChartBar, FaCalendarAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-800 text-white w-1/6 flex flex-col">
      {/* Header */}
      <div className="flex items-center bg-gray-500 justify-center h-18 border-b border-gray-700">
        <a href="/" className="text-xl font-semibold">
          DASHBOARD
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex-grow">
        <ul className="flex flex-col p-4 space-y-4">
          <li>
            <Link
              to="/account"
              className={`flex items-center w-full hover:bg-blue-400 px-3 py-2 rounded transition-colors ${
                location.pathname === "/account" ? "bg-blue-500" : ""
              }`}
            >
              <FaUser className="mr-2" />
              <span>Tài khoản</span>
            </Link>
          </li>
          <li>
            <Link
              to="/devices"
              className={`flex items-center w-full hover:bg-blue-400 px-3 py-2 rounded transition-colors ${
                location.pathname === "/devices" ? "bg-blue-500" : ""
              }`}
            >
              <FaTools className="mr-2" />
              <span>Thiết bị</span>
            </Link>
          </li>
          <li>
            <Link
              to="/reports"
              className={`flex items-center w-full hover:bg-blue-400 px-3 py-2 rounded transition-colors ${
                location.pathname === "/reports" ? "bg-blue-500" : ""
              }`}
            >
              <FaChartBar className="mr-2" />
              <span>Báo cáo</span>
            </Link>
          </li>
          <li>
            <Link
              to="/configdevice"
              className={`flex items-center w-full hover:bg-blue-400 px-3 py-2 rounded transition-colors ${
                location.pathname === "/configdevice" ? "bg-blue-500" : ""
              }`}
            >
              <FaCalendarAlt className="mr-2" />
              <span>Điều chỉnh</span>
            </Link>
          </li>
          <li>
            <Link
              to="/schedule"
              className={`flex items-center w-full hover:bg-blue-400 px-3 py-2 rounded transition-colors ${
                location.pathname === "/schedule" ? "bg-blue-500" : ""
              }`}
            >
              <FaCalendarAlt className="mr-2" />
              <span>Lập Lịch</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
