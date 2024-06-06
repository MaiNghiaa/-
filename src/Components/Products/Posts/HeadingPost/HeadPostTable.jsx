import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";

const HeadPostTable = ({ productId, onClose }) => {
  const [showHeadPostTable, setShowHeadPostTable] = useState(true);
  const [headings, setHeadings] = useState([]);
  const [isOpenformHeading, setisOpenFormHeading] = useState(false);
  const [isOpenformEditHeading, setisOpenformEditHeading] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [HeadingName, setHeadingName] = useState();
  const [headingImage, setImageHeading] = useState();
  const [headingToEdit, setHeadingToEdit] = useState(null); // State lưu thông tin của mục được chọn để chỉnh sửa
  const [values, setValues] = useState({
    Heading_name: "",
    Image_heading: "",
  });
  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleHeadingNameChange = (e) => {
    setHeadingName(e.target.value);
  };

  const handleImageHeadingChange = (e) => {
    setImageHeading(e.target.files[0]);
  };
  // console.log(productId);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/headings?productId=${productId}`)
      .then((response) => setHeadings(response.data))
      .catch((error) => console.error("Error fetching headings:", error));
  }, [productId]);

  const handleAddHeading = () => {
    setisOpenFormHeading(true);
  };

  const handleCloseFormHeading = () => {
    setisOpenFormHeading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("headingName", HeadingName);
      formData.append("headingImage", headingImage);

      const response = await axios.post(
        `http://localhost:3000/headings/${productId}`,
        formData, // Truyền formData vào axios.post()
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response from server:", response.data);
      onClose();
    } catch (error) {
      console.error("Error adding heading:", error);
    }
  };

  const handleUpdateHeading = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("headingName", HeadingName); // Đảm bảo tên trường khớp với server
      if (headingImage) {
        formData.append("headingImage", headingImage);
      }

      const response = await axios.put(
        `http://localhost:3000/headings/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response from server:", response.data);
      onClose(); // Đóng form sau khi cập nhật thành công
    } catch (error) {
      console.error("Error updating heading:", error);
    }
  };

  const handleEditHeading = (id, updatedHeading) => {
    setisOpenformEditHeading(true);
  };

  const handleDeleteHeading = (id) => {
    handleShowConfirmDelete();
    axios
      .delete(`http://localhost:3000/headings/${id}`)
      .then(() => {
        setHeadings(headings.filter((heading) => heading.Id_Heading !== id));
      })
      .catch((error) => console.error("Error deleting heading:", error));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      {!isOpenformEditHeading ? (
        <div className="bg-white p-4 rounded shadow-lg">
          <button onClick={onClose} className="text-2xl px-4 py-2">
            <FaTimes />
          </button>
          <h2 className="text-center py-2">Heading Posts</h2>

          <table className="w-full bg-white shadow-md rounded-md overflow-hidden">
            {headings.length === 0 ? (
              <div className="text-center mt-4">
                {isOpenformHeading ? (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label
                        htmlFor="headingName"
                        className="block text-sm font-bold mb-1"
                      >
                        Heading Name
                      </label>
                      <input
                        type="text"
                        id="headingName"
                        name="headingName"
                        value={HeadingName}
                        onChange={handleHeadingNameChange}
                        className="border-gray-300 border w-full px-3 py-2 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="headingImage"
                        className="block text-sm font-bold mb-1"
                      >
                        Heading Image
                      </label>
                      <input
                        type="file"
                        id="headingImage"
                        name="headingImage"
                        onChange={handleImageHeadingChange}
                        className="border-gray-300 border w-full px-3 py-2 rounded-md"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setisOpenFormHeading(false)}
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
                ) : (
                  <>
                    <p className="text-center p-2">
                      Bạn chưa có tiêu đề cho sản phẩm của mình?
                    </p>
                    <button
                      onClick={handleAddHeading}
                      className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    >
                      Thêm
                    </button>
                  </>
                )}
              </div>
            ) : (
              <>
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-3 px-4 border-b border-gray-300">
                      Id_Heading
                    </th>
                    <th className="py-3 px-4 border-b border-gray-300">
                      ProductID
                    </th>
                    <th className="py-3 px-4 border-b border-gray-300">
                      Heading_name
                    </th>
                    <th className="py-3 px-4 border-b border-gray-300">
                      Image_heading
                    </th>
                    <th className="py-3 px-4 border-b border-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {headings.map((heading) => (
                    <tr key={heading.Id_Heading}>
                      <td className="py-3 px-4 border-b border-gray-300">
                        {heading.Id_Heading}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-300">
                        {heading.ProductID}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-300">
                        {heading.Heading_name}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-300">
                        <img
                          src={`http://localhost:3000/assets/${heading.Image_heading}`}
                          alt=""
                          className="w-[150px] h-[150px] object-cover"
                        />
                      </td>
                      <td className="py-3 px-4 border-b border-gray-300">
                        <button
                          className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600"
                          onClick={() =>
                            handleEditHeading(heading.Id_Heading, heading)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
                          onClick={handleShowConfirmDelete}
                        >
                          Delete
                        </button>{" "}
                        {showConfirmDelete && (
                          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                            <div className="bg-white p-4 rounded shadow-lg">
                              <p>
                                Are you sure you want to delete this heading?
                              </p>
                              <div className="flex justify-end">
                                <button
                                  className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                                  onClick={handleCloseConfirmDelete}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                  onClick={() => {
                                    handleDeleteHeading(heading.Id_Heading);
                                    handleCloseConfirmDelete();
                                  }}
                                >
                                  Confirm
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      ) : (
        <div className="bg-white p-4 rounded shadow-lg">
          <form onSubmit={handleUpdateHeading}>
            <div className="mb-4">
              <label
                htmlFor="headingName"
                className="block text-sm font-bold mb-1"
              >
                Heading Name
              </label>
              <input
                type="text"
                id="HeadingName"
                name="HeadingName"
                onChange={handleHeadingNameChange}
                className="border-gray-300 border w-full px-3 py-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="headingImage"
                className="block text-sm font-bold mb-1"
              >
                Heading Image
              </label>
              <input
                type="file"
                id="headingImage"
                name="Image_heading"
                onChange={handleImageHeadingChange}
                className="border-gray-300 border w-full px-3 py-2 rounded-md"
              />
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
      )}
    </div>
  );
};

export default HeadPostTable;
