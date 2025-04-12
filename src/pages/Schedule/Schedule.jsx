import React, { useState } from 'react';
import Header from '../ManualComponents/Header';
import Footer from '../ManualComponents/Footer';
import Sidebar from '../ManualComponents/Sidebar';

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const deviceData = {
    currentDate: '2025-04-12',
    currentTime: '02:00',
    moisture: 45,
    temperature: 29
  };
  const checkCondition = (operator, deviceValue, ruleValue) => {
    switch (operator) {
      case 'less': return deviceValue < ruleValue;
      case 'less equals': return deviceValue <= ruleValue;
      case 'equals': return deviceValue === ruleValue;
      case 'greater equals': return deviceValue >= ruleValue;
      case 'greater': return deviceValue > ruleValue;
      default: return false;
    }
  };

  
  
  const [history, setHistory] = useState([]);

  const [useSpecificDate, setUseSpecificDate] = useState(true);

  const handleAddEvent = (e) => {
    e.preventDefault();
  
    const form = e.target;
  
    const newEvent = {
      date: useSpecificDate ? form.date.value : '',
      frequency: useSpecificDate ? '' : form.frequency.value,
      title: form.title.value,
      time: form.time.value,
      soilCondition: {
        operator: form.soilOperator.value,
        value: parseInt(form.soilValue.value)
      },
      tempCondition: {
        operator: form.tempOperator.value,
        value: parseInt(form.tempValue.value)
      }
    };
  
    // Cập nhật vào danh sách sự kiện
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  
    // Tự động kiểm tra tưới ngay lập tức
    const matchTime = newEvent.time === deviceData.currentTime;
    const matchDate = newEvent.date
      ? newEvent.date === deviceData.currentDate
      : true;
  
    const soilOK = checkCondition(
      newEvent.soilCondition.operator,
      deviceData.moisture,
      newEvent.soilCondition.value
    );
  
    const tempOK = checkCondition(
      newEvent.tempCondition.operator,
      deviceData.temperature,
      newEvent.tempCondition.value
    );
  
    if (matchTime && matchDate && soilOK && tempOK) {
      const newHistory = {
        date: deviceData.currentDate,
        time: deviceData.currentTime,
        moisture: deviceData.moisture,
        temperature: deviceData.temperature
      };
  
      // Kiểm tra trùng lịch sử
      const alreadyExists = history.some(
        (h) => h.date === newHistory.date && h.time === newHistory.time
      );
  
      if (!alreadyExists) {
        setHistory((prev) => [...prev, newHistory]);
        alert('✅ Điều kiện phù hợp — đã tự động tưới!');
      } else {
        alert('⏳ Đã có bản ghi lịch sử cho thời điểm này.');
      }
    } else {
      alert('⚠️ Lịch tưới vừa thêm không phù hợp điều kiện hiện tại.');
    }
  
    form.reset();
  };
  

  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-1/6 min-h-screen bg-gray-800 text-white" />
      <div className="flex flex-col w-5/6">
        <Header className="w-full bg-blue-500 text-white p-4" />
        <main className="flex-grow container mx-auto py-8">
          <h1 className="text-3xl font-bold text-center">Lịch tưới</h1>
          <p className="mt-4 text-center">Quản lý các sự kiện của bạn trong lịch bên dưới.</p>

          {/* Form thêm sự kiện */}
          <div className="mt-8 max-w-2xl mx-auto p-4 border rounded-lg bg-white shadow-md">
            <h2 className="text-xl font-semibold mb-4">Thêm lịch tưới mới</h2>

            <form onSubmit={handleAddEvent}>
              {/* Chọn sử dụng ngày cụ thể hay tần suất */}
              <div className="mb-4 flex gap-4 items-center">
                <label className="font-semibold">Kiểu lặp:</label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="scheduleType"
                    checked={useSpecificDate}
                    onChange={() => setUseSpecificDate(true)}
                  />
                  Ngày cụ thể
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="scheduleType"
                    checked={!useSpecificDate}
                    onChange={() => setUseSpecificDate(false)}
                  />
                  Tần suất
                </label>
              </div>

              <input
                type="date"
                name="date"
                className="w-full p-2 mb-4 border rounded"
                disabled={!useSpecificDate}
                required={useSpecificDate}
              />

              <select
                name="frequency"
                className="w-full p-2 mb-4 border rounded"
                disabled={useSpecificDate}
                required={!useSpecificDate}
              >
                <option value="">--Chọn tần suất--</option>
                <option value="Daily">Hàng ngày</option>
                <option value="Weekly">Hàng tuần</option>
                <option value="Monthly">Hàng tháng</option>
              </select>

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

              {/* Điều kiện độ ẩm đất */}
              <label className="block font-semibold mb-2">Điều kiện độ ẩm đất</label>
              <div className="flex gap-2 mb-4">
                <select name="soilOperator" className="p-2 border rounded w-1/2" required>
                  <option value="less">{`<`}</option>
                  <option value="less equals">{`≤`}</option>
                  <option value="equals">{`=`}</option>
                  <option value="greater equals">{`≥`}</option>
                  <option value="greater">{`>`}</option>
                </select>
                <input
                  type="number"
                  name="soilValue"
                  className="p-2 border rounded w-1/2"
                  placeholder="%"
                  min="0"
                  max="100"
                  required
                />
              </div>

              {/* Điều kiện nhiệt độ */}
              <label className="block font-semibold mb-2">Điều kiện nhiệt độ</label>
              <div className="flex gap-2 mb-4">
                <select name="tempOperator" className="p-2 border rounded w-1/2" required>
                  <option value="less">{`<`}</option>
                  <option value="less equals">{`≤`}</option>
                  <option value="equals">{`=`}</option>
                  <option value="greater equals">{`≥`}</option>
                  <option value="greater">{`>`}</option>
                </select>
                <input
                  type="number"
                  name="tempValue"
                  className="p-2 border rounded w-1/2"
                  placeholder="°C"
                  required
                />
              </div>

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
    {showSchedule ? 'Ẩn lịch tưới' : 'Xem lịch tưới'}
  </button>
