import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../Layouts/Sections/Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  console.log(username);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login"); // Nếu không đăng nhập, chuyển hướng về trang login
    }
  }, [navigate]);
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full max-w-[1200px] px-[12px] mx-auto ">
        <div className="mt-6 flex gap-10 justify-around ">
          <div className=" relative flex flex-row items-center justify-center bg-slate-300  h-[250px] flex-1">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-[16px] text-gray-700">Số đơn hàng</h2>
              <p className="mt-3 text-[20px] text-gray-500">0</p>
            </div>
          </div>
          <div className=" relative flex flex-row items-center justify-center bg-slate-300  h-[250px] flex-1">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-[16px] text-gray-700">Số sản phẩm có</h2>
              <p className="mt-3 text-[20px] text-gray-500">0</p>
            </div>
          </div>
          <div className=" relative flex flex-row items-center justify-center bg-slate-300  h-[250px] flex-1">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-[16px] text-gray-700">Số tiền thu</h2>
              <p className="mt-3 text-[20px] text-gray-500">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
