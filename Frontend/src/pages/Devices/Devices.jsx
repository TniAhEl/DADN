import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import DevicesCard from "./DevicesCard";
import SensorChart from "../../components/SensorChart";
import Loading from "../../components/Loading";

const Devices = () => {
  // Lưu trữ các thông tin của sensor ở dạng object
  const [data, setData] = useState({
    temperature: { value: 0, feedId: "", createdAt: new Date() },
    moisture: { value: 0, feedId: "", createdAt: new Date() },
    light: { value: 0, feedId: "", createdAt: new Date() },
    soil: { value: 0, feedId: "", createdAt: new Date() },
  });
  const [loading, setLoading] = useState(true);

  const [selectedChart, setSelectedChart] = useState("temperature");
  const [chartData, setChartData] = useState({
    temperature: { labels: [], values: [] },
    moisture: { labels: [], values: [] },
    light: { labels: [], values: [] },
    soil: { labels: [], values: [] },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tempRes, moistureRes, lightRes, soilRes] = await Promise.all([
          fetch("http://localhost:3000/api/v1/dht-temp/latest"),
          fetch("http://localhost:3000/api/v1/dht-moisure/latest"),
          fetch("http://localhost:3000/api/v1/light-sensor/latest"),
          fetch("http://localhost:3000/api/v1/soil-moisure/latest"),
        ]);

        if (!tempRes.ok || !moistureRes.ok || !lightRes.ok || !soilRes.ok) {
          throw new Error("Một hoặc nhiều API trả về lỗi");
        }

        const tempData = await tempRes.json();
        const moistureData = await moistureRes.json();
        const lightData = await lightRes.json();
        const soilData = await soilRes.json();

        setData({
          temperature: {
            value: Number(tempData.data.value),
            feedId: tempData.data.feed_id,
            createdAt: tempData.data.created_at,
          },
          moisture: {
            value: Number(moistureData.data.value),
            feedId: moistureData.data.feed_id,
            createdAt: moistureData.data.created_at,
          },
          light: {
            value: Number(lightData.data.value),
            feedId: lightData.data.feed_id,
            createdAt: lightData.data.created_at,
          },
          soil: {
            value: Number(soilData.data.value),
            feedId: soilData.data.feed_id,
            createdAt: soilData.data.created_at,
          },
        });

        fetchAllChartData();
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllChartData = async () => {
      try {
        const now = new Date();
        const labels = Array.from({ length: 12 }, (_, i) => {
          const time = new Date(now.getTime() - (11 - i) * 60 * 60 * 1000);
          return `${time.getHours()}:00`;
        });

        setChartData({
          temperature: {
            labels,
            values: generateMockData(25, 5, labels.length),
          },
          moisture: {
            labels,
            values: generateMockData(60, 15, labels.length),
          },
          light: {
            labels,
            values: generateMockData(50, 30, labels.length),
          },
          soil: {
            labels,
            values: generateMockData(70, 10, labels.length),
          },
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const generateMockData = (baseValue, variance, length) => {
    return Array.from({ length }, (_, i) => {
      const hour = i % 24;
      const timeInfluence =
        Math.sin((hour / 24) * Math.PI * 2) * variance * 0.5;
      const randomness = (Math.random() - 0.5) * variance;
      return Math.round(baseValue + timeInfluence + randomness);
    });
  };

  const { temperature, moisture, light, soil } = data;

  const cards = [
    {
      type: "temperature",
      title: "Temperature",
      value: `${temperature.value}°C`,
      sub: "degree C",
      percent: ((temperature.value - 4) / (60 - 4)) * 100,
      detail: "Nhiệt độ đo được từ cảm biến DHT11",
      feedId: temperature.feedId, // lấy feed_id từ API
      date: new Date(temperature.createdAt).toLocaleDateString("vi-VN"),
      time: new Date(temperature.createdAt).toLocaleTimeString("vi-VN"),
    },
    {
      type: "moisture",
      title: "Air moisture",
      value: `${moisture.value}`,
      sub: "Value",
      percent: moisture.value,
      detail: "Độ ẩm không khí hiện tại được cảm biến thu nhận",
      feedId: moisture.feedId,
      date: new Date(moisture.createdAt).toLocaleDateString("vi-VN"),
      time: new Date(moisture.createdAt).toLocaleTimeString("vi-VN"),
    },
    {
      type: "light",
      title: "Light Sensor",
      value: `${light.value}`,
      sub: "Lux",
      percent: (light.value / 100) * 100,
      detail: "Cường độ ánh sáng từ cảm biến ánh sáng môi trường",
      feedId: light.feedId,
      date: new Date(light.createdAt).toLocaleDateString("vi-VN"),
      time: new Date(light.createdAt).toLocaleTimeString("vi-VN"),
    },
    {
      type: "soil",
      title: "Soil Moisture",
      value: `${soil.value}%`,
      sub: "Value",
      percent: soil.value,
      detail: "Độ ẩm của đất tại vị trí cảm biến",
      feedId: soil.feedId,
      date: new Date(soil.createdAt).toLocaleDateString("vi-VN"),
      time: new Date(soil.createdAt).toLocaleTimeString("vi-VN"),
    },
  ];

  const chartConfig = {
    temperature: {
      title: "Nhiệt độ",
      lineColor: "rgb(239, 68, 68)",
      yAxisLabel: "°C",
    },
    moisture: {
      title: "Độ ẩm không khí",
      lineColor: "rgb(59, 130, 246)",
      yAxisLabel: "%",
    },
    light: {
      title: "Cường độ ánh sáng",
      lineColor: "rgb(234, 179, 8)",
      yAxisLabel: "Lux",
    },
    soil: {
      title: "Độ ẩm đất",
      lineColor: "rgb(34, 197, 94)",
      yAxisLabel: "%",
    },
  };

  if (loading) {
    return <Loading />; // Hiển thị Loading nếu đang tải dữ liệu
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-1/6 min-h-screen bg-gray-800 text-white" />
      <div className="flex flex-col w-5/6">
        <Header className="w-full bg-blue-500 text-white p-4" />
        <main className="flex-grow container mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold mb-6 text-[#5f6fff]">
            Bảng điều khiển thiết bị
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-10">
            {cards.map((card, index) => (
              <DevicesCard key={index} {...card} />
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-blue-500">
              Biểu đồ dữ liệu cảm biến
            </h2>

            <div className="flex border-b border-gray-200 mb-4">
              {Object.keys(chartConfig).map((type) => (
                <button
                  key={type}
                  className={`px-4 py-2 font-medium ${
                    selectedChart === type
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setSelectedChart(type)}
                >
                  {chartConfig[type].title}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <SensorChart
                title={chartConfig[selectedChart].title}
                chartData={chartData[selectedChart]}
                yAxisLabel={chartConfig[selectedChart].yAxisLabel}
                lineColor={chartConfig[selectedChart].lineColor}
              />
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p>
                Biểu đồ hiển thị dữ liệu theo thời gian thực 12 giờ qua. Cập
                nhật mỗi phút.
              </p>
              <p className="mt-1">
                Giá trị hiện tại:
                <span className="font-semibold ml-1">
                  {selectedChart === "temperature" && temperature.value + "°C"}
                  {selectedChart === "moisture" && moisture.value + "%"}
                  {selectedChart === "light" && light.value + " Lux"}
                  {selectedChart === "soil" && soil.value + "%"}
                </span>
              </p>
            </div>
          </div>
        </main>
        <Footer className="w-full bg-gray-200 text-center p-4" />
      </div>
    </div>
  );
};

export default Devices;
