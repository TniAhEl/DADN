import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import { useAuth, PERMISSIONS, AdminGate } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { currentUser, isAdmin, hasPermission } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEditUser, setCurrentEditUser] = useState(null);

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/unauthorized");
    }
  }, [isAdmin, navigate]);
  // const users = [
  //   {
  //     id: 1,
  //     name: "Nguyen Van A",
  //     email: "a@gmail.com",
  //     role: "Admin",
  //     status: "Active",
  //   },
  //   {
  //     id: 2,
  //     name: "Tran Thi B",
  //     email: "b@gmail.com",
  //     role: "User",
  //     status: "Inactive",
  //   },
  //   {
  //     id: 3,
  //     name: "Le Van C",
  //     email: "c@gmail.com",
  //     role: "User",
  //     status: "Active",
  //   },
  // ];
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // Đối với môi trường thực tế, thay thế bằng API call thực sự
        // const response = await fetch('http://localhost:3000/api/v1/admin/users');
        // const data = await response.json();
        // if (response.ok) {
        //   setUsers(data);
        // } else {
        //   throw new Error(data.message || 'Failed to fetch users');
        // }

        // Mock data cho demo
        setUsers([
          {
            id: 1,
            name: "Nguyen Van A",
            email: "a@gmail.com",
            role: "Admin",
            status: "Active",
          },
          {
            id: 2,
            name: "Tran Thi B",
            email: "b@gmail.com",
            role: "User",
            status: "Inactive",
          },
          {
            id: 3,
            name: "Le Van C",
            email: "c@gmail.com",
            role: "User",
            status: "Active",
          },
          {
            id: 4,
            name: "Pham Van D",
            email: "d@gmail.com",
            role: "Customer",
            status: "Active",
          },
        ]);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching users:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);
  const handleAddUser = () => {
    setShowAddModal(true);
  };

  // Hàm xử lý chỉnh sửa người dùng
  const handleEditUser = (user) => {
    setCurrentEditUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      // Đối với môi trường thực tế, thay thế bằng API call thực sự
      // try {
      //   await fetch(`http://localhost:3000/api/v1/admin/users/${userId}`, {
      //     method: 'DELETE'
      //   });
      //   setUsers(users.filter(user => user.id !== userId));
      // } catch (err) {
      //   console.error("Error deleting user:", err);
      // }

      // Mock xóa cho demo
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  // Modal thêm người dùng mới
  const AddUserModal = () => (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Add New User</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Full name"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Email address"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Role</label>
            <select className="w-full border border-gray-300 rounded px-3 py-2">
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Status</label>
            <select className="w-full border border-gray-300 rounded px-3 py-2">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                // Add new user logic here
                setShowAddModal(false);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Modal chỉnh sửa người dùng
  const EditUserModal = () => (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Edit User</h2>
        {currentEditUser && (
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                defaultValue={currentEditUser.name}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-3 py-2"
                defaultValue={currentEditUser.email}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Role</label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                defaultValue={currentEditUser.role}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="Customer">Customer</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Status</label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                defaultValue={currentEditUser.status}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  // Update user logic here
                  setShowEditModal(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );

  return (
    <AdminGate>
      <div className="flex min-h-screen">
        <Sidebar className="w-1/6 min-h-screen bg-gray-800 text-white" />
        <div className="flex flex-col w-5/6">
          <Header className="w-full bg-blue-500 text-white p-4" />

          <main className="flex-grow container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">User Management</h1>
              <button
                onClick={handleAddUser}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
              >
                ➕ Add User
              </button>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <span className="block sm:inline">{error}</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 shadow-md rounded-md">
                  <thead className="bg-gray-100">
                    <tr className="text-left">
                      <th className="py-3 px-4 border border-gray-300 text-center">
                        #
                      </th>
                      <th className="py-3 px-4 border border-gray-300">Name</th>
                      <th className="py-3 px-4 border border-gray-300">
                        Email
                      </th>
                      <th className="py-3 px-4 border border-gray-300">Role</th>
                      <th className="py-3 px-4 border border-gray-300">
                        Status
                      </th>
                      <th className="py-3 px-4 border border-gray-300 text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border border-gray-300 text-center">
                          {index + 1}
                        </td>
                        <td className="py-2 px-4 border border-gray-300">
                          {user.name}
                        </td>
                        <td className="py-2 px-4 border border-gray-300">
                          {user.email}
                        </td>
                        <td className="py-2 px-4 border border-gray-300">
                          {user.role}
                        </td>
                        <td className="py-2 px-4 border border-gray-300">
                          <span
                            className={
                              user.status === "Active"
                                ? "text-green-600 font-medium"
                                : "text-red-500 font-medium"
                            }
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="py-2 px-4 border border-gray-300 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <button
                              onClick={() => handleEditUser(user)}
                              className="bg-gray-800 hover:bg-gray-500 text-white px-3 py-1 rounded flex items-center space-x-1"
                            >
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="bg-red-600 hover:bg-red-400 text-white px-3 py-1 rounded flex items-center space-x-1"
                            >
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>

          <Footer className="w-full bg-gray-200 text-center p-4" />
        </div>
      </div>

      {showAddModal && <AddUserModal />}
      {showEditModal && <EditUserModal />}
    </AdminGate>
  );
};

export default Admin;
