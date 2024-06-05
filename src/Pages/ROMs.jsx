// src/components/ROMs.js

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATH_ADD_ROMS, PATH_EDIT_ROMS, PATH_HOME } from "../routes/path";
import axios from "axios";

export default function ROMs() {
  const [Roms, setRoms] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [romToDelete, setRomToDelete] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login"); // Nếu không đăng nhập, chuyển hướng về trang login
    }
  }, [navigate]);
  const handleDeleteClick = (rom_name) => {
    setRomToDelete(rom_name);
    setShowPopup(true);
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
    setRomToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!romToDelete) return;

    try {
      const response = await axios.delete("http://localhost:3000/DeleteRom", {
        data: { rom_name: romToDelete },
      });

      if (response.status === 200) {
        console.log("ROM deleted successfully");
        setRoms((prevRoms) =>
          prevRoms.filter((rom) => rom.rom_name !== romToDelete)
        );
        setShowPopup(false);
        setRomToDelete(null);
      } else {
        console.error("Failed to delete ROM:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while deleting ROM:", error);
    }
  };

  const handleEditClick = (RomId) => {
    localStorage.setItem("RomId", RomId);
    navigate(PATH_EDIT_ROMS);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/Roms")
      .then((response) => {
        setRoms(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
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
              Trang chủ
            </Link>
          </li>
        </ol>
        <h1 className="h1 text-center text-4xl leading-9 font-medium mb-8">
          Roms
        </h1>
        <Link to={PATH_ADD_ROMS}>
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
                  className="text-center border-[1px] border-[#fff4a0] px-10 py-3"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="text-center border-[1px] border-[#fff4a0] px-12 py-3"
                >
                  Capacity
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
              {Roms &&
                Roms.map((Rom, index) => (
                  <tr
                    key={index}
                    className="text-center border-[1px] border-[#fff4a0] bg-white dark:bg-gray-800"
                  >
                    <td className="text-center border-[1px] border-[#fff4a0] px-10 py-4">
                      {Rom.RomId}
                    </td>
                    <td className="text-center border-[1px] border-[#fff4a0] px-12 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {Rom.rom_name}
                    </td>
                    <td className="text-center border-[1px] border-[#fff4a0] px-2 py-4">
                      <button
                        onClick={() => handleEditClick(Rom.RomId)}
                        className="text-center font-medium text-blue-600 dark:text-blue-500 hover:underline mr-[40px]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(Rom.rom_name)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
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
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Xóa</h2>
            <p>Bạn muốn xóa ROM này chứ?</p>
            <div className="mt-4">
              <button
                onClick={handleConfirmDelete}
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
    </div>
  );
}
