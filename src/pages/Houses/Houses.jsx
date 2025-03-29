import React from 'react';

const products = [
  {
    name: 'Smartphone X Pro',
    status: 'Active',
    price: '$999.00',
    totalSales: 150,
    createdAt: '6/23/2024',
    image: 'path/to/smartphone.jpg',
  },
  {
    name: 'Wireless Earbuds Ultra',
    status: 'Active',
    price: '$199.00',
    totalSales: 300,
    createdAt: '6/23/2024',
    image: 'path/to/earbuds.jpg',
  },
  {
    name: 'Smart Home Hub',
    status: 'Active',
    price: '$149.00',
    totalSales: 200,
    createdAt: '6/23/2024',
    image: 'path/to/homehub.jpg',
  },
  {
    name: '4K Ultra HD Smart TV',
    status: 'Active',
    price: '$799.00',
    totalSales: 50,
    createdAt: '6/23/2024',
    image: 'path/to/tv.jpg',
  },
  {
    name: 'Gaming Laptop Pro',
    status: 'Active',
    price: '$1299.00',
    totalSales: 75,
    createdAt: '6/23/2024',
    image: 'path/to/laptop.jpg',
  },
];

const Houses = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Total Sales
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Created at
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                      <img className="w-full h-full rounded-full" src={product.image} alt={product.name} />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">{product.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                    <span className="relative">{product.status}</span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{product.price}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{product.totalSales}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{product.createdAt}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Houses;