import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { formatCash } from "../Utils/Utils";

import Sidebar from "../Layouts/Sections/Sidebar";
import Navbar from "../Layouts/Sections/Navbar";
import axios from "axios";
import emaijs from "@emailjs/browser";
const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [dataOrders, setdataOrders] = useState([]);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);
  const [isOpenStatusForm, setIsOpenStatusForm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [EmailCustomer, setEmailcustomer] = useState();
  const [nameStatus, setNameStatus] = useState("Xử lý");
  const [totalPrice, settotalPrice] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formRef = useRef(null);

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

  const form = document.createElement("form");
  form.style.display = "none";
  document.body.appendChild(form);

  const fetchOrders = () => {
    axios
      .get("http://localhost:3000/orders")
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          const orders = response.data;
          const count = orders.length;

          const totalPrice = orders
            .reduce((total, order) => {
              if (order.status === "Thành công") {
                return total + parseFloat(order.total_price);
              } else {
                return total;
              }
            }, 0)
            .toString();

          settotalPrice(totalPrice);
          setOrderCount(count);
          setdataOrders(orders);

          console.log("Total price of successful orders:", totalPrice);
        }
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

  const handleDetailClick = (order) => {
    setSelectedOrderDetail(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsOpenStatusForm(false);
  };

  const handleStatusClick = (order, email_customer) => {
    setSelectedOrderDetail(order);
    setSelectedStatus(order);
    setIsOpenStatusForm(true);
  };
  console.log(selectedOrderDetail);

  const handleStatusChange = (noti) => {
    console.log(noti);
    axios
      .post("http://localhost:3000/update-order-status", {
        order: selectedStatus,
        status: noti,
      })
      .then((response) => {
        console.log("Update order status successfully:", response.data);
        const updatedOrders = dataOrders.map((order) => {
          if (order.order_id === selectedOrderDetail.order_id) {
            return {
              ...order,
            };
          }
          return order;
        });
        setdataOrders(updatedOrders);
        setIsOpenStatusForm(false);

        // const formData = new FormData(form);
        // console.log(EmailCustomer, noti);
        // formData.append("emailfrom", EmailCustomer);
        // formData.append("status", noti);
        // console.log(formData);
        // emaijs.sendForm(
        //   "service_htasj2f",
        //   "template_qc34e4s",
        //   formData,
        //   "RJYgH5x8Gi6zb8-vN"
        // );
        closeModal();
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
        // const formData = new FormData(form);
        // formData.append("emailfrom", EmailCustomer);
        // formData.append("status", noti);
        // console.log(formData);
        // emaijs.sendForm(
        //   "service_htasj2f",
        //   "template_qc34e4s",
        //   formData,
        //   "RJYgH5x8Gi6zb8-vN"
        // );
      });
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="w-full max-w-[1200px] px-4 mx-auto">
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative flex items-center justify-center bg-blue-500 text-white h-[150px] sm:h-[200px] lg:h-[250px] rounded-lg shadow-md">
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-[16px]">Số đơn hàng</h2>
                <p className="mt-3 text-[20px]">{orderCount}</p>
              </div>
            </div>
            <div className="relative flex items-center justify-center bg-green-500 text-white h-[150px] sm:h-[200px] lg:h-[250px] rounded-lg shadow-md">
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-[16px]">Số sản phẩm có</h2>
                <p className="mt-3 text-[20px]">{productCount}</p>
              </div>
            </div>
            <div className="relative flex items-center justify-center bg-purple-500 text-white h-[150px] sm:h-[200px] lg:h-[250px] rounded-lg shadow-md">
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-[16px]">Số tiền thu</h2>
                <p className="mt-3 text-[20px]">
                  {formatCash(totalPrice) + "đ"}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 bg-white p-4 rounded-lg shadow-md">
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
                      <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleDetailClick(order)}
                        >
                          Chi tiết
                        </button>
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() =>
                            handleStatusClick(order, order.customer_email)
                          }
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
                <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl w-full">
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">
                      Chi tiết đơn hàng
                    </h2>
                    <table className="table-auto border-collapse border border-gray-400 w-full">
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
                          selectedOrderDetail.products.map((product, index) => (
                            <tr
                              key={index}
                              className={
                                index % 2 === 0
                                  ? "bg-gray-100 text-center"
                                  : "text-center"
                              }
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
                                {formatCash(product.price_per_item.toString()) +
                                  "d"}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <div className="mt-4 flex justify-end">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={closeModal}
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isOpenStatusForm && (
              <div className="fixed inset-0 overflow-y-auto z-50 flex justify-center items-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full p-6">
                  <h2 className="text-xl font-bold mb-4">
                    Cập nhật trạng thái
                  </h2>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Trạng thái
                    </label>
                    <select
                      value={nameStatus}
                      onChange={(e) => setNameStatus(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option
                        value="Xử lý"
                        className={
                          selectedOrderDetail &&
                          selectedOrderDetail.status === "Xử lý"
                            ? "visible hidden"
                            : ""
                        }
                      >
                        Đang xử lý
                      </option>
                      <option
                        value="Xác nhận"
                        className={
                          selectedOrderDetail &&
                          selectedOrderDetail.status === "Xác nhận"
                            ? "visible hidden"
                            : ""
                        }
                      >
                        Xác nhận
                      </option>
                      <option
                        value="Đang giao hàng"
                        className={
                          selectedOrderDetail &&
                          selectedOrderDetail.status === "Đang giao hàng"
                            ? "visible hidden"
                            : ""
                        }
                      >
                        Đang giao hàng
                      </option>
                      <option
                        value="Thành công"
                        className={
                          selectedOrderDetail &&
                          selectedOrderDetail.status === "Thành công"
                            ? "visible hidden"
                            : ""
                        }
                      >
                        Thành công
                      </option>
                      <option
                        value="Đã hủy"
                        className={
                          selectedOrderDetail &&
                          selectedOrderDetail.status === "Đã hủy"
                            ? "visible hidden"
                            : ""
                        }
                      >
                        Đã hủy
                      </option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                      onClick={closeModal}
                    >
                      Hủy
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleStatusChange(nameStatus)}
                    >
                      Cập nhật
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
