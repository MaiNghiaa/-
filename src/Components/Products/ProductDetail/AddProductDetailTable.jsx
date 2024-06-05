import axios from "axios";
import React, { useEffect, useState } from "react";

const AddProductDetailTable = ({ productId, onClose, onUpdate }) => {
  const [values, setValues] = useState({
    screen: "",
    camera_sau: "",
    camera_selfie: "",
    Ram: "",
    DungLuongPin: 0,
    TheSim: "",
    HĐH: "",
    XuatXu: "",
    CPU: "",
    Thoigianramat: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: name === "DungLuongPin" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("username", localStorage.getItem("username"));
    // Append other form data fields
    formDataToSend.append("screen", values.screen);
    formDataToSend.append("camera_sau", values.camera_sau);
    formDataToSend.append("camera_selfie", values.camera_selfie);
    formDataToSend.append("Ram", values.Ram);
    formDataToSend.append("DungLuongPin", values.DungLuongPin);
    formDataToSend.append("TheSim", values.TheSim);
    formDataToSend.append("HĐH", values.HĐH);
    formDataToSend.append("XuatXu", values.XuatXu);
    formDataToSend.append("CPU", values.CPU);
    formDataToSend.append("Thoigianramat", values.Thoigianramat);
    axios
      .post(`http://localhost:3000/product_detail/${productId}`, values)
      .then((response) => {
        console.log("Product detail updated successfully:", response.data);
        onUpdate();
        onClose();
      })
      .catch((error) => console.error("Error updating product detail:", error));
  };

  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 flex-wrap">
          <div className="mb-4 flex-1">
            <label htmlFor="screen" className="block text-sm font-bold mb-1">
              Screen
            </label>
            <input
              type="text"
              id="screen"
              name="screen"
              value={values.screen}
              onChange={handleChange}
              className="border-gray-300 border w-full px-3 py-2 rounded-md"
            />
          </div>
          <div>
            <div className="mb-4 flex-2">
              <label
                htmlFor="camera_sau"
                className="block text-sm font-bold mb-1"
              >
                Camera Sau
              </label>
              <input
                type="text"
                id="camera_sau"
                name="camera_sau"
                value={values.camera_sau}
                onChange={handleChange}
                className="border-gray-300 border w-full px-3 py-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="camera_selfie"
                className="block text-sm font-bold mb-1"
              >
                camera selfie
              </label>
              <input
                type="text"
                id="camera_selfie"
                name="camera_selfie"
                value={values.camera_selfie}
                onChange={handleChange}
                className="border-gray-300 border w-full px-3 py-2 rounded-md"
              />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label htmlFor="Ram" className="block text-sm font-bold mb-1">
                Ram
              </label>
              <input
                type="text"
                id="Ram"
                name="Ram"
                value={values.Ram}
                onChange={handleChange}
                className="border-gray-300 border w-full px-3 py-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="DungLuongPin"
                className="block text-sm font-bold mb-1"
              >
                Dung lượng pin
              </label>
              <input
                type="text"
                id="DungLuongPin"
                name="DungLuongPin"
                value={values.DungLuongPin}
                onChange={handleChange}
                className="border-gray-300 border w-full px-3 py-2 rounded-md"
              />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label htmlFor="TheSim" className="block text-sm font-bold mb-1">
                TheSim
              </label>
              <input
                type="text"
                id="TheSim"
                name="TheSim"
                value={values.TheSim}
                onChange={handleChange}
                className="border-gray-300 border w-full px-3 py-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="HĐH" className="block text-sm font-bold mb-1">
                Hệ điều hành
              </label>
              <input
                type="text"
                id="HĐH"
                name="HĐH"
                value={values.HĐH}
                onChange={handleChange}
                className="border-gray-300 border w-full px-3 py-2 rounded-md"
              />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label htmlFor="XuatXu" className="block text-sm font-bold mb-1">
                XuatXu
              </label>
              <input
                type="text"
                id="XuatXu"
                name="XuatXu"
                value={values.XuatXu}
                onChange={handleChange}
                className="border-gray-300 border w-full px-3 py-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="CPU" className="block text-sm font-bold mb-1">
                CPU
              </label>
              <input
                type="text"
                id="CPU"
                name="CPU"
                value={values.CPU}
                onChange={handleChange}
                className="border-gray-300 border w-full px-3 py-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Thoigianramat"
                className="block text-sm font-bold mb-1"
              >
                Thời gian ra mắt
              </label>
              <input
                type="text"
                id="Thoigianramat"
                name="Thoigianramat"
                value={values.Thoigianramat}
                onChange={handleChange}
                className="border-gray-300 border w-full px-3 py-2 rounded-md"
              />
            </div>
          </div>
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
  );
};

export default AddProductDetailTable;
