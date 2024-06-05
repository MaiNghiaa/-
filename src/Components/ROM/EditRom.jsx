// src/components/EditRom.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditRom() {
  const navigate = useNavigate();
  const [rom, setRom] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/Roms/${localStorage.getItem("RomId")}`
        );
        setData(response.data);
        setRom(response.data.rom_name); // Set initial value for the rom_name input
      } catch (error) {
        console.error("An error occurred while fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("http://localhost:3000/EditRom", {
        RomId: localStorage.getItem("RomId"),
        rom_name: rom,
      });

      console.log("ROM updated successfully:", response.data);
      localStorage.removeItem("RomId");
      setTimeout(() => navigate(-1), 3000);
    } catch (error) {
      console.error("An error occurred while updating ROM:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-4 rounded shadow-lg">
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-medium mb-8">Sửa Rom</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="romName" className="block text-gray-700">
                Loại Rom:
              </label>
              <input
                type="text"
                id="romName"
                className="mb-4 p-2 border rounded w-full"
                value={rom}
                onChange={(e) => setRom(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
              Xác nhận
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
