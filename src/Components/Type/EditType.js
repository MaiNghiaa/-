import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function EditType() {
  const navigate = useNavigate(); // Import useNavigate

  const [type_name, setTypeName] = useState("");
  const [name, setName] = useState("");
  // eslint-disable-next-line no-restricted-globals
  const location = useLocation();
  const { value: Type } = location.state || {};

  console.log(localStorage.getItem("TypeId"));
  console.log(Type);
  const [typeId, setTypeId] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/Types/${localStorage.getItem("TypeId")}`
        );
        setData(response.data);
      } catch (error) {
        console.log("cos loi xay ra");
      }
    };

    fetchData();
  }, []);
  console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gửi yêu cầu POST để thêm mới ROM
      let response = await axios.put("http://localhost:3000/EditType", {
        TypeId: localStorage.getItem("TypeId"),
        type_name: type_name,
        name: name,
        // Các trường dữ liệu khác nếu cần
      });

      console.log("Type đã được Sua:", response.data);
      // Đặt lại trạng thái và trường dữ liệu
      localStorage.removeItem("TypeId");

      setTimeout(navigate(-1), 3000);
    } catch (error) {
      console.error("Có lỗi xảy ra khi thêm mới ROM:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-medium mb-8">Sửa Types</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="romName" className="block text-gray-700">
            Loai Type:
          </label>
          <input
            type="text"
            id="type_name"
            className="mb-4 p-2 border rounded w-full"
            value={data ? data.name : " "}
            onChange={(e) => setTypeName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="romName" className="block text-gray-700">
            Type:
          </label>
          <input
            type="text"
            id="rName"
            value={data ? data.name : " "}
            className="mb-4 p-2 border rounded w-full"
            onChange={(e) => setName(e.target.value)}
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
  );
}
