// const handleCopyColor = (event) => {
//   event.preventDefault();
//   const colorHex = event.target.parentNode.previousSibling.textContent.trim();
//   navigator.clipboard
//     .writeText(colorHex)
//     .then(() => {
//       setShowAlert(true);
//       // console.log("Mã màu đã được sao chép vào clipboard: ", colorHex);
//     })
//     .catch((error) => {
//       // console.error("Lỗi khi sao chép mã màu: ", error);
//     });
//   setTimeout(() => {
//     setShowAlert(false);
//   }, 3000);
// };
// src/components/Colors.js

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATH_ADD_COLOR, PATH_HOME } from "../routes/path";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import EditColorForm from "../Components/Color/EditColorForm";
export default function Colors() {
  const [showAlert, setShowAlert] = useState(false);
  const [colors, setColors] = useState([]);
  const [editingColor, setEditingColor] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login"); // Nếu không đăng nhập, chuyển hướng về trang login
    }
  }, [navigate]);
  const fetchColors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Colors");
      setColors(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const handleDeleteClick = async (ColorId) => {
    try {
      const response = await axios.delete("http://localhost:3000/DeleteColor", {
        data: { ColorId: ColorId },
      });

      if (response.status === 200) {
        console.log("Color deleted successfully");
        fetchColors(); // Fetch updated list after delete
      } else {
        console.error("Failed to delete Color:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while deleting color:", error);
    }
  };

  const handleEditClick = (color) => {
    setEditingColor(color);
  };

  const handleSave = () => {
    setEditingColor(null);
    fetchColors(); // Fetch updated list after edit
  };

  const handleCancel = () => {
    setEditingColor(null);
  };

  useEffect(() => {
    fetchColors();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <ol className="breadcrumb py-[6px] px-0 flex list-none mb-[8px]">
          <li className="breadcrumb-item h-5 text-[#444b52] text-[14px] leading-5">
            <Link
              to={PATH_HOME}
              className="text-[#0664f9] relative inline-block"
            >
              Trang chủ{" "}
            </Link>
          </li>
        </ol>
        <h1 className="h1 text-center text-4xl leading-9 font-medium mb-8">
          Colors
        </h1>
        <Link to={PATH_ADD_COLOR}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Thêm mới
          </button>
        </Link>
        {showAlert && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Copy mã màu thành công
          </Alert>
        )}
      </div>
      <main className="rounded-[6px] bg-[#ffffff] shadow-[0_1px_4px_rgba(10,10,10,.15)] block">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-[1px] border-[#fff4a0]">
            <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="text-center border-[1px] border-[#fff4a0] px-10 py-3"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="text-center border-[1px] border-[#fff4a0] px-12 py-3"
                >
                  Color
                </th>
                <th
                  scope="col"
                  className="text-center border-[1px] border-[#fff4a0] px-12 py-3"
                >
                  Color name
                </th>
                <th
                  scope="col"
                  className="text-center border-[1px] border-[#fff4a0] px-12 py-3"
                >
                  Color(Hex)
                </th>
                <th
                  scope="col"
                  className="text-center border-[1px] border-[#fff4a0] px-2 py-3"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {colors &&
                colors.map((color, index) => (
                  <tr
                    key={index}
                    className="text-center border-[1px] border-[#fff4a0] bg-white dark:bg-gray-800"
                  >
                    <td className="text-center border-[1px] border-[#fff4a0] px-10 py-4">
                      {color.ColorId}
                    </td>
                    <td className="flex justify-center items-center gap-4 text-center border-[1px] border-[#fff4a0] px-12 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div
                        style={{ backgroundColor: color.color }}
                        className="h-8 w-8 rounded-full"
                      ></div>
                    </td>
                    <td className="tracking-[2px] text-center border-[1px] border-[#fff4a0] px-12 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {color.color}
                    </td>
                    <td className="tracking-[2px] text-center border-[1px] border-[#fff4a0] px-12 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {color.color_name}
                    </td>
                    <td className="text-center border-[1px] border-[#fff4a0] px-2 py-4">
                      <button
                        onClick={() => handleEditClick(color)}
                        className="text-center font-medium text-blue-600 dark:text-blue-500 hover:underline mr-[40px]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(color.ColorId)}
                        className="text-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
      {editingColor && (
        <EditColorForm
          editingColor={editingColor}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
