import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  //lay ra Type,dung luong , mau sac
  const [dataType, SetDataType] = useState("");
  const [dataRom, SetDataRom] = useState("");
  const [productName, setProductName] = useState("");
  const [type, setType] = useState([]);
  const [captionPrice, setCaptionPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [minRom, setMinRom] = useState("");
  const [colorDefault, setColorDefault] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1); // Điều này sẽ chuyển hướng trở lại trang trước đó
  };
  useEffect(() => {
    // Lấy danh sách loại từ server
    axios
      .get("http://localhost:3000/Types")
      .then((response) => {
        SetDataType(response.data);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi lấy danh sách loại:", error);
      });
  }, []);

  //   useEffect(() => {
  //     // Lấy danh sách loại từ server
  //     axios
  //       .get("http://localhost:3000/Roms")
  //       .then((response) => {
  //         SetDataRom(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Có lỗi xảy ra khi lấy danh sách loại:", error);
  //       });
  //   }, []);

  const handleSubmit = async (e) => {
    // Validation checks
    if (
      !productName ||
      !type ||
      !captionPrice ||
      !oldPrice ||
      !minRom ||
      !colorDefault ||
      !image
    ) {
      setMessage("Tất cả các trường bắt buộc phải được điền.");
      return;
    }

    e.preventDefault();
    const SliceType = type.split(",");
    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("TypeId", SliceType[0]);
    formData.append("type_name", SliceType[1]);
    formData.append("CaptionPrice", captionPrice);
    formData.append("OldPrice", oldPrice);
    formData.append("MinRom", minRom);
    formData.append("ColorDefault", colorDefault);
    formData.append("image", image);
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3000/createProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data);
    } catch (error) {
      setMessage("Có lỗi xảy ra khi thêm sản phẩm: " + error.response.data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md mb-4"
    >
      <button onClick={handleNavigateBack}>Back</button>

      <h2 className="text-2xl font-bold mb-4">Thêm Sản Phẩm</h2>
      {message && <p className="text-red-500">{message}</p>}
      <input
        type="text"
        placeholder="Tên Sản Phẩm"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
        required
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
        required
      >
        <option value="">Chọn loại sản phẩm</option>
        {dataType &&
          dataType.map((Type, index) => (
            <option key={index} value={[Type.TypeId, Type.type_name]}>
              {Type.name}
            </option>
          ))}
      </select>
      <input
        type="number"
        placeholder="Giá"
        value={captionPrice}
        onChange={(e) => setCaptionPrice(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
        required
      />
      <input
        type="number"
        placeholder="Giá Cũ"
        value={oldPrice}
        onChange={(e) => setOldPrice(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
        required
      />
      <input
        type="number"
        placeholder="Dung Lượng Tối Thiểu"
        value={minRom}
        onChange={(e) => setMinRom(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
        required
      />
      <input
        type="text"
        placeholder="Màu Sắc Mặc Định"
        value={colorDefault}
        onChange={(e) => setColorDefault(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
        required
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-4 p-2 border rounded w-full"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Thêm Sản Phẩm
      </button>
      {message && <p className="text-red-500 mt-4">{message}</p>}
    </form>
  );
};

export default ProductForm;
