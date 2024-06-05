import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TypeForm() {
  const navigate = useNavigate(); // Import useNavigate
  const [type_name, setTypeName] = useState("");
  const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gửi yêu cầu POST để thêm mới ROM
      let response = await axios.post("http://localhost:3000/createType", {
        type_name: type_name,
        name: name,
        // Các trường dữ liệu khác nếu cần
      });

      console.log("Type đã được thêm mới:", response.data);
      // Đặt lại trạng thái và trường dữ liệu
      setTypeName("");
      setName("");
      setTimeout(navigate(-1), 3000);
    } catch (error) {
      console.error("Có lỗi xảy ra khi thêm mới ROM:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-medium mb-8">Thêm mới Types</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="romName" className="block text-gray-700">
            Tên ROM:
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
          <label htmlFor="romName" className="block text-gray-700">
            Tên ROM:
          </label>
          <input
            type="text"
            id="rName"
            className="mb-4 p-2 border rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
