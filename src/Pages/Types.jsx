import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { PATH_ADD_TYPES, PATH_EDIT_TYPES, PATH_HOME } from "../routes/path";
import axios from "axios";
export default function Types() {
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login"); // Nếu không đăng nhập, chuyển hướng về trang login
    }
  }, [navigate]);
  const [Types, SetTypes] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const handleDeleteClick = () => {
    setShowPopup(true);
  };
  const handleCancelDelete = () => {
    setShowPopup(false);
  };
  const handleConfirmDelete = async (type_name) => {
    try {
      // Send the delete request and wait for the response
      const response = await axios.delete("http://localhost:3000/DeleteType", {
        data: { type_name: type_name },
      });

      // Check if the delete operation was successful
      if (response.status === 200) {
        console.log("ROM deleted successfully");
        setShowPopup(false);
        const updatedRoms = Types.filter(
          (type) => type.type_name !== type_name
        );
        SetTypes(updatedRoms);
      } else {
        console.error("Failed to delete ROM:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while deleting ROM:", error);
    }
  };
  const handleEditClick = (TypeId) => {
    localStorage.setItem("TypeId", TypeId);
    navigate(PATH_EDIT_TYPES);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/Types", {
        // headers: {
        //   "Cache-Control": "no-cache",
        //   Pragma: "no-cache",
        //   Expires: "0",
        // },
      })
      .then((response) => {
        // console.log("test api", response.data);
        SetTypes(response.data);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("There was an error!", error);
      });
  }, []);

  // console.log("Types:", Types);

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
          Types
        </h1>
        <Link to={PATH_ADD_TYPES}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Thêm mới
          </button>
        </Link>
      </div>
      <main className="rounded-[6px] bg-[#ffffff] shadow-[0_1px_4px_rgba(10,10,10,.15)] block">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-[1px] border-[#fff4a0]">
            <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className=" text-center border-[1px] border-[#fff4a0] px-10  py-3"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className=" text-center border-[1px] border-[#fff4a0] px-12 py-3"
                >
                  Type name
                </th>
                <th
                  scope="col"
                  className=" text-center border-[1px] border-[#fff4a0] px-2 py-3"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Types ? (
                Types.map((Type, index) => (
                  <tr
                    key={index}
                    className=" text-center border-[1px] border-[#fff4a0] bg-white dark:bg-gray-800"
                  >
                    <td className=" text-center border-[1px] border-[#fff4a0] px-10 py-4">
                      {Type.TypeId}
                    </td>
                    <td className=" text-center border-[1px] border-[#fff4a0] px-12 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {Type.type_name}
                    </td>
                    <td className=" text-center border-[1px] border-[#fff4a0] px-2 py-4">
                      <button
                        onClick={() => {
                          handleEditClick(Type.TypeId);
                        }}
                        className="text-center font-medium text-blue-600 dark:text-blue-500 hover:underline mr-[40px]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={handleDeleteClick}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Delete
                      </button>

                      {showPopup && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                          <div className="bg-white p-5 rounded-lg shadow-lg">
                            <h2 className="text-lg font-semibold mb-4">Xóa</h2>
                            <p>Bạn muốn xóa {Type.type_name} này chứ ?</p>
                            <div className="mt-4">
                              <button
                                onClick={() => {
                                  handleConfirmDelete(Type.type_name);
                                }}
                                className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                Ok
                              </button>
                              <button
                                onClick={handleCancelDelete}
                                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                              >
                                Nô
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
