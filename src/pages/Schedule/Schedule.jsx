import React, { useState } from 'react';
import Header from '../ManualComponents/Header';
import Footer from '../ManualComponents/Footer';
import Sidebar from '../ManualComponents/Sidebar';

const Schedule = () => {
  // Trạng thái lưu các sự kiện lịch
  const [events, setEvents] = useState([
    { date: '2025-04-10', title: 'Meeting with Client', time: '10:00 AM' },
    { date: '2025-04-12', title: 'Team Discussion', time: '02:00 PM' },
    { date: '2025-04-15', title: 'Project Deadline', time: '05:00 PM' }
  ]);

  // Hàm thêm sự kiện vào lịch
  const handleAddEvent = (event) => {
    setEvents([...events, event]);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-1/6 min-h-screen bg-gray-800 text-white" />
      <div className="flex flex-col w-5/6">
        <Header className="w-full bg-blue-500 text-white p-4" />
        <main className="flex-grow container mx-auto py-8">
          <h1 className="text-3xl font-bold text-center">Lịch tưới</h1>
          <p className="mt-4 text-center">
            Quản lý các sự kiện của bạn trong lịch bên dưới.
          </p>

          {/* Form thêm sự kiện */}
          <div className="mt-8 max-w-md mx-auto p-4 border rounded-lg bg-white shadow-md">
            <h2 className="text-xl font-semibold">Thêm lịch tưới mới</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const event = {
                  date: e.target.date.value,
                  title: e.target.title.value,
                  time: e.target.time.value
                };
                handleAddEvent(event);
                e.target.reset();
              }}
            >
              <input
                type="date"
                name="date"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="text"
                name="title"
                className="w-full p-2 mb-4 border rounded"
                placeholder="Tên sự kiện"
                required
              />
              <input
                type="time"
                name="time"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Thêm sự kiện
              </button>
            </form>
          </div>

          {/* Lịch với các sự kiện */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Các lịch tưới của bạn</h2>
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left border">Ngày</th>
                  <th className="px-4 py-2 text-left border">Tên sự kiện</th>
                  <th className="px-4 py-2 text-left border">Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border">{event.date}</td>
                    <td className="px-4 py-2 border">{event.title}</td>
                    <td className="px-4 py-2 border">{event.time}</td>
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

export default Schedule;
