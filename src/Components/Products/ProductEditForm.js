// src/Components/Products/ProductEditForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductEditForm = ({
  handleProductUpdateSuccess,
  ProductById,
  onClose,
}) => {
  const [Types, settypes] = useState();
  const [Roms, setRoms] = useState();
  const [Colors, setColors] = useState();
  const [product, setProduct] = useState({
    product_name: "",
    TypeID: "",
    image_caption_URL: "",
    CaptionPrice: "",
    OldPrice: "",
    DetailTypeProduct: "",
    MinRom: "",
    ColorDefault: "",
  });

  useEffect(() => {
    if (ProductById) {
      setProduct({
        product_name: ProductById.product_name,
        TypeID: ProductById.TypeID,
        image_caption_URL: ProductById.image_caption_URL,
        CaptionPrice: ProductById.CaptionPrice,
        OldPrice: ProductById.OldPrice,
        DetailTypeProduct: ProductById.DetailTypeProduct,
        MinRom: ProductById.MinRom,
        ColorDefault: ProductById.ColorDefault,
      });
    }
  }, [ProductById]);
  console.log(ProductById);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setProduct({
  //     ...product,
  //     image_caption_URL: file,
  //   });
  // };
  useEffect(() => {
    axios
      .get("http://localhost:3000/Roms")
      .then((response) => {
        console.log(response.data);
        setRoms(response.data);
      })
      .catch((error) => console.error("Error get Roms:", error));

    axios
      .get("http://localhost:3000/Colors")
      .then((response) => {
        console.log(response.data);
        setColors(response.data);
      })
      .catch((error) => console.error("Error get Roms:", error));

    axios
      .get("http://localhost:3000/Types")
      .then((response) => {
        console.log(response.data);
        settypes(response.data);
      })
      .catch((error) => console.error("Error get Roms:", error));
  }, []);

  // console.log(Colors);
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/Products/${ProductById.ProductID}`, product)
      .then((response) => {
        console.log("Product updated successfully:", response.data);
        handleProductUpdateSuccess();
        onClose();
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-lg">
        <button onClick={onClose} className="text-2xl px-4 py-2">
          &times;
        </button>
        <h2 className="text-center py-2">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="product_name"
              className="block text-sm font-bold mb-1"
            >
              Product Name
            </label>
            <input
              type="text"
              id="product_name"
              name="product_name"
              value={product.product_name}
              onChange={handleChange}
              className="border-gray-300 border w-full px-3 py-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="TypeID" className="block text-sm font-bold mb-1">
              TypeID
            </label>
            <input
              type="text"
              id="TypeID"
              name="TypeID"
              value={product.TypeID}
              onChange={handleChange}
              className="border-gray-300 border w-full px-3 py-2 rounded-md"
            />
          </div>
          {/* <div className="mb-4">
            <label
              htmlFor="image_caption_URL"
              className="block text-sm font-bold mb-1"
            >
              Image URL
            </label>
            <input
              type="file"
              id="image_caption_URL"
              name="image_caption_URL"
              accept="image/*"
              onChange={handleFileChange}
              className="border-gray-300 border w-full px-3 py-2 rounded-md"
            />
          </div> */}
          <div className="mb-4">
            <label
              htmlFor="CaptionPrice"
              className="block text-sm font-bold mb-1"
            >
              Caption Price
            </label>
            <input
              type="text"
              id="CaptionPrice"
              name="CaptionPrice"
              value={product.CaptionPrice}
              onChange={handleChange}
              className="border-gray-300 border w-full px-3 py-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="OldPrice" className="block text-sm font-bold mb-1">
              Old Price
            </label>
            <input
              type="text"
              id="OldPrice"
              name="OldPrice"
              value={product.OldPrice}
              onChange={handleChange}
              className="border-gray-300 border w-full px-3 py-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="DetailTypeProduct"
              className="block text-sm font-bold mb-1"
            >
              Detail Type Product
            </label>
            <input
              type="text"
              id="DetailTypeProduct"
              name="DetailTypeProduct"
              value={product.DetailTypeProduct}
              onChange={handleChange}
              className="border-gray-300 border w-full px-3 py-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="MinRom" className="block text-sm font-bold mb-1">
              Min ROM
            </label>
            <select
              id="MinRom"
              name="MinRom"
              value={product.MinRom}
              onChange={handleChange}
              className="border-gray-300 border w-full px-3 py-2 rounded-md"
            >
              {Roms &&
                Roms.map((rom) => (
                  <option
                    key={rom.RomId}
                    value={rom.rom_name}
                    selected={rom.rom_name === ProductById.MinRom}
                  >
                    {rom.rom_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="ColorDefault"
              className="block text-sm font-bold mb-1"
            >
              Color Default
            </label>
            <select
              id="ColorDefault"
              name="ColorDefault"
              value={product.ColorDefault}
              onChange={handleChange}
              className="border-gray-300 border w-full px-3 py-2 rounded-md"
            >
              {Colors &&
                Colors.map((color) => (
                  <option
                    key={color.ColorId}
                    value={color.color_name}
                    selected={color.color_name === ProductById.ColorDefault}
                  >
                    {color.color_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditForm;
