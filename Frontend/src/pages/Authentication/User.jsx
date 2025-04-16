import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";

const User = () => {
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+123 456 7890",
    role: "Admin",
    address: "Thu Duc, HCM",
    department: "IT Department",
    joinDate: "2023-01-15",
    lastLogin: "2025-04-05 10:00 AM", // Thông tin đăng nhập lần cuối
    accountStatus: "Active", // Trạng thái tài khoản
    permissions: ["Dashboard", "Users", "Reports"],
    profileImage: "https://via.placeholder.com/150", // URL ảnh đại diện mặc định
  });

  // Trạng thái để mở hoặc đóng modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Trạng thái đang tải
  const [isLoading, setIsLoading] = useState(false);

  // Trạng thái thông báo
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success", // success, error
  });

  // Cập nhật thông tin người dùng khi lưu
  const handleSave = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Giả lập API call với timeout
    setTimeout(() => {
      const updatedInfo = {
        ...userInfo,
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        role: e.target.role.value,
        address: e.target.address.value,
        department: e.target.department.value,
      };

      setUserInfo(updatedInfo); // Cập nhật thông tin
      setIsLoading(false); // Kết thúc trạng thái loading
      setIsModalOpen(false); // Đóng modal

      // Hiển thị thông báo thành công
      setNotification({
        show: true,
        message: "Cập nhật thông tin thành công!",
        type: "success",
      });

      // Tự động ẩn thông báo sau 3 giây
      setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 3000);
    }, 800);
  };

  // Đổi ảnh đại diện
  const handleProfileImageChange = () => {
    // Trong thực tế, đây sẽ mở một file picker
    const newImageUrl = prompt("Nhập URL ảnh mới:", userInfo.profileImage);
    if (newImageUrl && newImageUrl.trim() !== "") {
      setUserInfo({ ...userInfo, profileImage: newImageUrl });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar className="w-1/6 min-h-screen bg-gray-800 text-white" />
      <div className="flex flex-col w-5/6">
        <Header className="w-full bg-blue-600 text-white p-4 shadow-md" />

        {/* Thông báo */}
        {notification.show && (
          <div
            className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {notification.message}
          </div>
        )}

        <main className="flex-grow container mx-auto py-8 px-4">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h1 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-6">
              Thông tin người dùng
            </h1>

            {/* Profile Header with Image */}
            <div className="flex flex-col md:flex-row items-center mb-8">
              <div className="relative mb-4 md:mb-0 md:mr-8">
                <img
                  src={userInfo.profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                />
                <button
                  onClick={handleProfileImageChange}
                  className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {userInfo.name}
                </h2>
                <p className="text-gray-600">
                  {userInfo.role} - {userInfo.department}
                </p>
                <div className="mt-2 flex items-center">
                  <span
                    className={`inline-block w-3 h-3 rounded-full mr-2 ${
                      userInfo.accountStatus === "Active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></span>
                  <span className="text-sm text-gray-600">
                    {userInfo.accountStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Hồ sơ người dùng */}
              <div className="p-6 border rounded-lg bg-white shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Hồ sơ người dùng
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Tên</p>
                    <p className="font-medium">{userInfo.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{userInfo.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Số điện thoại</p>
                    <p className="font-medium">{userInfo.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Vai trò</p>
                    <p className="font-medium">{userInfo.role}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Phòng ban</p>
                    <p className="font-medium">{userInfo.department}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Địa chỉ</p>
                    <p className="font-medium">{userInfo.address}</p>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <button
                    className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 flex items-center mx-auto"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Chỉnh sửa hồ sơ
                  </button>
                </div>
              </div>

              {/* Hồ sơ hệ thống */}
              <div className="p-6 border rounded-lg bg-white shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Thông tin hệ thống
                </h2>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">
                      Trạng thái tài khoản
                    </p>
                    <p className="font-medium flex items-center">
                      <span
                        className={`inline-block w-3 h-3 rounded-full mr-2 ${
                          userInfo.accountStatus === "Active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      {userInfo.accountStatus}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Ngày tham gia</p>
                    <p className="font-medium">{userInfo.joinDate}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Đăng nhập lần cuối</p>
                    <p className="font-medium">{userInfo.lastLogin}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Quyền hạn</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {userInfo.permissions.map((permission, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity section */}
            <div className="mt-8 p-6 border rounded-lg bg-white shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                Hoạt động gần đây
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Đăng nhập thành công</p>
                    <p className="text-sm text-gray-500">
                      2025-04-05 10:00 AM | IP: 192.168.1.1
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Cập nhật thông tin hồ sơ</p>
                    <p className="text-sm text-gray-500">2025-04-03 15:30 PM</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Đặt lịch cuộc họp</p>
                    <p className="text-sm text-gray-500">2025-04-01 09:15 AM</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </main>

        {/* Modal chỉnh sửa thông tin */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50  flex justify-center items-center z-50">
            <div
              className="absolute bg-white   bg-opacity-50"
              onClick={() => setIsModalOpen(false)}
            ></div>
            <div className="bg-white p-8 rounded-lg w-full max-w-md z-10 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Chỉnh sửa thông tin
              </h2>

              <form onSubmit={handleSave}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      defaultValue={userInfo.name}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      defaultValue={userInfo.email}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      name="phone"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      defaultValue={userInfo.phone}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vai trò
                    </label>
                    <select
                      name="role"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      defaultValue={userInfo.role}
                      required
                    >
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="User">User</option>
                      <option value="Guest">Guest</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phòng ban
                    </label>
                    <input
                      type="text"
                      name="department"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      defaultValue={userInfo.department}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Địa chỉ
                    </label>
                    <textarea
                      name="address"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      defaultValue={userInfo.address}
                      rows="2"
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    className="py-2 px-6 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 flex items-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Đang lưu...
                      </>
                    ) : (
                      "Lưu thay đổi"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <Footer className="w-full bg-gray-800 text-white text-center p-4" />
      </div>
    </div>
  );
};

export default User;