</div>
          {/* Danh sách sự kiện */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Các lịch tưới của bạn</h2>
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border">Ngày</th>
                  <th className="px-4 py-2 border">Tần suất</th>
                  <th className="px-4 py-2 border">Tên sự kiện</th>
                  <th className="px-4 py-2 border">Thời gian</th>
                  <th className="px-4 py-2 border">Độ ẩm</th>
                  <th className="px-4 py-2 border">Nhiệt độ</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border">{event.date || '—'}</td>
                    <td className="px-4 py-2 border">{event.frequency || '—'}</td>
                    <td className="px-4 py-2 border">{event.title}</td>
                    <td className="px-4 py-2 border">{event.time}</td>
                    <td className="px-4 py-2 border">
                      {event.soilCondition.operator} {event.soilCondition.value}%
                    </td>
                    <td className="px-4 py-2 border">
                      {event.tempCondition.operator} {event.tempCondition.value}°C
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-12">
  <h2 className="text-2xl font-semibold mb-4 text-center">Lịch sử tưới</h2>
  <table className="min-w-full table-auto border-collapse text-white">
    <thead>
      <tr className="bg-gray-700">
        <th className="px-4 py-2 border">Ngày</th>
        <th className="px-4 py-2 border">Thời gian</th>
        <th className="px-4 py-2 border">Độ ẩm ghi nhận</th>
        <th className="px-4 py-2 border">Nhiệt độ ghi nhận</th>
      </tr>
    </thead>
    <tbody>
      {history.map((record, index) => (
        <tr key={index} className="hover:bg-gray-800">
          <td className="px-4 py-2 border">{record.date}</td>
          <td className="px-4 py-2 border">{record.time}</td>
          <td className="px-4 py-2 border">{record.moisture}%</td>
          <td className="px-4 py-2 border">{record.temperature}°C</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
          </div>
        </main>
        <Footer className="w-full bg-gray-200 text-center p-4" />
      </div>
    </div>
  );
};




export default Schedule;
