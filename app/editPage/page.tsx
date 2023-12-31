"use client"
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { User } from "@/utils/types/user";
import Navbar from "../components/navbar";

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    age: 0,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Fel vid hämtning av användare");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const userEmail = event.target.value;
    const selectedUser = users.find(user => user.email === userEmail);
    setSelectedUser(selectedUser || null);
    if (selectedUser) {
      setFormData(selectedUser);
    } else {
      setFormData({ name: "", email: "", age: 0 });
    }
  };




  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
  
    // Kontrollera om användaren försöker ändra e-postadressen
    if (name === 'email' && selectedUser && value !== selectedUser.email) {
      alert('E-post går inte att ändra, kontakta support.');
      return;
    }
  
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    });
  };
  





  

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedUser) {
      alert("Välj en användare att uppdatera.");
      return;
    }

    try {
      const response = await fetch(`/api`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setFormData({
        name: "",
        email: "",
        age: 0,
      });
      

      if (response.ok) {
        alert("Användaren uppdaterades framgångsrikt.");
      } else {
        console.error("Fel vid uppdatering av användaren");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };







const handleDelete = async () => {
  if (!selectedUser) {
    alert("Välj en användare att ta bort.");
    return;
  }

  try {
    const response = await fetch(`/api`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: selectedUser.email }),
    });

    if (response.ok) {
      alert("Användaren har tagits bort.");
      // Uppdatera användarlistan och nollställ formulärdata
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.email !== selectedUser.email)
      );
      setSelectedUser(null);
      setFormData({ name: "", email: "", age: 0 });
    } else {
      console.error("Fel vid borttagning av användaren");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

  return (

    <div>
   <Navbar />
    <div className="max-w-2xl mx-auto my-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Användarhantering</h2>


      {/* Dropdown för att välja användare för redigering */}
      <div className="mb-4">
        <label htmlFor="userSelect" className="block text-gray-700 text-sm font-bold mb-2">
          Välj Användare:
        </label>
        <select
          id="userSelect"
          value={selectedUser?.email || ''}
          onChange={handleUserChange}
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Välj en användare</option>
          {users.map(user => (
            <option key={user.email} value={user.email}>{user.name}</option>
          ))}
        </select>
      </div>

      {/* Formulär */}
      <form onSubmit={handleSubmit} className="bg-white rounded px-8 pt-6 pb-8">
        
        
        {/* Namnfält */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Namn:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Namn"
          value={formData.name}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

        {/* E-postfält */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            E-post:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="E-post"
            value={formData.email}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Åldersfält */}
        <div className="mb-4">
          <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">
            Ålder:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Ålder"
            value={formData.age}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Spara-knapp */}
        <div className="flex items-center justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Spara
          </button>

          
        </div>

        <div className="flex items-center justify-between mt-4">
        <button
         type="button"
         onClick={handleDelete}
         className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
         >
         DELETE
         </button>    
        </div>

        



      </form>
    </div>
    </div>
  );
}