import React from 'react';
import Header from '../ManualComponents/Header';
import Footer from '../ManualComponents/Footer';
import Sidebar from '../ManualComponents/Sidebar';

const Admin = () => {
  const users = [
    { id: 1, name: 'Nguyen Van A', email: 'a@gmail.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Tran Thi B', email: 'b@gmail.com', role: 'User', status: 'Inactive' },
    { id: 3, name: 'Le Van C', email: 'c@gmail.com', role: 'User', status: 'Active' },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-1/6 min-h-screen bg-gray-800 text-white" />
      <div className="flex flex-col w-5/6">
        <Header className="w-full bg-blue-500 text-white p-4" />

        <main className="flex-grow container mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">User Management</h1>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow">
              ➕ Add User
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 shadow-md rounded-md">
              <thead className="bg-gray-100">
                <tr className="text-left">
                  <th className="py-3 px-4 border border-gray-300 text-center">#</th>
                  <th className="py-3 px-4 border border-gray-300">Name</th>
                  <th className="py-3 px-4 border border-gray-300">Email</th>
                  <th className="py-3 px-4 border border-gray-300">Role</th>
                  <th className="py-3 px-4 border border-gray-300">Status</th>
                  <th className="py-3 px-4 border border-gray-300 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border border-gray-300 text-center">{index + 1}</td>
                    <td className="py-2 px-4 border border-gray-300">{user.name}</td>
                    <td className="py-2 px-4 border border-gray-300">{user.email}</td>
                    <td className="py-2 px-4 border border-gray-300">{user.role}</td>
                    <td className="py-2 px-4 border border-gray-300">
                      <span className={user.status === 'Active' ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border border-gray-300 text-center">
                        <div className="flex justify-center items-center gap-2">
                            <button className="bg-gray-800 hover:bg-gray-500 text-white px-3 py-1 rounded flex items-center space-x-1">
                                <span>Edit</span>
                            </button>
                            <button className="bg-red-600 hover:bg-red-400 text-white px-3 py-1 rounded flex items-center space-x-1">
                                <span>Delete</span>
                            </button>
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        <Footer className="w-full bg-gray-200 text-center p-4" />
      </div>
    </div>
  );
};

export default Admin;
