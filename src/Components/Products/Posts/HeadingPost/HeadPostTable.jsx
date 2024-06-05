import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";

const HeadPostTable = ({ productId, onClose }) => {
  const [showHeadPostTable, setShowHeadPostTable] = useState(true);
  const [headings, setHeadings] = useState([]);
  const [newHeading, setNewHeading] = useState({
    ProductID: productId,
    Heading_name: "",
    Image_heading: "",
  });
  console.log(productId);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/headings?productId=${productId}`)
      .then((response) => setHeadings(response.data))
      .catch((error) => console.error("Error fetching headings:", error));
  }, [productId]);

  const handleAddHeading = () => {
    axios
      .post("http://localhost:3000/headings", newHeading)
      .then((response) => {
        setHeadings([...headings, response.data]);
        setNewHeading({
          ProductID: productId,
          Heading_name: "",
          Image_heading: "",
        });
      })
      .catch((error) => console.error("Error adding heading:", error));
  };

  const handleEditHeading = (id, updatedHeading) => {
    axios
      .put(`http://localhost:3000/headings/${id}`, updatedHeading)
      .then((response) => {
        setHeadings(
          headings.map((heading) =>
            heading.Id_Heading === id ? response.data : heading
          )
        );
      })
      .catch((error) => console.error("Error updating heading:", error));
  };

  const handleDeleteHeading = (id) => {
    axios
      .delete(`http://localhost:3000/headings/${id}`)
      .then(() => {
        setHeadings(headings.filter((heading) => heading.Id_Heading !== id));
      })
      .catch((error) => console.error("Error deleting heading:", error));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-4 rounded shadow-lg">
        <button onClick={onClose} className="text-2xl px-4 py-2">
          <FaTimes />
        </button>
        <h2 className="text-center py-2">Heading Posts</h2>

        <table className="w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 border-b border-gray-300">Id_Heading</th>
              <th className="py-3 px-4 border-b border-gray-300">ProductID</th>
              <th className="py-3 px-4 border-b border-gray-300">
                Heading_name
              </th>
              <th className="py-3 px-4 border-b border-gray-300">
                Image_heading
              </th>
              <th className="py-3 px-4 border-b border-gray-300">Actions</th>
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
                    onClick={() => handleDeleteHeading(heading.Id_Heading)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {headings.length === 0 && (
          <div className="text-center mt-4">
            <p className="text-center p-2">
              bạn chưa có tiêu đề cho sản phẩm của mình ??
            </p>
            <button
              onClick={handleAddHeading}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Thêm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeadPostTable;
