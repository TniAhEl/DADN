import React, { useState } from 'react';
import Header from '../ManualComponents/Header';
import Footer from '../ManualComponents/Footer';
import Sidebar from '../ManualComponents/Sidebar';
import DevicesCard from './DevicesCard';

const Devices = () => {
  const devices = [
    { name: 'Thiết bị 1', id: '001', specs: 'Thông số kỹ thuật 1' },
    { name: 'Thiết bị 2', id: '002', specs: 'Thông số kỹ thuật 2' },
    { name: 'Thiết bị 3', id: '003', specs: 'Thông số kỹ thuật 3' },
    { name: 'Thiết bị 4', id: '004', specs: 'Thông số kỹ thuật 4' },
    { name: 'Thiết bị 5', id: '005', specs: 'Thông số kỹ thuật 5' },
    { name: 'Thiết bị 6', id: '006', specs: 'Thông số kỹ thuật 6' },
    { name: 'Thiết bị 7', id: '007', specs: 'Thông số kỹ thuật 7' },
    { name: 'Thiết bị 8', id: '008', specs: 'Thông số kỹ thuật 8' },
    { name: 'Thiết bị 9', id: '009', specs: 'Thông số kỹ thuật 9' },
    { name: 'Thiết bị 10', id: '010', specs: 'Thông số kỹ thuật 10' }
  ];

  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleDeviceClick = (device) => {
    setSelectedDevice(device);
  };

  const handleCloseModal = () => {
    setSelectedDevice(null);
  };

  const handleConfigDevice = () => {
    alert(`Đang cấu hình thiết bị: ${selectedDevice.name}`);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-1/6 min-h-screen bg-gray-800 text-white" />
      <div className="flex flex-col w-5/6">
        <Header className="w-full bg-blue-500 text-white p-4" />

        <main className="flex-grow container mx-auto py-8 px-4">
          <div className="flex justify-end mb-4 gap-4">
            <button
              onClick={() => alert('Chức năng thêm thiết bị đang được phát triển!')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
            >
              Thêm thiết bị
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {devices.slice(0, 9).map((device, index) => (
              <div key={index} onClick={() => handleDeviceClick(device)} className="cursor-pointer">
                <DevicesCard 
                  name={device.name} 
                  id={device.id} 
                  specs={device.specs} 
                />
              </div>
            ))}
          </div>
        </main>

        <Footer className="w-full bg-gray-200 text-center p-4" />
      </div>

      {/* Modal */}
      {selectedDevice && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 relative">
            <button 
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
              onClick={handleCloseModal}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">Thông tin thiết bị</h2>
            <p><strong>Tên:</strong> {selectedDevice.name}</p>
            <p><strong>ID:</strong> {selectedDevice.id}</p>
            <p><strong>Thông số:</strong> {selectedDevice.specs}</p>
            <p><strong>Trạng thái:</strong> </p>
            <p><strong>Ngưỡng cảnh báo:</strong> </p>

            <div className="mt-4 text-right">
              <button
                onClick={handleConfigDevice}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Cấu hình thiết bị
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Devices;
