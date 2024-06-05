import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "staff",
    phone: "",
    address: "",
    avatar: "null",
    name: "",
    university: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        formData
      );
      console.log("Server response:", response.data);
      // Hiển thị thông báo
      toast.success("Đăng ký thành công!", { autoClose: 3000 });
      // Quay lại trang dashboard sau 3 giây
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      // Handle error (if needed)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Form Đăng Ký</h2>
        <label className="block mb-2 text-gray-700">Tên đăng nhập</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <label className="block mb-2 text-gray-700">Mật khẩu</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <label className="block mb-2 text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <label className="block mb-2 text-gray-700">Vai trò</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        >
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>
        <label className="block mb-2 text-gray-700">Số điện thoại</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <label className="block mb-2 text-gray-700">Địa chỉ</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <label className="block mb-2 text-gray-700">Tên</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <label className="block mb-2 text-gray-700">Trường Đại học</label>
        <input
          type="text"
          name="university"
          value={formData.university}
          onChange={handleChange}
          className="w-full p-2 mb-6 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Đăng Ký
        </button>
      </form>
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Register;
