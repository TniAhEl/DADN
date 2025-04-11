import React, { useState } from 'react';
import Header from '../ManualComponents/Header';
import Footer from '../ManualComponents/Footer';
import Sidebar from '../ManualComponents/Sidebar';

const User = () => {
  // Trạng thái lưu thông tin người dùng
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+123 456 7890',
    role: 'Admin',
    lastLogin: '2025-04-05 10:00 AM', // Thông tin đăng nhập lần cuối
    accountStatus: 'Active' // Trạng thái tài khoản
  });

  // Trạng thái để mở hoặc đóng modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cập nhật thông tin người dùng khi lưu
  const handleSave = (e) => {
    e.preventDefault();
    const updatedInfo = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      role: e.target.role.value
    };
    setUserInfo(updatedInfo); // Cập nhật thông tin
    setIsModalOpen(false); // Đóng modal
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-1/6 min-h-screen bg-gray-800 text-white" />
      <div className="flex flex-col w-5/6">
        <Header className="w-full bg-blue-500 text-white p-4" />
        <main className="flex-grow container mx-auto py-8">
          <h1 className="text-3xl font-bold text-center">Thông tin người dùng</h1>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Hồ sơ người dùng */}
            <div className="p-6 border rounded-lg bg-white shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Hồ sơ người dùng</h2>
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between">
                  <span className="font-semibold">Tên:</span>
                  <span>{userInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Email:</span>
                  <span>{userInfo.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Số điện thoại:</span>
                  <span>{userInfo.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Vai trò:</span>
                  <span>{userInfo.role}</span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <button
                  className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  onClick={() => setIsModalOpen(true)}
                >
                  Chỉnh sửa hồ sơ
                </button>
              </div>
            </div>

            {/* Hồ sơ hệ thống */}
            <div className="p-6 border rounded-lg bg-white shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Hồ sơ hệ thống</h2>
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between">
                  <span className="font-semibold">Trạng thái tài khoản:</span>
                  <span>{userInfo.accountStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Đăng nhập lần cuối:</span>
                  <span>{userInfo.lastLogin}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal chỉnh sửa thông tin */}
          {isModalOpen && (
            <div className="fixed inset-0 border rounded-lg flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">Chỉnh sửa thông tin</h2>
                <form onSubmit={handleSave}>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold">Tên</label>
                    <input
                      type="text"
                      name="name"
                      className="w-full p-2 border rounded"
                      defaultValue={userInfo.name}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full p-2 border rounded"
                      defaultValue={userInfo.email}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold">Số điện thoại</label>
                    <input
                      type="text"
                      name="phone"
                      className="w-full p-2 border rounded"
                      defaultValue={userInfo.phone}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold">Vai trò</label>
                    <input
                      type="text"
                      name="role"
                      className="w-full p-2 border rounded"
                      defaultValue={userInfo.role}
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      className="py-2 px-6 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                    >
                      Lưu
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
        <Footer className="w-full bg-gray-200 text-center p-4" />
      </div>
    </div>
  );
};

export default User;
