import React, { useState } from 'react';
import Header from '../ManualComponents/Header';
import Footer from '../ManualComponents/Footer';
import Sidebar from '../ManualComponents/Sidebar';
import ReportsCard from './ReportsCards'; // Import component ReportsCard

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null); // Trạng thái lưu báo cáo đã chọn
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái hiển thị modal

  const reportData = [
    { id: '001', name: 'Báo cáo 1', status: 'Hoàn thành', date: '2025-04-01' },
    { id: '002', name: 'Báo cáo 2', status: 'Đang tiến hành', date: '2025-04-02' },
    { id: '003', name: 'Báo cáo 3', status: 'Chưa bắt đầu', date: '2025-04-03' }
  ];

  const handleRowClick = (report) => {
    setSelectedReport(report); // Cập nhật thông tin báo cáo đã chọn
    setIsModalOpen(true); // Mở modal khi chọn báo cáo
  };

  const closeModal = () => {
    setIsModalOpen(false); // Đóng modal khi không cần hiển thị
    setSelectedReport(null); // Reset thông tin báo cáo
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-1/6 min-h-screen bg-gray-800 text-white" />
      <div className="flex flex-col w-5/6">
        <Header className="w-full bg-blue-500 text-white p-4" />
        <main className="flex-grow container mx-auto py-8">
          <h2 className="text-2xl font-semibold mb-4">Danh sách báo cáo</h2>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left border">ID</th>
                <th className="px-4 py-2 text-left border">Tên báo cáo</th>
                <th className="px-4 py-2 text-left border">Trạng thái</th>
                <th className="px-4 py-2 text-left border">Ngày</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((report, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(report)} // Khi nhấp vào một hàng, chọn báo cáo
                >
                  <td className="px-4 py-2 border">{report.id}</td>
                  <td className="px-4 py-2 border">{report.name}</td>
                  <td className="px-4 py-2 border">{report.status}</td>
                  <td className="px-4 py-2 border">{report.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Hiển thị modal khi có báo cáo được chọn */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center z-50">
              <div className="bg-gray-400 p-6 rounded-lg w-1/3">
                <ReportsCard report={selectedReport} />
                <button 
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={closeModal}
                >
                  Đóng
                </button>
              </div>
            </div>
          )}
        </main>
        <Footer className="w-full bg-gray-200 text-center p-4" />
      </div>
    </div>
  );
};

export default Reports;
