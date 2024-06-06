import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

const HeadingPostUpdate = ({ heading, onClose, onSave }) => {
  const [headingName, setHeadingName] = useState(heading?.Heading_name || "");
  const [headingImage, setHeadingImage] = useState(null);

  useEffect(() => {
    setHeadingName(heading?.Heading_name || "");
    setHeadingImage(null);
  }, [heading]);

  const handleHeadingNameChange = (e) => {
    setHeadingName(e.target.value);
  };

  const handleHeadingImageChange = (e) => {
    setHeadingImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Heading_name", headingName);
    formData.append("Image_heading", headingImage);

    try {
      let response;
      if (heading) {
        response = await axios.put(
          `http://localhost:3000/headings/${heading.Id_Heading}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          `http://localhost:3000/headings`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error("Error saving heading:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-4 rounded shadow-lg">
        <button onClick={onClose} className="text-2xl px-4 py-2">
          <FaTimes />
        </button>
        <h2 className="text-center py-2">
          {heading ? "Edit Heading" : "Add Heading"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="headingName"
              className="block text-sm font-bold mb-1"
            >
              Heading Name
            </label>
            <input
              type="text"
              id="headingName"
              name="Heading_name"
              value={headingName}
              onChange={handleHeadingNameChange}
              className="border-gray-300 border w-full px-3 py-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="headingImage"
              className="block text-sm font-bold mb-1"
            >
              Heading Image
            </label>
            <input
              type="file"
              id="headingImage"
              name="Image_heading"
              onChange={handleHeadingImageChange}
              className="border-gray-300 border w-full px-3 py-2 rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeadingPostUpdate;
