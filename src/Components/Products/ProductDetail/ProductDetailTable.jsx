import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import EditProductDetailTable from "./EditProductDetailTable";
import AddProductDetailTable from "./AddProductDetailTable";

const ProductDetailTable = ({ productId, onClose }) => {
  const [productDetail, setProductDetail] = useState(null);
  const [isOpenFormEdit, setIsOpenFormEdit] = useState(false);
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [onClickButtonAddnew, setonClickButtonAddnew] = useState(false);
  const [editingProductDetail, setEditingProductDetail] = useState(null);

  const fetchProductDetail = () => {
    axios
      .get(`http://localhost:3000/product_detail?productId=${productId}`)
      .then((response) => {
        setProductDetail(response.data);
      })
      .catch((error) => console.error("Error fetching product detail:", error));
  };

  useEffect(() => {
    fetchProductDetail();
  }, [productId]);

  const handleEdit = (detail) => {
    setEditingProductDetail(detail);
    setIsOpenFormEdit(true);
  };

  const handleUpdateProductDetail = () => {
    fetchProductDetail();
    setIsOpenFormEdit(false);
  };

  const handleAddNew = () => {
    setIsOpenAddForm(true);
    setonClickButtonAddnew(true);
  };
  const handleCloseAddNew = () => {
    setIsOpenAddForm(false);
    setonClickButtonAddnew(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-4 rounded shadow-lg">
        <button onClick={onClose} className="text-2xl px-4 py-2">
          <FaTimes />
        </button>
        <h2 className="text-center py-2">Product Detail</h2>
        <table className="w-full bg-white shadow-md rounded-md overflow-hidden">
          {productDetail === null || productDetail.length === 0 ? (
            <tr className="text-center">
              <td colSpan="11">
                {!onClickButtonAddnew ? (
                  <button
                    className="btn py-2 px-4 bg-blue-500 rounded text-white"
                    onClick={handleAddNew}
                  >
                    Thêm mới
                  </button>
                ) : null}
              </td>
            </tr>
          ) : !isOpenFormEdit ? (
            <>
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-4 border-b border-gray-300">Screen</th>
                  <th className="py-3 px-4 border-b border-gray-300">
                    Camera Sau
                  </th>
                  <th className="py-3 px-4 border-b border-gray-300">
                    Camera Selfie
                  </th>
                  <th className="py-3 px-4 border-b border-gray-300">RAM</th>
                  <th className="py-3 px-4 border-b border-gray-300">
                    Dung Lượng Pin
                  </th>
                  <th className="py-3 px-4 border-b border-gray-300">
                    Thẻ SIM
                  </th>
                  <th className="py-3 px-4 border-b border-gray-300">
                    Hệ Điều Hành
                  </th>
                  <th className="py-3 px-4 border-b border-gray-300">
                    Xuất Xứ
                  </th>
                  <th className="py-3 px-4 border-b border-gray-300">CPU</th>
                  <th className="py-3 px-4 border-b border-gray-300">
                    Thời Gian Ra Mắt
                  </th>
                  <th className="py-3 px-4 border-b border-gray-300">Action</th>
                </tr>
              </thead>

              <tbody>
                {productDetail &&
                  productDetail.map((detail, index) => {
                    return (
                      <tr className="text-center" key={index}>
                        <td className="py-3 px-4 border-b border-gray-300">
                          {detail.screen}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-300">
                          {detail.camera_sau}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-300">
                          {detail.camera_selfie}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-300">
                          {detail.Ram}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-300">
                          {detail.DungLuongPin}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-300">
                          {detail.TheSim}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-300">
                          {detail.HĐH}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-300">
                          {detail.XuatXu}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-300">
                          {detail.CPU}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-300">
                          {detail.Thoigianramat}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-300">
                          <button
                            className="btn py-2 px-4 bg-green-500 rounded text-white"
                            onClick={() => handleEdit(detail)}
                          >
                            Sửa
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </>
          ) : (
            <EditProductDetailTable
              productId={productId}
              initialDetailValue={editingProductDetail}
              onUpdate={handleUpdateProductDetail}
              onClose={() => setIsOpenFormEdit(false)}
            />
          )}

          {isOpenAddForm && (
            <AddProductDetailTable
              productId={productId}
              onUpdate={handleUpdateProductDetail}
              onClose={() => setIsOpenAddForm(false)}
            />
          )}
        </table>
      </div>
    </div>
  );
};

export default ProductDetailTable;
