"use client"
import React, { useState } from "react";
import Navbar from "../components/navbar";
require('dotenv').config();


export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

// Ladda in .env-filen för att hämta miljövariabler


const WEBHOOK_TOKEN = process.env.WEBHOOK_TOKEN;

const handleSubmit = async (event: { preventDefault: () => void }) => {
  event.preventDefault();

  // Skapa ett JSON-objekt med datan från formuläret
  const data = {
    content: `Nytt meddelande från: \n\n${formData.name} \n\n(${formData.email}):\n\n${formData.message}`,

  };

  try {
    // Använd fetch för att skicka datan till Discord Webhook
    await fetch("https://discord.com/api/webhooks/1190767111161774080/fGEjKHF9kI2txh8v9pfKgqDnF59J2-m8dAz2Q69hDNC3HXvkf8ZxaWae6_fthjwtQXa-"
    , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setFormData({
        name: "",
        email: "",
        message: "",
      });

    alert("Meddelandet har skickats till Discord!");
  } catch (error) {
    console.error("Error:", error);
    alert("Det uppstod ett fel vid skickandet av meddelandet.");
  }
};

  


  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <form className="max-w-md space-y-4 p-4 bg-white rounded shadow-lg" onSubmit={handleSubmit}>
          {/* Namnfält */}
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Namn:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              value={formData.name}
            />
          </div>

          {/* E-postfält */}
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              E-post:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              value={formData.email}
            />
          </div>

          {/* Meddelandefält */}
          <div>
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
              Meddelande:
            </label>
            <textarea
              id="message"
              name="message"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              value={formData.message}
            ></textarea>
          </div>

          {/* Skicka knapp */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Skicka
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
