import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RomForm() {
  const navigate = useNavigate(); // Import useNavigate
  const [rom_name, setRomName] = useState("");
  const handleNavigateBack = () => {
    navigate(-1); // Điều này sẽ chuyển hướng trở lại trang trước đó
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gửi yêu cầu POST để thêm mới ROM
      let response = await axios.post("http://localhost:3000/createRom", {
        rom_name: rom_name,
        // Các trường dữ liệu khác nếu cần
      });

      console.log("ROM đã được thêm mới:", response.data);
      // Đặt lại trạng thái và trường dữ liệu
      setRomName("");
      setTimeout(navigate(-1), 3000);
    } catch (error) {
      console.error("Có lỗi xảy ra khi thêm mới ROM:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-medium mb-8">Thêm mới ROM</h1>
      <form onSubmit={handleSubmit}>
        <button onClick={handleNavigateBack}>Back</button>
        <div className="mb-4">
          <label htmlFor="romName" className="block text-gray-700">
            Tên ROM:
          </label>
          <input
            type="text"
            id="romName"
            className="mb-4 p-2 border rounded w-full"
            value={rom_name}
            onChange={(e) => setRomName(e.target.value)}
            required
          />
        </div>
        {/* Các trường dữ liệu khác nếu cần */}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        >
          Thêm mới
        </button>
      </form>
    </div>
  );
}
