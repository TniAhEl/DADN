import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import {
  Clock,
  RefreshCw,
  Droplet,
  Sun,
  Settings,
  Activity,
} from "lucide-react";
import Modal from "../../components/Modal";

const ConfigDevice = () => {
  const [pumpRunning, setPumpRunning] = useState(false);
  const [pumpSpeed, setPumpSpeed] = useState(50);
  const [pumpMode, setPumpMode] = useState("manual");
  const [lightOn, setLightOn] = useState(false);
  const [lightIntensity, setLightIntensity] = useState(70);
  const [lightMode, setLightMode] = useState("manual");
  const [showMoistureModal, setShowMoistureModal] = useState(false);
  const [showLightModal, setShowLightModal] = useState(false);
  const [moistureMin, setMoistureMin] = useState(30);
  const [moistureMax, setMoistureMax] = useState(70);

  const [lightMin, setLightMin] = useState(10);
  const [lightMax, setLightMax] = useState(80);

  const togglePump = () => {
    setPumpRunning(!pumpRunning);
  };

  const toggleLight = () => {
    setLightOn(!lightOn);
  };
  const togglePumpMode = () => {
    const newMode = pumpMode === "manual" ? "auto" : "manual";
    setPumpMode(newMode);
  };
  const toggleLightMode = () => {
    const newMode = lightMode === "manual" ? "auto" : "manual";
    setLightMode(newMode);
  };
  {
    /* Modal Cấu hình độ ẩm */
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar className="w-20% min-h-screen bg-gray-800 text-white" />
      {/* nội dung */}
      <div className="flex flex-col w-5/6 min-h-screen bg-green-50">
        {/* Header */}
        <Header className="w-full bg-blue-500 text-white p-4" />
        <div className="flex-grow p-6">
          <h1 className="text-3xl font-bold text-center mt-2 mb-6 text-green-700">
            Quản lý thiết bị
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Droplet className="text-blue-500 w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-semibold">Bơm nước</h2>
                </div>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 flex items-center shadow-sm">
                  <div className="bg-green-100 rounded-full p-2 mr-3">
                    <Clock className="text-green-500 w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium uppercase">
                      TRẠNG THÁI
                    </div>
                    <div className="font-medium">
                      {pumpRunning ? "Đang chạy" : "Không chạy"}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 flex items-center shadow-sm">
                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <RefreshCw className="text-blue-500 w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-xs text-gray-500 font-medium uppercase">
                      CHẾ ĐỘ
                    </div>
                    <div className="font-medium">
                      {pumpMode === "manual" ? "Thủ công" : "Tự động"}
                    </div>
                  </div>

                  <div
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      pumpMode === "auto" ? "bg-blue-600" : "bg-gray-300"
                    }`}
                    onClick={togglePumpMode}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        pumpMode === "auto" ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 flex flex-col items-center shadow-sm mb-4">
                <div className="flex space-x-6 mb-4 w-full justify-center">
                  <button
                    className={`px-6 py-2 rounded-lg font-semibold border transition-all duration-300 transform hover:scale-105 ${
                      pumpRunning
                        ? "bg-green-500 text-white"
                        : "bg-white text-gray-700 hover:bg-green-100"
                    }`}
                    onClick={() => !pumpRunning && togglePump()}
                    disabled={pumpMode === "auto"}
                  >
                    BẬT
                  </button>
                  <button
                    className={`px-6 py-2 rounded-lg font-semibold border transition-all duration-300 transform hover:scale-105 ${
                      !pumpRunning
                        ? "bg-red-500 text-white"
                        : "bg-white text-gray-700 hover:bg-green-100"
                    }`}
                    onClick={() => pumpRunning && togglePump()}
                    disabled={pumpMode === "auto"}
                  >
                    TẮT
                  </button>
                </div>

                <p className="text-gray-700 text-center mb-4">
                  Máy bơm nước hiện đang {pumpRunning ? "BẬT" : "TẮT"}
                  {pumpMode === "auto" && " (Điều khiển tự động)"}
                </p>

                <div className="w-full mt-2">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Activity className="w-4 h-4 text-blue-500 mr-2" />
                      <span className="text-sm font-medium">Tốc độ bơm</span>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                      {pumpSpeed}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={pumpSpeed}
                    onChange={(e) => setPumpSpeed(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    disabled={!pumpRunning || pumpMode === "auto"}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Chậm</span>
                    <span>Trung bình</span>
                    <span>Nhanh</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className="bg-yellow-100 rounded-full p-3 mr-4">
                    <Sun className="text-yellow-500 w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-semibold">Hệ thống đèn</h2>
                </div>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 flex items-center shadow-sm">
                  <div className="bg-green-100 rounded-full p-2 mr-3">
                    <Clock className="text-green-500 w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium uppercase">
                      TRẠNG THÁI
                    </div>
                    <div className="font-medium">
                      {lightOn ? "Đang bật" : "Đã tắt"}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 flex items-center shadow-sm">
                  <div className="bg-yellow-100 rounded-full p-2 mr-3">
                    <RefreshCw className="text-yellow-500 w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-xs text-gray-500 font-medium uppercase">
                      CHẾ ĐỘ
                    </div>
                    <div className="font-medium">
                      {lightMode === "manual" ? "Thủ công" : "Tự động"}
                    </div>
                  </div>

                  <div
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      lightMode === "auto" ? "bg-yellow-500" : "bg-gray-300"
                    }`}
                    onClick={toggleLightMode}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        lightMode === "auto" ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 flex flex-col items-center shadow-sm mb-4">
                <div className="flex space-x-6 mb-4 w-full justify-center">
                  <button
                    className={`px-6 py-2 rounded-lg font-semibold border transition-all duration-300 transform hover:scale-105 ${
                      lightOn
                        ? "bg-yellow-500 text-white hover:bg-yellow-600 transition"
                        : "bg-white text-gray-700 hover:bg-green-100"
                    }`}
                    onClick={() => !lightOn && toggleLight()}
                    disabled={lightMode === "auto"}
                  >
                    BẬT
                  </button>
                  <button
                    className={`px-6 py-2 rounded-lg font-semibold border transition-all duration-300 transform hover:scale-105 ${
                      !lightOn
                        ? "bg-red-500 text-white"
                        : "bg-white text-gray-700 hover:bg-green-100"
                    }`}
                    onClick={() => lightOn && toggleLight()}
                    disabled={lightMode === "auto"}
                  >
                    TẮT
                  </button>
                </div>

                <p className="text-gray-700 text-center mb-4">
                  Hệ thống đèn hiện đang {lightOn ? "BẬT" : "TẮT"}
                  {lightMode === "auto" && " (Điều khiển tự động)"}
                </p>

                <div className="w-full mt-2">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Sun className="w-4 h-4 text-yellow-500 mr-2" />
                      <span className="text-sm font-medium">
                        Cường độ ánh sáng
                      </span>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-1 rounded">
                      {lightIntensity} Lux
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={lightIntensity}
                    onChange={(e) =>
                      setLightIntensity(parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                    disabled={!lightOn || lightMode === "auto"}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Yếu</span>
                    <span>Vừa</span>
                    <span>Mạnh</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* cấu hình cảm biến */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-8 text-center text-green-700">
              Cấu hình nâng cao
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 justify-items-between">
              {/* Cảm biến độ ẩm */}
              <div className="w-full max-w-sm border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <h3 className="text-xl font-medium mb-2">Cảm biến độ ẩm</h3>
                <p className="text-gray-600 mb-4">
                  Cấu hình ngưỡng kích hoạt tưới tự động
                </p>
                <button
                  onClick={() => setShowMoistureModal(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Cấu hình
                </button>
              </div>

              {/* Cảm biến ánh sáng */}
              <div className="w-full max-w-sm border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <h3 className="text-xl font-medium mb-2">Cảm biến ánh sáng</h3>
                <p className="text-gray-600 mb-4">
                  Cấu hình ngưỡng kích hoạt đèn chiếu sáng
                </p>
                <button
                  onClick={() => setShowLightModal(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Thiết lập
                </button>
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={showMoistureModal}
          onClose={() => setShowMoistureModal(false)}
          title="Cấu hình ngưỡng độ ẩm"
        >
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Độ ẩm tối thiểu (%)
              </label>
              <input
                type="number"
                value={moistureMin}
                onChange={(e) => setMoistureMin(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Độ ẩm tối đa (%)
              </label>
              <input
                type="number"
                value={moistureMax}
                onChange={(e) => setMoistureMax(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              onClick={() => setShowMoistureModal(false)}
              className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Lưu
            </button>
          </div>
        </Modal>

        {/* Modal Thiết lập ánh sáng */}
        <Modal
          isOpen={showLightModal}
          onClose={() => setShowLightModal(false)}
          title="Thiết lập ngưỡng ánh sáng"
        >
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Ánh sáng tối thiểu (Lux)
              </label>
              <input
                type="number"
                value={lightMin}
                onChange={(e) => setLightMin(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Ánh sáng tối đa (Lux)
              </label>
              <input
                type="number"
                value={lightMax}
                onChange={(e) => setLightMax(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              onClick={() => setShowLightModal(false)}
              className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Lưu
            </button>
          </div>
        </Modal>
        <Footer className="w-full bg-gray-200 text-center p-4 mt-auto" />
      </div>
    </div>
  );
};

export default ConfigDevice;
