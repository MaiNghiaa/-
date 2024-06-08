import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCash } from "../Utils/Utils";

import Sidebar from "../Layouts/Sections/Sidebar";
import Navbar from "../Layouts/Sections/Navbar";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [dataOrders, setdataOrders] = useState();
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);
  const [IsopenStatusForm, setIsopenStatusForm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [namestatus, setnamestatus] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  // Function to fetch products
  const fetchProducts = () => {
    axios
      .get("http://localhost:3000/Products")
      .then((response) => {
        const count = response.data.length;
        setProductCount(count);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  };

  // Function to fetch orders
  const fetchOrders = () => {
    axios
      .get("http://localhost:3000/orders")
      .then((response) => {
        let count = 0;
        if (response) {
          count = response.data.length;
        }
        setOrderCount(count);
        setdataOrders(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the orders!", error);
      });
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      fetchProducts();
      fetchOrders();
    }
  }, [navigate]);
  const handleDetailClick = (products) => {
    setSelectedOrderDetail(products);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsopenStatusForm(false);
  };
  const handleStatusClick = (order) => {
    setSelectedStatus(order);
    setIsopenStatusForm(true);
  };

  const handleStatusChange = () => {
    // console.log(selectedStatus);
    // Gửi request API để cập nhật trạng thái của đơn hàng
    axios
      .post("http://localhost:3000/update-order-status", {
        order: selectedStatus,
        status: namestatus,
      })
      .then((response) => {
        console.log("Update order status successfully:", response.data);
        // Cập nhật lại trạng thái của đơn hàng trong state dataOrders
        const updatedOrders = dataOrders.map((order) => {
          if (order.orderId === selectedOrderDetail.orderId) {
            return {
              ...order,
            };
          }
          return order;
        });
        setSelectedStatus(false);
        setdataOrders(updatedOrders);
        closeModal(); // Đóng modal sau khi cập nhật thành công
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };

  console.log(dataOrders);
  return (
    <div>
      {" "}
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="w-full max-w-[1200px] px-[12px] mx-auto ">
          <div className="mt-6 flex gap-10 justify-around ">
            <div className=" relative flex flex-row items-center justify-center bg-slate-300  h-[250px] flex-1">
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-[16px] text-gray-700">Số đơn hàng</h2>
                <p className="mt-3 text-[20px] text-gray-500">
                  {orderCount && orderCount}
                </p>
              </div>
            </div>
            <div className=" relative flex flex-row items-center justify-center bg-slate-300  h-[250px] flex-1">
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-[16px] text-gray-700">Số sản phẩm có</h2>
                <p className="mt-3 text-[20px] text-gray-500">
                  {productCount && productCount}
                </p>
              </div>
            </div>
            <div className=" relative flex flex-row items-center justify-center bg-slate-300  h-[250px] flex-1">
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-[16px] text-gray-700">Số tiền thu</h2>
                <p className="mt-3 text-[20px] text-gray-500">0</p>
              </div>
            </div>
          </div>
          <div className="mt-5 bg-blue-200 orders">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataOrders &&
                  dataOrders.map((order, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.customer_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.customer_email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.customer_phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatCash(order.total_price.toString()) + "đ"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleDetailClick(order.products)}
                        >
                          Chi tiết
                        </button>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-1"
                          onClick={() => handleStatusClick(order)}
                        >
                          Trạng thái
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {isModalOpen && (
              <div className="fixed inset-0 overflow-y-auto z-50 flex justify-center items-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl">
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">
                      Chi tiết đơn hàng
                    </h2>
                    <table className="table-auto border-collapse border border-gray-400">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border border-gray-400 px-4 py-2">
                            Hình ảnh
                          </th>
                          <th className="border border-gray-400 px-4 py-2">
                            Tên sản phẩm
                          </th>
                          <th className="border border-gray-400 px-4 py-2">
                            Số lượng
                          </th>
                          <th className="border border-gray-400 px-4 py-2">
                            Giá mỗi sản phẩm
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrderDetail &&
                          selectedOrderDetail.map((product, index) => (
                            <tr
                              key={index}
                              className={index % 2 === 0 ? "bg-gray-100" : ""}
                            >
                              <td className="border border-gray-400 px-4 py-2">
                                <img
                                  src={`http://localhost:3000/assets/${product.URL}`}
                                  alt=""
                                  className="w-[100px] h-[100px] object-cover"
                                />
                              </td>
                              <td className="border border-gray-400 px-4 py-2">
                                {product.product_name}
                              </td>
                              <td className="border border-gray-400 px-4 py-2">
                                {product.quantity}
                              </td>
                              <td className="border border-gray-400 px-4 py-2">
                                {product.price_per_item}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={closeModal}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {IsopenStatusForm && (
              <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4">
                  <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>

                  <div className="relative bg-white rounded-lg p-8">
                    <h2 className="text-lg font-semibold mb-4">
                      Chọn trạng thái
                    </h2>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => {
                        setnamestatus("Đang giao");
                        handleStatusChange();
                      }}
                    >
                      Đang giao
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => {
                        setnamestatus("Thành công");
                        handleStatusChange();
                      }}
                    >
                      Thành công
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={closeModal}
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
