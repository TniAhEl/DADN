import React from 'react';
import Header from '../ManualComponents/Header';
import Footer from '../ManualComponents/Footer';
import Sidebar from '../ManualComponents/Sidebar';
import DevicesCard from './DevicesCard'; // Đảm bảo import đúng

const Devices = () => {
  // Mảng thiết bị mẫu
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
    { name: 'Thiết bị 10', id: '010', specs: 'Thông số kỹ thuật 10' } // Thiết bị thứ 10 sẽ không hiển thị
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-1/6 min-h-screen bg-gray-800 text-white" />
      <div className="flex flex-col w-5/6">
        <Header className="w-full bg-blue-500 text-white p-4" />
        <main className="flex-grow container mx-auto py-8">
          <div className="grid grid-cols-3 gap-4">
            {/* Hiển thị tối đa 9 thiết bị */}
            {devices.slice(0, 9).map((device, index) => (
              <DevicesCard 
                key={index}
                name={device.name} 
                id={device.id} 
                specs={device.specs} 
              />
            ))}
          </div>
        </main>
        <Footer className="w-full bg-gray-200 text-center p-4" />
      </div>
    </div>
  );
};

export default Devices;
