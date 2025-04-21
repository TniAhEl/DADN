import React, { useState, useEffect } from "react";
import Header from "../ManualComponents/Header";
import Footer from "../ManualComponents/Footer";
import Sidebar from "../ManualComponents/Sidebar";
import axios from "axios";


const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const deviceData = {
    currentDate: "2025-04-12",
    currentTime: "02:00",
    moisture: 45,
    temperature: 29,
  };
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const [scheduleRes, moistureRes, tempRes] = await Promise.all([
          axios.get("http://localhost:3000/api/v1/watering-schedule"),
          axios.get("http://localhost:3000/api/v1/dht-moisure/latest"),
          axios.get("http://localhost:3000/api/v1/dht-temp/latest"),
        ]);
  
        const moisture = moistureRes.data?.data?.value ?? "N/A";
        const temperature = tempRes.data?.data?.value ?? "N/A";
  
        const parsedSchedules = scheduleRes.data.schedules.map((item) => {
          const dateObj = new Date(item.date);
          const date = dateObj.toISOString().split("T")[0];
          const time = dateObj.toTimeString().split(":").slice(0, 2).join(":");
  
          return {
            date,
            time,
            moisture,
            temperature,
          };
        });
  
        setHistory(parsedSchedules);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu lịch sử tưới:", error);
      }
    };
  
    fetchHistory();
  }, []);

  const [history, setHistory] = useState([]);

  const [useSpecificDate, setUseSpecificDate] = useState(true);

  const handleAddEvent = (e) => {
    e.preventDefault();
    const form = e.target;
  
    const datetime = new Date(form.datetime.value);
    const newEvent = {
      title: form.title.value,
      date: datetime.toISOString().split("T")[0],
      time: datetime.toTimeString().split(":").slice(0, 2).join(":"),
    };
  
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    alert("📝 Đã thêm sự kiện!");
  
    form.reset();
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
          <div className="mt-8 max-w-2xl mx-auto p-4 border rounded-lg bg-white shadow-md">
            <h2 className="text-xl font-semibold mb-4">Thêm lịch tưới mới</h2>

            <form onSubmit={handleAddEvent}>
  <input
    type="text"
    name="title"
    className="w-full p-2 mb-4 border rounded"
    placeholder="Tên sự kiện"
    required
  />

  <input
    type="datetime-local"
    name="datetime"
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
          <div className="text-center">
            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="mt-6 mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {showSchedule ? "Ẩn lịch tưới" : "Xem lịch tưới"}
            </button>
          </div>
    {/* Danh sách sự kiện */}
    {showSchedule && (
      <div className="mt-8 mx-8 p-4 border rounded-lg bg-white shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Các lịch tưới của bạn</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Tên sự kiện</th>
              <th className="px-4 py-2 border">Ngày tưới</th>
              <th className="px-4 py-2 border">Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{event.title}</td>
                <td className="px-4 py-2 border">{event.date || "—"}</td>
                <td className="px-4 py-2 border">{event.time || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

          {/* History table */}
          <div className="mt-8 mx-8 p-4 border rounded-lg bg-white shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Lịch sử tưới</h2>
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border">Ngày</th>
                  <th className="px-4 py-2 border">Thời gian</th>
                  <th className="px-4 py-2 border">Độ ẩm ghi nhận</th>
                  <th className="px-4 py-2 border">Nhiệt độ ghi nhận</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">{h.date}</td>
                    <td className="px-4 py-2 border">{h.time}</td>
                    <td className="px-4 py-2 border">{h.moisture}%</td>
                    <td className="px-4 py-2 border">{h.temperature}°C</td>
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
