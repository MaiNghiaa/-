// src/ProductList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { PATH_ADD_PRODUCTS, PATH_HOME } from "../routes/path";
import { Link, useNavigate } from "react-router-dom";
import { replaceSpecialCharacters, formatCash } from "../Utils/Utils";
import Navbar from "../Layouts/Sections/Navbar";
import HeadPostTable from "../Components/Products/Posts/HeadingPost/HeadPostTable"; // Import component mới
import ProductDetailTable from "../Components/Products/ProductDetail/ProductDetailTable";
import ProductEditForm from "../Components/Products/ProductEditForm";
import DescriptionPostTable from "../Components/Products/Posts/DescriptionPostTable/DescriptionPostTable";
import ImageList from "../Components/Products/ImageTable/ImageList";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showHeadPostTable, setShowHeadPostTable] = useState(false); // State để điều khiển hiển thị bảng
  const [showDescPostTable, setShowDescPostTable] = useState(false); // State để điều khiển hiển thị bảng
  const [selectedProductId, setSelectedProductId] = useState(null); // State để lưu productId
  const [selectedProductImages, setselectedProductImages] = useState(false);
  const [ShowProductDetailTable, setShowProductDetailTable] = useState(false); // State để điều khiển hiển thị bảng chi tieest
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectimagebyId, setselectimagebyId] = useState();
  const [DataProductbyId, setDataProductbyId] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login"); // Nếu không đăng nhập, chuyển hướng về trang login
    }
  }, [navigate]);
  //
  const fetchProducts = () => {
    axios
      .get("http://localhost:3000/Products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  };

  // Hàm xử lý khi cập nhật sản phẩm thành công
  const handleProductUpdateSuccess = () => {
    // Gọi API để lấy danh sách sản phẩm mới
    fetchProducts();
    // Đóng form chỉnh sửa sản phẩm
    setShowEditForm(false);
  };
  const handleEdit = (productId) => {
    console.log(`Edit product with ID: ${productId}`);
    axios
      .get(`http://localhost:3000/Products/${productId}`)
      .then((response) => {
        setDataProductbyId(response.data[0]);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });

    setShowEditForm(true);
  };

  const morePictures = (productId) => {
    setselectimagebyId(productId);
    setselectedProductImages(true);
  };

  const handleDelete = (productId) => {
    console.log(`Delete product with ID: ${productId}`);
  };

  const handleShowHeadPostTable = (productId) => {
    setSelectedProductId(productId);
    setShowHeadPostTable(true);
  };
  const handleShowDescPostTable = (productId) => {
    setSelectedProductId(productId);
    setShowDescPostTable(true);
  };

  const handleCloseTable = () => {
    setShowHeadPostTable(false);
    setShowProductDetailTable(false);
    setShowDescPostTable(false);
  };

  const handleShowProductDetailTable = (productId) => {
    setSelectedProductId(productId);
    setShowProductDetailTable(true);
  };
  const handleCloseEditForm = () => {
    setShowEditForm(false);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <Navbar />
      <div className=" mx-auto p-4 min-w-[1200px]">
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
          <h1 className="text-2xl font-bold mb-4">Products</h1>
          <Link to={PATH_ADD_PRODUCTS}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
              Thêm mới
            </button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-md overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 border-b border-gray-300">Image</th>
                <th className="py-3 px-4 border-b border-gray-300">
                  Product Name
                </th>
                <th className="py-3 px-4 border-b border-gray-300">Type</th>
                <th className="py-3 px-4 border-b border-gray-300">Giá mới</th>
                <th className="py-3 px-4 border-b border-gray-300">Giá cũ</th>
                <th className="py-3 px-4 border-b border-gray-300">Colors</th>
                <th className="py-3 px-4 border-b border-gray-300">
                  Default Colors
                </th>
                <th className="py-3 px-4 border-b border-gray-300">Min ROM</th>
                <th className="py-3 pl-8 px-[70px] border-b border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="py-3 px-4 border-b border-gray-300 text-center">
                    <img
                      src={`http://localhost:3000/assets/${product.image_caption_URL}`}
                      alt={product.product_name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <button
                      className="btn py-[2px] px-[3px] bg-sky-100 mt-2"
                      onClick={() => {
                        morePictures(product.ProductID);
                      }}
                    >
                      more..
                    </button>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    {product.product_name}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    {replaceSpecialCharacters(product.type_name)}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    {formatCash(product.MaxCaptionPrice)}vnđ
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    {formatCash(product.OldPrice) === 0
                      ? formatCash(product.MaxCaptionPrice)
                      : formatCash(product.OldPrice)}
                    vnđ
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    <div className="product-color flex gap-3 mb-4 justify-center">
                      {product.colors &&
                        [...new Set(product.colors.split(","))].map(
                          (color, index) => (
                            <span
                              style={{ backgroundColor: `${color}` }}
                              key={index}
                              className="rounded-full shadow w-4 h-4"
                            ></span>
                          )
                        )}
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    <div className="product-color flex gap-3 mb-4 justify-center">
                      {product.ColorDefault}
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    {product.MinRom === null || product.MinRom === 0
                      ? "Khoong co"
                      : product.MinRom}
                  </td>
                  <td className="py-3 pl-8 px-[70px] border-b border-gray-300 space-x-2">
                    <div className="flex flex-col gap-4 w-full">
                      <div className="flex justify-around gap-4 w-full">
                        <button
                          className="select-none rounded-lg bg-green-500 py-1 px-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg"
                          type="button"
                          onClick={() =>
                            handleShowProductDetailTable(product.ProductID)
                          }
                        >
                          Info
                        </button>
                        <button
                          onClick={() => handleEdit(product.ProductID)}
                          className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.ProductID)}
                          className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          Delete
                        </button>
                      </div>
                      <div className="flex justify-around gap-4 w-full mt-2">
                        <button
                          onClick={() =>
                            handleShowHeadPostTable(product.ProductID)
                          }
                          className="select-none rounded-lg bg-green-500 py-1 px-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg"
                          type="button"
                        >
                          head post
                        </button>
                        <button
                          className="select-none rounded-lg bg-green-500 py-1 px-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg"
                          type="button"
                          onClick={() =>
                            handleShowDescPostTable(product.ProductID)
                          }
                        >
                          desc post
                        </button>
                        <button
                          className="select-none rounded-lg bg-green-500 py-1 px-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg"
                          type="button"
                          onClick={() =>
                            handleShowDescPostTable(product.ProductID)
                          }
                        >
                          Số lượng
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showHeadPostTable && (
        <HeadPostTable
          productId={selectedProductId}
          onClose={handleCloseTable}
        />
      )}
      {showDescPostTable && (
        <DescriptionPostTable
          productId={selectedProductId}
          onClose={handleCloseTable}
        />
      )}
      {ShowProductDetailTable && (
        <ProductDetailTable
          productId={selectedProductId}
          onClose={handleCloseTable}
        />
      )}
      {showEditForm && (
        <ProductEditForm
          handleProductUpdateSuccess={handleProductUpdateSuccess}
          ProductById={DataProductbyId}
          onClose={handleCloseEditForm}
        />
      )}
      {selectedProductImages && (
        <ImageList
          productId={selectimagebyId}
          onClose={() => setselectedProductImages(false)}
        />
      )}
    </div>
  );
};

export default Products;
