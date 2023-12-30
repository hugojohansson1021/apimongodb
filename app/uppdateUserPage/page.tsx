"use client"
// use client
import { User } from "@/utils/types/user";
import React, { ChangeEvent, FormEvent, useState } from "react";

export default function UpdateUserPage() {
  const [userIdToSearch, setUserIdToSearch] = useState<string>("");
  const [updatedData, setUpdatedData] = useState<User>({ name: "", email: "", age: 0 });

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserIdToSearch(event.target.value);
  };

  const handleUpdateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdatedData({
      ...updatedData,
      [event.target.name]: event.target.type === "number" ? parseFloat(event.target.value) : event.target.value,
    });
  };

  const handleSearch = async () => {
    if (!userIdToSearch) {
      console.error("Inget användar-ID angivet");
      return;
    }
  
    try {
      const response = await fetch(`/api?id=${encodeURIComponent(userIdToSearch)}`, {
        method: 'GET'
      });
  
      if (response.ok) {
        const userData = await response.json();
        setUpdatedData(userData); // Uppdatera state med användardata
        console.log("Hittad användare:", userData);
      } else {
        console.error("Användaren hittades inte");
      }
    } catch (error) {
      console.error("Fel vid sökning:", error);
    }
  };

  const handleUpdate = async (event: FormEvent) => {
    event.preventDefault();
    if (!userIdToSearch) {
      console.error("Inget användar-ID angivet för uppdatering");
      return;
    }
  
    try {
      const response = await fetch(`/api/user?id=${encodeURIComponent(userIdToSearch)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        console.log("Användaruppgifter uppdaterades framgångsrikt");
      } else {
        console.error("Fel vid uppdatering av användaruppgifter");
      }
    } catch (error) {
      console.error("Fel vid uppdatering:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-8 bg-white shadow-lg rounded">
      <div className="mb-6">
        <input
          type="text"
          value={userIdToSearch}
          onChange={handleSearchChange}
          placeholder="Användarens ID"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button onClick={handleSearch} className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Sök</button>
      </div>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label htmlFor="name" className="text-sm font-semibold">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={updatedData.name}
            onChange={handleUpdateChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={updatedData.email}
            onChange={handleUpdateChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="age" className="text-sm font-semibold">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={updatedData.age}
            onChange={handleUpdateChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Save Changes</button>
      </form>
    </div>
  );
}
