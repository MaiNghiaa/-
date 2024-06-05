import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ColorForm = () => {
  const [type_name, setTypeName] = useState("");
  const [colorCode, setColorCode] = useState("#000000"); // Default color code
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const handleColorChange = (e) => {
    setColorCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Type Name:", type_name);
    console.log("Color Code:", colorCode);
    try {
      // Fetch existing colors
      let existingColorsResponse = await axios.get(
        "http://localhost:3000/Colors"
      );
      let existingColors = existingColorsResponse.data;

      // Check if the color already exists
      let colorExists = existingColors.some(
        (color) => color.color === colorCode
      );
      if (colorExists) {
        setPopupMessage("Màu đã tồn tại!");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
        return;
      }

      // Gửi yêu cầu POST để thêm mới màu
      let response = await axios.post("http://localhost:3000/CreateColor", {
        color_name: type_name,
        color: colorCode,
      });

      console.log("Màu đã được thêm mới:", response.data);
      // Hiển thị popup
      setPopupMessage("Màu đã được thêm mới thành công!");
      setShowPopup(true);
      // Đặt lại trạng thái và trường dữ liệu
      setTimeout(() => {
        setShowPopup(false);
        navigate(-1);
      }, 3000);
    } catch (error) {
      console.error("Có lỗi xảy ra khi thêm mới màu:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-medium mb-8">Thêm mới</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="type_name" className="block text-gray-700">
            Tên Color:
          </label>
          <input
            type="text"
            id="type_name"
            className="mb-4 p-2 border rounded w-full"
            value={type_name}
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
          Thêm mới
        </button>
      </form>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>{popupMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorForm;
