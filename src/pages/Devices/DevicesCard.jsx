import React from 'react';

const DevicesCard = ({ name, id, specs }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300 ease-in-out">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-sm text-gray-600">ID: {id}</p>
      <p className="text-sm text-gray-600 mt-1">Thông số: {specs}</p>
    </div>
  );
};

export default DevicesCard;
