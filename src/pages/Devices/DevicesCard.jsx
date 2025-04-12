import React, { useState } from 'react';
import './FlipCard.css'; // Tạo file css này trong cùng thư mục hoặc nhập inline

const DevicesCard = ({ title, value, sub, percent, detail, feedId, date, time }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="perspective" onClick={() => setFlipped(!flipped)}>
      <div className={`relative w-full h-64 transition-transform duration-500 transform-style-preserve-3d ${flipped ? 'rotate-y-180' : ''}`}>
        {/* Front Side */}
        <div className="absolute inset-0 bg-black rounded-lg p-6 text-white shadow backface-hidden">
          <h2 className="text-lg font-semibold mb-4">{title}</h2>
          <div className="flex flex-col items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="#2d3748" strokeWidth="10" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#48bb78"
                strokeWidth="10"
                fill="none"
                strokeDasharray="282.6"
                strokeDashoffset={282.6 - (percent / 100) * 282.6}
              />
            </svg>
            <div className="absolute text-3xl font-bold">{value}</div>
            <p className="text-sm text-gray-300">{sub}</p>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 bg-black rounded-lg p-6 text-white shadow transform rotate-y-180 backface-hidden">
        <h2 className="text-lg font-bold mb-4">Chi tiết {title}</h2>
          <p className="mb-2">{detail}</p>
          <p className="text-sm text-gray-600">📅 Ngày ghi nhận: {date}</p>
          <p className="text-sm text-gray-600">🆔 Feed ID: {feedId}</p>
          <p className="text-sm text-gray-600">⏰ Thời gian: {time}</p>
          <p className="mt-4 text-sm text-gray-500">Nhấn để quay lại</p>
        </div>
      </div>
    </div>
  );
};

export default DevicesCard;
