import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatCash } from "../Utils/Utils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PricingModal = ({ productId, onClose }) => {
  const [pricingData, setPricingData] = useState(null);
  const [Id, setId] = useState(productId);
  const [roms, setRoms] = useState([]);
  const [colors, setColors] = useState([]);

  const [showFormModal, setShowFormModal] = useState(false);
  const [newData, setNewData] = useState({
    Rom: 0,
    Color_name: 0,
    Quantity: 0,
    price: 0,
    OldPrice: 0,
  });

  // console.log(productId);

  useEffect(() => {
    setId(productId);
  }, [productId]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/ProductCount/`, { params: { productId: Id } })
      .then((response) => {
        setPricingData(response.data.DataPricing);
      })
      .catch((error) => {
        console.error("Error fetching pricing data:", error);
      });

    axios
      .get("http://localhost:3000/Roms")
      .then((response) => {
        setRoms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching ROMs:", error);
      });
    console.log(roms);

    axios
      .get("http://localhost:3000/Colors")
      .then((response) => {
        setColors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching colors:", error);
      });
  }, [Id]);

  const groupDataByROM = (data) => {
    const groupedData = {};
    if (data) {
      data.forEach((item) => {
        if (!groupedData[item.Rom]) {
          groupedData[item.Rom] = [];
        }
        if (item.DetailCR) {
          groupedData[item.Rom].push(...item.DetailCR);
        }
      });
    }
    return groupedData;
  };

  const groupedData = pricingData ? groupDataByROM(pricingData) : {};

  const handleAdd = () => {
    const dataToSend = { ...newData, productId };

    axios
      .post(`http://localhost:3000/addPricing`, dataToSend)
      .then((response) => {
        // Hiển thị toast thông báo thành công
        toast.success("Pricing added successfully");
        // Gọi lại API để lấy dữ liệu mới sau khi thêm
        axios
          .get(`http://localhost:3000/ProductCount/`, {
            params: { productId: Id },
          })
          .then((response) => {
            setPricingData(response.data.DataPricing);
          })
          .catch((error) => {
            console.error("Error fetching pricing data:", error);
          });
        // Đặt lại dữ liệu nhập liệu mới
        setNewData({
          Rom: 0,
          Color_name: 0,
          Quantity: 0,
          price: 0,
          OldPrice: 0,
        });
        // Đóng modal thêm mới
        setShowFormModal(false);
      })
      .catch((error) => {
        console.error("Error adding data:", error);
        // Hiển thị toast thông báo lỗi
        toast.error(`Failed ${error}`);
      });
  };

  // const handleEdit = (rom, colorIndex, color) => {
  //   console.log(rom, colorIndex, color);
  //   // const updatedData = { ...groupedData[rom][colorIndex], ...newData };
  //   // axios
  //   //   .put(`http://localhost:3000/editProduct`, updatedData)
  //   //   .then((response) => {
  //   //     const updatedPricingData = [...pricingData];
  //   //     updatedPricingData.forEach((item) => {
  //   //       if (item.Rom === rom) {
  //   //         item.DetailCR[colorIndex] = response.data;
  //   //       }
  //   //     });
  //   //     setPricingData(updatedPricingData);
  //   //     setNewData({
  //   //       Rom: 0,
  //   //       Color_name: 0,
  //   //       Quantity: 0,
  //   //       price: 0,
  //   //       OldPrice: 0,
  //   //     });
  //   //     setShowFormModal(false);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Error editing data:", error);
  //   //   });
  // };

  const handleDelete = (Color_name, rom) => {
    console.log(Color_name);
    console.log(rom); // Giá trị Rom

    axios
      .delete(`http://localhost:3000/deletePricingProduct`, {
        data: { Color_name, rom, productId },
      })
      .then(() => {
        // Xóa sản phẩm khỏi dữ liệu hiển thị
        const updatedPricingData = pricingData.filter(
          (item) => item.Rom !== rom || item.Color_name !== Color_name
        );
        setPricingData(updatedPricingData);
        toast.success("Pricing deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        toast.error(`Failed ${error}`);
      });
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto block">
      <div className="flex items-center justify-center min-h-screen">
        <ToastContainer />
        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="modal-content py-4 text-left px-6">
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl font-bold">Thông tin giá và số lượng</p>
              <button onClick={onClose} className="modal-close">
                <svg
                  className="fill-current text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path
                    d="M16.364 14.364c.293.293.293.768 0 1.06-.146.147-.338.22-.53.22-.192 0-.384-.073-.53-.22l-2.83-2.828-2.83 2.828c-.146.147-.338.22-.53.22-.192 0-.384-.073-.53-.22-.293-.293-.293-.768 0-1.06l2.828-2.83-2.828-2.83c-.293-.293-.293-.768 0-1.06.293-.293.768-.293 1.06 0l2.83 2.828 2.828-2.828c.293-.293.768-.293 1.06 0 .293.293.293.768 0 1.06l-2.828 2.83 2.828 2.828z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <button
              className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mt-4"
              onClick={() => {
                setShowFormModal(true);
                setNewData({
                  Rom: 0,
                  Color_name: 0,
                  Quantity: 0,
                  price: 0,
                  OldPrice: 0,
                });
              }}
            >
              Thêm sản phẩm mới
            </button>

            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">ROM</th>
                  <th className="px-4 py-2">Màu sắc</th>
                  <th className="px-4 py-2">Số lượng</th>
                  <th className="px-4 py-2">Giá</th>
                  <th className="px-4 py-2">Giá Cũ</th>
                  <th className="px-4 py-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(groupedData).map((rom, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{rom}</td>
                    <td className="px-4 py-2">
                      {groupedData[rom].map((detail, detailIndex) => (
                        <div className="py-2" key={detailIndex}>
                          {detail.Color_name}
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-2">
                      {groupedData[rom].map((detail, detailIndex) => (
                        <div className="py-2" key={detailIndex}>
                          {detail.Quantity}
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-2">
                      {groupedData[rom].map((detail, detailIndex) => (
                        <div className="py-2" key={detailIndex}>
                          {formatCash(detail.price.toString()) + "đ"}
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-2">
                      {groupedData[rom].map((detail, detailIndex) => (
                        <div className="py-2" key={detailIndex}>
                          {formatCash(detail.OldPrice.toString()) + "đ"}
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-2">
                      {groupedData[rom].map((detail, detailIndex) => (
                        <div className="py-2" key={detailIndex}>
                          {/* <button
                            className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={() => {
                              setShowFormModal(true);
                              setNewData(detail);
                            }}
                          >
                            Sửa
                          </button> */}
                          <button
                            className="ml-2 bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            onClick={() => handleDelete(detail.Color_name, rom)}
                          >
                            Xóa
                          </button>
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {showFormModal && (
              <div className="fixed z-20 inset-0 overflow-y-auto block">
                <div className="flex items-center justify-center min-h-screen">
                  <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                  <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                    <div className="modal-content py-4 text-left px-6">
                      <div className="flex justify-between items-center pb-3">
                        <p className="text-2xl font-bold">Thêm sản phẩm</p>
                        <button
                          onClick={() => setShowFormModal(false)}
                          className="modal-close"
                        >
                          <svg
                            className="fill-current text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                          >
                            <path
                              d="M16.364 14.364c.293.293.293.768 0 1.06-.146.147-.338.22-.53.22-.192 0-.384-.073-.53-.22l-2.83-2.828-2.83 2.828c-.146.147-.338.22-.53.22-.192 0-.384-.073-.53-.22-.293-.293-.293-.768 0-1.06l2.828-2.83-2.828-2.83c-.293-.293-.293-.768 0-1.06.293-.293.768-.293 1.06 0l2.83 2.828 2.828-2.828c.293-.293.768-.293 1.06 0 .293.293.293.768 0 1.06l-2.828 2.83 2.828 2.828z"
                              fillRule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      <div className="bg-sky-100 p-4 rounded-lg">
                        <p className="text-black"> dung luong ram</p>
                        <select
                          value={newData.Rom}
                          onChange={(e) =>
                            setNewData({ ...newData, Rom: e.target.value })
                          }
                        >
                          <option value="">Chọn ROM</option>
                          {roms.map((rom) => (
                            <option key={rom.RomId} value={rom.RomId}>
                              {rom.rom_name}
                            </option>
                          ))}
                        </select>
                        <p className="text-black"> Mau sac </p>

                        <select
                          value={newData.Color_name}
                          onChange={(e) =>
                            setNewData({
                              ...newData,
                              Color_name: e.target.value,
                            })
                          }
                        >
                          <option value="">Chọn Màu sắc</option>
                          {colors.map((color) => (
                            <option key={color.ColorId} value={color.ColorId}>
                              {color.color_name}
                            </option>
                          ))}
                        </select>
                        <p className="text-black"> so luowng</p>

                        <input
                          type="number"
                          placeholder="Số lượng"
                          value={newData.Quantity}
                          onChange={(e) =>
                            setNewData({
                              ...newData,
                              Quantity: parseInt(e.target.value),
                            })
                          }
                        />
                        <p className="text-black"> Gias</p>

                        <input
                          type="number"
                          placeholder="Giá"
                          value={newData.price}
                          onChange={(e) =>
                            setNewData({
                              ...newData,
                              price: parseInt(e.target.value),
                            })
                          }
                        />
                        <p className="text-black"> Gia cu</p>

                        <input
                          type="number"
                          placeholder="Giá cũ"
                          value={newData.OldPrice}
                          onChange={(e) =>
                            setNewData({
                              ...newData,
                              OldPrice: parseInt(e.target.value),
                            })
                          }
                        />
                        <button
                          onClick={handleAdd}
                          className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
                        >
                          Thêm
                        </button>
                        {/* <button
                          onClick={() =>
                            handleEdit(newData.Rom, newData.Color_name, newData)
                          }
                          className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mt-4 ml-2"
                        >
                          Lưu
                        </button> */}
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
  );
};

export default PricingModal;
