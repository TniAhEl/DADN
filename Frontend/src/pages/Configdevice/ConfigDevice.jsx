import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import { useSchedule } from "../../contexts/ScheduleContext";

const ConfigDevice = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-1/6 min-h-screen bg-gray-800 text-white" />

      <div className="flex flex-col w-5/6">
        <Header className="w-full bg-blue-500 text-white p-4" />
        <div>
          <h1 className="text-4xl font-bold text-center mt-8">
            Cấu hình thiết bị
          </h1>
          <div className="flex justify-center items-center h-screen">
            <p className="text-xl">Chức năng đang được phát triển...</p>
          </div>
        </div>
        <Footer className="w-full bg-gray-200 text-center p-4" />
      </div>
    </div>
  );
};

export default ConfigDevice;
