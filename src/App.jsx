import React, { useState } from 'react';
import Devices from './pages/Devices';
import Schedule from './pages/Schedule';

const App = () => {
  const [deviceData, setDeviceData] = useState({
    currentDate: '2025-04-12',
    currentTime: '14:32',
    moisture: 59.6,
    temperature: 32.4,
    soil: 0
  });

  return (
    <div>
      <Devices setDeviceData={setDeviceData} />
      <Schedule deviceData={deviceData} />
    </div>
  );
};

export default App;
