import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PATH_HOME } from "../routes/path";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Layouts/Sections/Navbar";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(formData.avatar);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [error, setError] = useState(null);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  useEffect(() => {
    axios
      .get(`http://localhost:3000/Profile/${localStorage.getItem("username")}`)
      .then((response) => {
        const fetchedData = response.data[0]; // Lấy đối tượng đầu tiên trong mảng
        setFormData(fetchedData);
        setAvatarPreview(fetchedData.avatar);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      avatar: file,
    });
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("username", localStorage.getItem("username"));
    formDataToSend.append("name", formData.name);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("university", formData.university);
    formDataToSend.append("avatar", formData.avatar);

    try {
      // Gửi thông tin cập nhật lên server
      const response = await axios.put(
        "http://localhost:3000/updateProfile",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        alert("Cập nhật thông tin thành công!");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin", error);
    }
  };
  // console.log(formData);

  //Thay ddổi mật khẩu

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }
    console.log(passwordData.currentPassword, passwordData.newPassword);
    try {
      const response = await axios.put("http://localhost:3000/changePassword", {
        username: localStorage.getItem("username"),
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      if (response.status === 200) {
        toast.success("Đổi mật khẩu thành công!");
        setPasswordData({});
        setShowPasswordModal(false);
      }
    } catch (error) {
      console.error("Lỗi khi đổi mật khẩu", error);
      setError("Lỗi khi đổi mật khẩu");
      toast.error("Lỗi khi đổi mật khẩu");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mx-auto p-4 container min-w-[1200px]">
        <ol className="breadcrumb py-[6px] px-0 flex list-none mb-[8px]">
          <li className="breadcrumb-item h-5 text-[#444b52] text-[14px] leading-5">
            <Link
              to={PATH_HOME}
              className="text-[#0664f9] relative inline-block"
            >
              Trang chủ
            </Link>
          </li>
        </ol>
        <div className="p-16">
          <div className="p-8 bg-white shadow mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="relative"></div>
              <div className="space-x-8 flex justify-between mt-16 md:mt-0 md:justify-center"></div>
            </div>
            <div className="mt-20 text-center border-b pb-12">
              {!isEditing ? (
                <>
                  <div className="mt-12 w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                    <img
                      className="rounded-full w-full h-full object-cover"
                      src={`http://localhost:3000/assets/${formData.avatar}`}
                      alt=""
                    />
                  </div>
                  <h1 className="text-4xl font-medium text-gray-700">
                    {formData.name}
                  </h1>
                  <div className="flex flex-col items-center justify-center ">
                    <p className="font-light text-gray-600 mt-3">Admin</p>
                    <p className="mt-8 text-gray-500">
                      Số điện thoại - {formData.phone}
                    </p>
                    <p className="mt-2 text-gray-500">
                      Email - {formData.email}
                    </p>
                    <p className="mt-2 text-gray-500">
                      Địa chỉ - {formData.address}
                    </p>
                    <p className="mt-2 text-gray-500">
                      University - {formData.university}
                    </p>
                    <button
                      className="mt-16 text-white py-2 px-4 rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                      onClick={() => setIsEditing(true)}
                    >
                      Sửa
                    </button>
                    <button
                      className="mt-4 text-white py-2 px-4 rounded bg-red-400 hover:bg-red-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                      onClick={() => setShowPasswordModal(true)}
                    >
                      Đổi mật khẩu
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Tên
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="phone"
                    >
                      Số điện thoại
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="phone"
                      name="phone"
                      type="text"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="address"
                    >
                      Địa chỉ
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="university"
                    >
                      University
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="university"
                      name="university"
                      type="text"
                      value={formData.university}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="avatar"
                    >
                      Ảnh đại diện
                    </label>
                    <img
                      className="rounded-full w-[150px] h-[150px]  object-cover"
                      src={avatarPreview}
                      alt=""
                    />
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="avatar"
                      name="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Lưu
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={() => setIsEditing(false)}
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              )}
              {showPasswordModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                  <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div
                      className="fixed inset-0 transition-opacity"
                      aria-hidden="true"
                    >
                      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span
                      className="hidden sm:inline-block sm:align-middle sm:h-screen"
                      aria-hidden="true"
                    >
                      &#8203;
                    </span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                              Đổi mật khẩu
                            </h3>
                            <div className="mt-2">
                              <form onSubmit={handlePasswordSubmit}>
                                <div className="mb-4">
                                  <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="currentPassword"
                                  >
                                    Mật khẩu hiện tại
                                  </label>
                                  <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="currentPassword"
                                    name="currentPassword"
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                  />
                                </div>
                                <div className="mb-4">
                                  <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="newPassword"
                                  >
                                    Mật khẩu mới
                                  </label>
                                  <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                  />
                                </div>
                                <div className="mb-4">
                                  <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="confirmPassword"
                                  >
                                    Xác nhận mật khẩu mới
                                  </label>
                                  <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                  />
                                </div>
                                <div className="flex items-center justify-between">
                                  <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                  >
                                    Lưu
                                  </button>
                                  <button
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={() => setShowPasswordModal(false)}
                                  >
                                    Hủy
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
