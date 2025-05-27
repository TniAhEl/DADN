import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const DeviceContext = createContext();

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return context;
};

export const DeviceProvider = ({ children }) => {
  // trạng thái bơm
  const [pumpRunning, setPumpRunning] = useState(false);
  const [pumpSpeed, setPumpSpeed] = useState(null);
  const [pumpMode, setPumpMode] = useState("manual");
  const [pumpDebounceTimer, setPumpDebounceTimer] = useState(null);

  // trạng thái đèn
  const [lightOn, setLightOn] = useState(false);
  const [lightIntensity, setLightIntensity] = useState(null);
  const [lightMode, setLightMode] = useState("manual");
  const [lightDebounceTimer, setLightDebounceTimer] = useState(null);

  // ngưỡng độ ẩm và ánh sáng
  // Mặc định là 30-70% độ ẩm và 10-80% ánh sáng
  const [moistureMin, setMoistureMin] = useState(30);
  const [moistureMax, setMoistureMax] = useState(70);
  const [lightMin, setLightMin] = useState(10);
  const [lightMax, setLightMax] = useState(80);

  // chế độ hiện thị
  const [showMoistureModal, setShowMoistureModal] = useState(false);
  const [showLightModal, setShowLightModal] = useState(false);

  // Hàm gọi API để lấy trạng thái bơm
  const fetchPumpStatus = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/getPump");
      const value = parseFloat(response.data.data.value); // ép thành số

      if (value > 0) {
        setPumpRunning(true);
      } else {
        setPumpRunning(false);
      }
      setPumpSpeed(Math.round(value * 100)); // 0.3 --> 30%, 1 --> 100%
    } catch (error) {
      console.error("Error fetching pump status:", error.message);
    }
  };

  const fetchLightStatus = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/getLight");
      const value = parseFloat(response.data.data.value);

      if (value > 0) {
        setLightOn(true);
      } else {
        setLightOn(false);
      }
      setLightIntensity(Math.round(value * 100));
    } catch (error) {
      console.error("Error fetching light status:", error.message);
    }
  };

  const fetchMoistureThreshold = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/moisture-threshold/latest"
      );
      const { min, max } = response.data.data;

      if (min !== undefined && max !== undefined) {
        setMoistureMin(min);
        setMoistureMax(max);
        console.log("Loaded moisture threshold:", min, max);
      }
    } catch (error) {
      console.error("Error fetching moisture threshold:", error.message);
    }
  };

  const fetchLightThreshold = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/light-threshold/latest"
      );
      const { min, max } = response.data.data;

      if (min !== undefined && max !== undefined) {
        setLightMin(min);
        setLightMax(max);
        console.log("Loaded light threshold:", min, max);
      }
    } catch (error) {
      console.error("Error fetching light threshold:", error.message);
    }
  };

  const sendPumpSpeedToServer = async (speed) => {
    try {
      const valueToSend = speed / 100;
      await axios.post("http://localhost:3000/api/v1/turnOnPump", {
        value: valueToSend,
      });
      console.log("Sent pump speed:", valueToSend);
    } catch (error) {
      console.error("Error sending pump speed:", error.message);
    }
  };

  const sendLightIntensityToServer = async (intensity) => {
    try {
      const valueToSend = intensity / 100;
      await axios.post("http://localhost:3000/api/v1/turnOnLight", {
        value: valueToSend,
      });
      console.log("Sent light intensity:", valueToSend);
    } catch (error) {
      console.error("Error sending light intensity:", error.message);
    }
  };

  const togglePump = async () => {
    try {
      const newPumpState = !pumpRunning; // trạng thái sau khi bật / tắt
      setPumpRunning(newPumpState);

      if (newPumpState) {
        const valueToSend = pumpSpeed / 100;
        await axios.post("http://localhost:3000/api/v1/turnOnPump", {
          value: valueToSend,
        });
        console.log("Sent pump speed:", valueToSend);
      } else {
        await axios.post("http://localhost:3000/api/v1/turnOnPump", {
          value: 0,
        });
        console.log("Turned pump off");
      }
    } catch (error) {
      console.error("Error toggling pump:", error.message);
    }
  };

  const toggleLight = async () => {
    try {
      const newLightState = !lightOn;
      setLightOn(newLightState);

      if (newLightState) {
        const valueToSend = lightIntensity / 100;
        await axios.post("http://localhost:3000/api/v1/turnOnLight", {
          value: valueToSend,
        });
        console.log("Turned light ON:", valueToSend);
      } else {
        await axios.post("http://localhost:3000/api/v1/turnOnLight", {
          value: 0,
        });
        console.log("Turned light OFF");
      }
    } catch (error) {
      console.error("Error toggling light:", error.message);
    }
  };

  const togglePumpMode = () => {
    const newMode = pumpMode === "manual" ? "auto" : "manual";
    setPumpMode(newMode);
  };

  const toggleLightMode = () => {
    const newMode = lightMode === "manual" ? "auto" : "manual";
    setLightMode(newMode);
  };

  const handlePumpSpeedChange = (newSpeed) => {
    setPumpSpeed(newSpeed);

    if (pumpDebounceTimer) {
      clearTimeout(pumpDebounceTimer);
    }

    const timer = setTimeout(() => {
      if (pumpMode === "manual" && pumpRunning) {
        // Chỉ gửi tốc độ bơm nếu đang ở chế độ thủ công và bơm đang chạy
        sendPumpSpeedToServer(newSpeed);
      }
    }, 2000);

    setPumpDebounceTimer(timer);
  };

  const handleLightIntensityChange = (newIntensity) => {
    setLightIntensity(newIntensity);

    if (lightDebounceTimer) {
      clearTimeout(lightDebounceTimer);
    }

    const timer = setTimeout(() => {
      if (lightMode === "manual" && lightOn) {
        sendLightIntensityToServer(newIntensity);
      }
    }, 2000);

    setLightDebounceTimer(timer);
  };

  const saveMoistureThreshold = async () => {
    try {
      await axios.post("http://localhost:3000/api/v1/moisture-threshold", {
        min: moistureMin,
        max: moistureMax,
      });
      console.log("Saved moisture threshold successfully");
      setShowMoistureModal(false);
    } catch (error) {
      console.error("Error saving moisture threshold:", error.message);
    }
  };

  const saveLightThreshold = async () => {
    try {
      await axios.post("http://localhost:3000/api/v1/light-threshold", {
        min: lightMin,
        max: lightMax,
      });
      console.log("Saved light threshold successfully");
      setShowLightModal(false);
    } catch (error) {
      console.error("Error saving light threshold:", error.message);
    }
  };

  const checkMoistureAndControlPump = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/dht-moisure/latest"
      );
      const latestMoisture = parseFloat(response.data.data.value);
      const min = parseFloat(moistureMin);
      const max = parseFloat(moistureMax);

      console.log("Độ ẩm đo:", latestMoisture, "| Ngưỡng:", min, "-", max);

      if (latestMoisture >= min && latestMoisture <= max) {
        await axios.post("http://localhost:3000/api/v1/turnOnPump", {
          value: 1,
        });
        console.log("Trong ngưỡng → Bật bơm");
      } else {
        await axios.post("http://localhost:3000/api/v1/turnOnPump", {
          value: 0,
        });
        console.log("Ngoài ngưỡng → Tắt bơm");
      }
    } catch (error) {
      console.error("Error checking moisture:", error.message);
    }
  };

  const checkLightAndControl = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/light-sensor/latest"
      );
      const latestLight = parseFloat(response.data.data.value);
      const min = parseFloat(lightMin);
      const max = parseFloat(lightMax);

      console.log("Ánh sáng đo:", latestLight, "| Ngưỡng:", min, "-", max);

      if (latestLight >= min && latestLight <= max) {
        await axios.post("http://localhost:3000/api/v1/turnOnLight", {
          value: 1,
        });
        console.log("Ánh sáng phù hợp, đã bật đèn!");
      } else {
        await axios.post("http://localhost:3000/api/v1/turnOnLight", {
          value: 0,
        });
        console.log("Ánh sáng không phù hợp, đã tắt đèn.");
      }
    } catch (error) {
      console.error("Error checking light:", error.message);
    }
  };

  useEffect(() => {
    fetchPumpStatus();
    fetchLightStatus();
    fetchMoistureThreshold();
    fetchLightThreshold();
  }, []);

  // Auto mode effects
  useEffect(() => {
    if (pumpMode !== "auto") return;

    checkMoistureAndControlPump();
    const interval = setInterval(() => {
      checkMoistureAndControlPump();
    }, 30000);

    return () => clearInterval(interval);
  }, [pumpMode, moistureMin, moistureMax]);

  useEffect(() => {
    if (lightMode !== "auto") return;

    checkLightAndControl();
    const interval = setInterval(() => {
      checkLightAndControl();
    }, 30000);

    return () => clearInterval(interval);
  }, [lightMin, lightMax, lightMode]);

  // Context value
  const value = {
    // trạng thái bơm
    pumpRunning,
    pumpSpeed,
    pumpMode,

    // trạng thái đèn
    lightOn,
    lightIntensity,
    lightMode,

    //  ngưỡng độ ẩm và ánh sáng
    moistureMin,
    moistureMax,
    lightMin,
    lightMax,

    //  Modal trạng thái
    showMoistureModal,
    showLightModal,

    //  Hàm API
    togglePump,
    toggleLight,
    togglePumpMode,
    toggleLightMode,
    handlePumpSpeedChange,
    handleLightIntensityChange,
    saveMoistureThreshold,
    saveLightThreshold,

    setMoistureMin,
    setMoistureMax,
    setLightMin,
    setLightMax,

    setShowMoistureModal,
    setShowLightModal,
  };

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
};
