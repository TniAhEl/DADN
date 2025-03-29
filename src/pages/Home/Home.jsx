import React from 'react';
import Header from '../ManualComponents/Header';
import Footer from '../ManualComponents/Footer';
import Sidebar from '../ManualComponents/Sidebar';

const Home = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-1/6 min-h-screen bg-gray-800 text-white" />
      <div className="flex flex-col w-5/6">
        <Header className="w-full bg-blue-500 text-white p-4" />
        <main className="flex-grow container mx-auto py-8">
          <h1 className="text-3xl font-bold text-center">Welcome to Your Company</h1>
          <p className="mt-4 text-center">
            This is the main content of the home page. You can add more components and content here.
          </p>
        </main>
        <Footer className="w-full bg-gray-200 text-center p-4" />
      </div>
    </div>
  );
};

export default Home;