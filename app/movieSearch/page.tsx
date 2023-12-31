"use client"
import React, { useState } from 'react';
import Navbar from '../components/navbar';

const Page = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log('Searching for:', searchTerm);
    // lägga till logik för sökningen
  };

  return (
    <div className="min-h-screen bg-gray-100">
        <Navbar/>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Search Movies</h1>
          <p className="text-center text-black mb-6 ">function coming soon</p>
          <form onSubmit={handleSearchSubmit} className="max-w-lg mx-auto flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search for a movie..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">Search</button>
          </form>
        </div>
    </div>
  );
};

export default Page;