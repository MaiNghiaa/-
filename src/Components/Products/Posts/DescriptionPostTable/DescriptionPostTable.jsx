import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

const DescriptionPostTable = ({ productId, onClose }) => {
  const [descriptions, setDescriptions] = useState([]);
  const [isOpenFormDescription, setIsOpenFormDescription] = useState(false);
  const [isOpenFormEditDescription, setIsOpenFormEditDescription] =
    useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [descriptionToEdit, setDescriptionToEdit] = useState(null);
  const [descId, setDescId] = useState();
  //
  useEffect(() => {
    axios
      .get(`http://localhost:3000/descriptions/${productId}`)
      .then((response) => {
        setDescriptions(response.data);
      })
      .catch((error) => console.error("Error fetching descriptions:", error));
  }, [productId]);

  const handleAddDescription = () => {
    setIsOpenFormDescription(true);
  };

  const handleCloseFormDescription = () => {
    setIsOpenFormDescription(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);
      formData.append("description", description);
      // console.log(title, image, description);
      const response = await axios.post(
        `http://localhost:3000/descriptions/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response from server:", response.data);
      onClose();
    } catch (error) {
      console.error("Error adding description:", error);
    }
  };

  const handleUpdateDescription = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      if (image) {
        formData.append("image", image);
      }
      formData.append("description", description);

      formData.append("descId", descId);
      const response = await axios.put(
        `http://localhost:3000/descriptions/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response from server:", response.data);
      onClose();
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  const handleEditDescription = (description) => {
    setDescriptionToEdit(description);
    setTitle(description.Title);
    setDescription(description.Description);
    setIsOpenFormEditDescription(true);
  };

  const handleDeleteDescription = (id) => {
    axios
      .delete(`http://localhost:3000/descriptions/${id}`)
      .then(() => {
        setDescriptions(descriptions.filter((desc) => desc.ProductID !== id));
      })
      .catch((error) => console.error("Error deleting description:", error));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-4 rounded shadow-lg max-h-full overflow-auto">
        <button onClick={onClose} className="text-2xl px-4 py-2">
          <FaTimes />
        </button>
        <h2 className="text-center py-2">Description Posts</h2>

        {!isOpenFormEditDescription ? (
          <table className="w-full bg-white shadow-md rounded-md overflow-hidden">
            {descriptions.length === 0 ? (
              <div className="text-center mt-4">
                {isOpenFormDescription ? (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label
                        htmlFor="title"
                        className="block text-sm font-bold mb-1"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={handleTitleChange}
                        className="border-gray-300 border w-full px-3 py-2 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="image"
                        className="block text-sm font-bold mb-1"
                      >
                        Image
                      </label>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        className="border-gray-300 border w-full px-3 py-2 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="description"
                        className="block text-sm font-bold mb-1"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        className="border-gray-300 border w-full px-3 py-2 rounded-md"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleCloseFormDescription}
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
                      Bạn chưa có mô tả cho sản phẩm của mình?
                    </p>
                    <button
                      onClick={handleAddDescription}
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
                      DescriptionDetail_Id
                    </th>
                    <th className="py-3 px-4 border-b border-gray-300">
                      ProductID
                    </th>
                    <th className="py-3 px-4 border-b border-gray-300">
                      Title
                    </th>
                    <th className="py-3 px-4 border-b border-gray-300">
                      Image
                    </th>
                    <th className="py-3 px-4 border-b border-gray-300">
                      Description
                    </th>
                    <th className="py-3 px-4 border-b border-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {descriptions.map((description) => (
                    <tr key={description.DescriptionDetail_Id}>
                      <td className="py-3 px-4 border-b border-gray-300">
                        {description.DescriptionDetail_Id}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-300">
                        {description.ProductID}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-300">
                        {description.Title}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-300">
                        <img
                          src={`http://localhost:3000/assets/${description.Image}`}
                          alt=""
                          className="w-[100px] h-[100px] object-cover"
                        />
                      </td>
                      <td className="py-3 px-4 border-b border-gray-300">
                        {description.Description}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-300">
                        <button
                          className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600"
                          onClick={() => {
                            handleEditDescription(description);
                            setDescId(description.DescriptionDetail_Id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
                          onClick={() => handleDeleteDescription(productId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
        ) : (
          <div className="bg-white p-4 rounded shadow-lg">
            <form onSubmit={handleUpdateDescription}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-bold mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={handleTitleChange}
                  className="border-gray-300 border w-full px-3 py-2 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-bold mb-1">
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  className="border-gray-300 border w-full px-3 py-2 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-bold mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  className="border-gray-300 border w-full px-3 py-2 rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpenFormEditDescription(false)}
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
    </div>
  );
};

export default DescriptionPostTable;
