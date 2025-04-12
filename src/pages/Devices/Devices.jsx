import React from 'react';
import Header from '../ManualComponents/Header';
import Footer from '../ManualComponents/Footer';
import Sidebar from '../ManualComponents/Sidebar';
import DevicesCard from './DevicesCard';

const Devices = () => {
  const temperature = 32.4;
  const moisture = 59.6;
  const light = 74;
  const soil = 0;

  const cards = [
    {
      title: 'Temperature',
      value: `${temperature}°C`,
      sub: 'degree C',
      percent: (temperature - 4) / (60 - 4) * 100,
      detail: 'Nhiệt độ đo được từ cảm biến DHT11',
      feedId: 'sensor_temp',
      date: '12/04/2025',
      time: '14:32'
    },
    {
      title: 'Air moisture',
      value: `${moisture}`,
      sub: 'Value',
      percent: moisture,
      detail: 'Độ ẩm không khí hiện tại được cảm biến thu nhận',
      feedId: 'sensor_air',
      date: '12/04/2025',
      time: '14:32'
    },
    {
      title: 'Light Sensor',
      value: `${light}`,
      sub: 'Lux',
      percent: (light / 100) * 100,
      detail: 'Cường độ ánh sáng từ cảm biến ánh sáng môi trường',
      feedId: 'sensor_light',
      date: '12/04/2025',
      time: '14:32'
    },
    {
      title: 'Soil Moisture',
      value: `${soil}%`,
      sub: 'Value',
      percent: soil,
      detail: 'Độ ẩm của đất tại vị trí cảm biến',
      feedId: 'sensor_soil',
      date: '12/04/2025',
      time: '14:32'
    }
  ];

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
