// src/components/EditColorForm.js

import React, { useState } from "react";
import axios from "axios";

const EditColorForm = ({ editingColor, onSave, onCancel }) => {
  const [typeName, setTypeName] = useState(editingColor.color_name);
  const [colorCode, setColorCode] = useState(editingColor.color);

  const handleColorChange = (e) => {
    setColorCode(e.target.value);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:3000/EditColor", {
        ColorId: editingColor.ColorId,
        color_name: typeName,
        color: colorCode,
      });

      if (response.status === 200) {
        console.log("Color edited successfully");
        onSave();
      } else {
        console.error("Failed to edit Color:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while editing color:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl mb-4">Edit Color</h2>
        <form onSubmit={handleEditSubmit}>
          <div className="mb-4">
            <label htmlFor="type_name" className="block text-gray-700">
              Tên Color:
            </label>
            <input
              type="text"
              id="type_name"
              className="mb-4 p-2 border rounded w-full"
              value={typeName}
              onChange={(e) => setTypeName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="colorPicker" className="block text-gray-700">
              Mã màu:
            </label>
            <input
              type="color"
              id="colorPicker"
              className="mb-4 p-2 border rounded w-full"
              value={colorCode}
              onChange={handleColorChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="colorCode" className="block text-gray-700">
              Hoặc điền mã màu:
            </label>
            <input
              type="text"
              id="colorCode"
              className="mb-4 p-2 border rounded w-full"
              value={colorCode}
              onChange={handleColorChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="colorPreview" className="block text-gray-700">
              Xem trước màu:
            </label>
            <div
              id="colorPreview"
              className="p-4 border rounded w-full"
              style={{ backgroundColor: colorCode }}
            >
              {colorCode}
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Save
          </button>
          <button
            type="button"
            className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-700 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditColorForm;
