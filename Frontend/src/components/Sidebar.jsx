import React from "react";
import {
  FaUser,
  FaTools,
  FaChartBar,
  FaCalendarAlt,
  FaSignOutAlt,
  FaUsersCog,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { isAdmin, currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-800 text-white w-1/6 flex flex-col">
      {/* Header */}
      <div className="flex items-center bg-gray-500 justify-center h-18 border-b border-gray-700 p-4">
        <a href="/" className="text-xl font-semibold">
          DASHBOARD
        </a>
      </div>

      {/* User info */}
      {currentUser && (
        <div className="px-4 py-3 border-b border-gray-700 ">
          <div className="font-semibold text-white mx-auto ">Xin chào</div>
          <div className="text-sm text-white">
            {currentUser.name || currentUser.username}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-grow">
        <ul className="flex flex-col p-4 space-y-2">
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

          {/* Admin link - chỉ hiển thị cho admin */}
          {isAdmin && isAdmin() && (
            <li>
              <Link
                to="/admin"
                className={`flex items-center w-full hover:bg-blue-400 px-3 py-2 rounded transition-colors ${
                  location.pathname === "/admin" ? "bg-blue-500" : ""
                }`}
              >
                <FaUsersCog className="mr-2" />
                <span>Quản lý người dùng</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Logout button */}
    </div>
  );
};

export default Sidebar;
