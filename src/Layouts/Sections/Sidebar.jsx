import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { FaBars, FaTimes } from "react-icons/fa";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Toggle button */}
      <button
        onClick={handleToggleSidebar}
        className="absolute top-4 left-4 md:hidden text-2xl p-2"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div
        className={`bg-gray-200 w-64 min-h-screen p-4 fixed top-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 z-50`}
      >
        <button onClick={handleToggleSidebar} className=" text-2xl px-4 py-2">
          <FaTimes />
        </button>
        <ul>
          <li className="my-2">
            <Link
              onClick={handleToggleSidebar}
              to="/Products"
              className="block py-2 px-4 rounded hover:bg-gray-300 transition-colors"
            >
              Sản Phẩm
            </Link>
          </li>
          {/* <li className="my-2">
            <Link
              onClick={handleToggleSidebar}
              to="/Workshop"
              className="block py-2 px-4 rounded hover:bg-gray-300 transition-colors"
            >
              Chương trình Workshop
            </Link>
          </li> */}
          <li className="my-2">
            <Link
              onClick={handleToggleSidebar}
              to="/Roms"
              className="block py-2 px-4 rounded hover:bg-gray-300 transition-colors"
            >
              Loại ROM
            </Link>
          </li>
          <li className="my-2">
            <Link
              onClick={handleToggleSidebar}
              to="/Types"
              className="block py-2 px-4 rounded hover:bg-gray-300 transition-colors"
            >
              Loại Type
            </Link>
          </li>
          <li className="my-2">
            <Link
              onClick={handleToggleSidebar}
              to="/Workshopadmin"
              className="block py-2 px-4 rounded hover:bg-gray-300 transition-colors"
            >
              Workshops
            </Link>
          </li>

          <li className="my-2">
            <Link
              onClick={handleToggleSidebar}
              to="/Color"
              className="block py-2 px-4 rounded hover:bg-gray-300 transition-colors"
            >
              Màu sắc
            </Link>
          </li>
          <li className="my-2">
            <Link
              onClick={handleToggleSidebar}
              to="/Profile"
              className="block py-2 px-4 rounded hover:bg-gray-300 transition-colors"
            >
              Thông Tin Cá Nhân
            </Link>
          </li>
          {role && role === "admin" ? (
            <li className="my-2">
              <Link
                to="/register"
                className="block py-2 px-4 rounded hover:bg-gray-300 transition-colors"
              >
                Đăng kí
              </Link>
            </li>
          ) : (
            " "
          )}

          <li className="my-2">
            {/* <Link
              onClick={handleToggleSidebar}
              to="/Profile"
              className="block py-2 px-4 rounded hover:bg-gray-300 transition-colors"
            >
              Logout
            </Link> */}
            <div
              className="block py-2 px-4 rounded hover:bg-gray-300 transition-colors cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
