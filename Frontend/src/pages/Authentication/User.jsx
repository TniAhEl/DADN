import React, { useState, useEffect } from "react";
import Header from "../ManualComponents/Header";
import Footer from "../ManualComponents/Footer";
import Sidebar from "../ManualComponents/Sidebar";

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
  return null;
};


const User = () => {
  const [loggedInUser, setLoggedInUser] = useState(getCookie("user_name"));
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+123 456 7890",
    role: "Admin",
    address: "Thu Duc, HCM",
    department: "IT Department",
    joinDate: "2023-01-15",
    lastLogin: "2025-04-05 10:00 AM",
    accountStatus: "Active",
    permissions: ["Dashboard", "Users", "Reports"],
    profileImage: "https://via.placeholder.com/150",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });
  useEffect(() => {
    if (loggedInUser) {
      fetch(`http://localhost:3000/api/v1/auth/user/${loggedInUser}`)
        .then((res) => res.json())
        .then((data) => setUserInfo(data))
        .catch((err) => console.error("Lỗi lấy thông tin người dùng:", err));
    }
  }, [loggedInUser]);
  
  const callLoginAPI = async (username, password) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      if (response.ok) {
        document.cookie = `user_name=${username}; path=/`;
        setLoggedInUser(username);
        setShowLoginForm(false);
        setNotification({ show: true, message: "Đăng nhập thành công!", type: "success" });
      } else {
        throw new Error(result.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      setNotification({ show: true, message: error.message, type: "error" });
    } finally {
      setTimeout(() => setNotification({ show: false, message: "", type: "success" }), 3000);
    }
  };

  const callRegisterAPI = async (username, password, email) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      const result = await response.json();
      if (response.ok) {
        document.cookie = `user_name=${username}; path=/`;
        setLoggedInUser(username);
        setShowLoginForm(false);
        setNotification({ show: true, message: "Đăng ký thành công!", type: "success" });
      } else {
        throw new Error(result.message || "Đăng ký thất bại");
      }
    } catch (error) {
      setNotification({ show: true, message: error.message, type: "error" });
    } finally {
      setTimeout(() => setNotification({ show: false, message: "", type: "success" }), 3000);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const email = isRegistering ? e.target.email.value : null;
  
    if (isRegistering) {
      await callRegisterAPI(username, password, email);
    } else {
      await callLoginAPI(username, password);
    }
  };
  const handleLogout = () => {
    document.cookie = "user_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLoggedInUser(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const updatedInfo = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      role: e.target.role.value,
      address: e.target.address.value,
      department: e.target.department.value,
    };
  
    try {
      const response = await fetch(`http://localhost:3000/api/v1/auth/user/${loggedInUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedInfo),
      });
  
      const result = await response.json();
      if (response.ok) {
        setUserInfo(result.user);
        setNotification({ show: true, message: "Cập nhật thành công!", type: "success" });
      } else {
        throw new Error(result.message || "Cập nhật thất bại");
      }
    } catch (error) {
      setNotification({ show: true, message: error.message, type: "error" });
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
      setTimeout(() => setNotification({ show: false, message: "", type: "success" }), 3000);
    }
  };
  
  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const res = await fetch("http://localhost:3000/api/v1/upload/image", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (res.ok) {
        const newImageUrl = result.imageUrl;
        // Cập nhật ảnh trong DB luôn
        await fetch(`http://localhost:3000/api/v1/auth/user/${loggedInUser}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profileImage: newImageUrl }),
        });
  
        setUserInfo({ ...userInfo, profileImage: newImageUrl });
        setNotification({ show: true, message: "Cập nhật ảnh thành công!", type: "success" });
      } else {
        throw new Error(result.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      setNotification({ show: true, message: err.message, type: "error" });
    } finally {
      setTimeout(() => setNotification({ show: false }), 3000);
    }
  };

  const renderAuthSection = () => (
    <div className="flex justify-end items-center gap-4">
      {loggedInUser ? (
        <>
          <span className="text-white">Xin chào, {loggedInUser}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
          >
            Đăng xuất
          </button>
        </>
      ) : (
        <button
          onClick={() => setShowLoginForm(true)}
          className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded"
        >
          Đăng ký / Đăng nhập
        </button>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar className="w-1/6 min-h-screen bg-gray-800 text-white" />
      <div className="flex flex-col w-5/6 min-h-screen">
        <div className="w-full bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
          <h1 className="text-xl font-bold">Trang người dùng</h1>
          {renderAuthSection()}
        </div>

        {showLoginForm && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-sm shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-center">
                {isRegistering ? "Đăng ký tài khoản" : "Đăng nhập hệ thống"}
              </h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập</label>
                  <input
                    name="username"
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                  <input
                    name="password"
                    type="password"
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                {isRegistering && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      name="email"
                      type="email"
                      className="w-full border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    {isRegistering ? "Đã có tài khoản? Đăng nhập" : "Chưa có tài khoản? Đăng ký"}
                  </button>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowLoginForm(false)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      {isRegistering ? "Đăng ký" : "Đăng nhập"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {loggedInUser && (
          <>
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
    <input
  type="file"
  accept="image/*"
  onChange={handleProfileImageChange}
  className="absolute bottom-0 right-0 opacity-0 cursor-pointer w-full h-full"
/>
<label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition cursor-pointer">
  Đổi avatar
</label>
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
          </svg><button onClick={() => setIsModalOpen(true)}>
  Chỉnh sửa hồ sơ
</button>
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
{isModalOpen && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg w-full max-w-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Chỉnh sửa hồ sơ</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" defaultValue={userInfo.name} placeholder="Tên" className="border p-2 rounded" />
          <input name="email" defaultValue={userInfo.email} placeholder="Email" className="border p-2 rounded" />
          <input name="phone" defaultValue={userInfo.phone} placeholder="SĐT" className="border p-2 rounded" />
          <input name="address" defaultValue={userInfo.address} placeholder="Địa chỉ" className="border p-2 rounded" />
          <input name="department" defaultValue={userInfo.department} placeholder="Phòng ban" className="border p-2 rounded" />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
</main>            </main>
          </>
        )}

        <div className="mt-auto">
          <Footer className="w-full bg-gray-800 text-white text-center p-4" />
        </div>
      </div>
    </div>
  );
};

export default User;
