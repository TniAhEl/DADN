import React, { useState, useEffect } from 'react';
import Header from '../ManualComponents/Header';
import Footer from '../ManualComponents/Footer';
import Sidebar from '../ManualComponents/Sidebar';
import DevicesCard from './DevicesCard';

const Devices = () => {
  // Lưu trữ các thông tin của sensor ở dạng object
  const [data, setData] = useState({
    temperature: { value: 0, feedId: '', createdAt: new Date() },
    moisture: { value: 0, feedId: '', createdAt: new Date() },
    light: { value: 0, feedId: '', createdAt: new Date() },
    soil: { value: 0, feedId: '', createdAt: new Date() }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tempRes, moistureRes, lightRes, soilRes] = await Promise.all([
          fetch("http://localhost:3000/api/v1/dht-temp/latest"),
          fetch("http://localhost:3000/api/v1/dht-moisure/latest"),
          fetch("http://localhost:3000/api/v1/light-sensor/latest"),
          fetch("http://localhost:3000/api/v1/soil-moisure/latest")
        ]);

        if (!tempRes.ok || !moistureRes.ok || !lightRes.ok || !soilRes.ok) {
          throw new Error("Một hoặc nhiều API trả về lỗi");
        }

        const tempData = await tempRes.json();
        const moistureData = await moistureRes.json();
        const lightData = await lightRes.json();
        const soilData = await soilRes.json();

        // Cập nhật state với các thông tin được lấy từ API.
        // Lưu ý: chuyển value thành kiểu Number nếu cần, và lưu feed_id, createdAt từ đối tượng data.
        setData({
          temperature: {
            value: Number(tempData.data.value),
            feedId: tempData.data.feed_id,
            createdAt: tempData.data.created_at
          },
          moisture: {
            value: Number(moistureData.data.value),
            feedId: moistureData.data.feed_id,
            createdAt: moistureData.data.created_at
          },
          light: {
            value: Number(lightData.data.value),
            feedId: lightData.data.feed_id,
            createdAt: lightData.data.created_at
          },
          soil: {
            value: Number(soilData.data.value),
            feedId: soilData.data.feed_id,
            createdAt: soilData.data.created_at
          }
        });
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Giải nén các thông tin sensor
  const { temperature, moisture, light, soil } = data;

  // Tạo mảng card, sử dụng thông tin value, feedId và createdAt để hiển thị
  const cards = [
    {
      title: 'Temperature',
      value: `${temperature.value}°C`,
      sub: 'degree C',
      percent: ((temperature.value - 4) / (60 - 4)) * 100,
      detail: 'Nhiệt độ đo được từ cảm biến DHT11',
      feedId: temperature.feedId, // lấy feed_id từ API
      date: new Date(temperature.createdAt).toLocaleDateString('vi-VN'), // chuyển createdAt thành định dạng ngày hiển thị
      time: new Date(temperature.createdAt).toLocaleTimeString('vi-VN')
    },
    {
      title: 'Air moisture',
      value: `${moisture.value}`,
      sub: 'Value',
      percent: moisture.value,
      detail: 'Độ ẩm không khí hiện tại được cảm biến thu nhận',
      feedId: moisture.feedId,
      date: new Date(moisture.createdAt).toLocaleDateString('vi-VN'),
      time: new Date(moisture.createdAt).toLocaleTimeString('vi-VN')
    },
    {
      title: 'Light Sensor',
      value: `${light.value}`,
      sub: 'Lux',
      percent: (light.value / 100) * 100,
      detail: 'Cường độ ánh sáng từ cảm biến ánh sáng môi trường',
      feedId: light.feedId,
      date: new Date(light.createdAt).toLocaleDateString('vi-VN'),
      time: new Date(light.createdAt).toLocaleTimeString('vi-VN')
    },
    {
      title: 'Soil Moisture',
      value: `${soil.value}%`,
      sub: 'Value',
      percent: soil.value,
      detail: 'Độ ẩm của đất tại vị trí cảm biến',
      feedId: soil.feedId,
      date: new Date(soil.createdAt).toLocaleDateString('vi-VN'),
      time: new Date(soil.createdAt).toLocaleTimeString('vi-VN')
    }
  ];

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-1/6 min-h-screen bg-gray-800 text-white" />
      <div className="flex flex-col w-5/6">
        <Header className="w-full bg-blue-500 text-white p-4" />
        <main className="flex-grow container mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Bảng điều khiển thiết bị</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <DevicesCard key={index} {...card} />
            ))}
          </div>
        </main>
        <Footer className="w-full bg-gray-200 text-center p-4" />
      </div>
    </div>
  );
};

export default Devices;
