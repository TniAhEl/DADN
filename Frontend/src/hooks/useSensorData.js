import { useState, useEffect } from "react";
import { fetchSensorData, fetchChartData } from "../services/sensorService";

export const useSensorData = () => {
  const [data, setData] = useState({
    temperature: { value: 0, feedId: "", createdAt: "" },
    moisture: { value: 0, feedId: "", createdAt: "" },
    light: { value: 0, feedId: "", createdAt: "" },
    soil: { value: 0, feedId: "", createdAt: "" },
  });

  const [chartData, setChartData] = useState({
    temperature: { labels: [], values: [] },
    moisture: { labels: [], values: [] },
    light: { labels: [], values: [] },
    soil: { labels: [], values: [] },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [sensor, chart] = await Promise.all([
        fetchSensorData(),
        fetchChartData(),
      ]);
      setData(sensor);
      setChartData(chart);
      setError(null);
    } catch (err) {
      console.error("Error in useSensorData:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();

    const interval = setInterval(() => {
      fetchAllData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return { data, chartData, loading, error, refreshData: fetchAllData };
};
