import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

const WorkshopPage = () => {
  const [workshops, setWorkshops] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    id: "",
    Ws_image: null,
    Ws_Title: "",
    Ws_beginDay: "",
    Ws_timeSt: "",
    Ws_timeE: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch workshops
  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Workshop");
      setWorkshops(response.data);
    } catch (error) {
      console.error("Error fetching workshops:", error);
    }
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "Ws_image") {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);

    // Lấy các thành phần ngày, tháng, năm
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    const year = date.getFullYear();

    // Định dạng lại theo ngày/tháng/năm
    return `${day}/${month}/${year}`;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Ws_image", form.Ws_image);
    formData.append("Ws_Title", form.Ws_Title);
    formData.append("Ws_beginDay", form.Ws_beginDay);
    formData.append("Ws_timeSt", form.Ws_timeSt);
    formData.append("Ws_timeE", form.Ws_timeE);

    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:3000/workshops/${form.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post("http://localhost:3000/workshops", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setForm({
        id: "",
        Ws_image: null,
        Ws_Title: "",
        Ws_beginDay: "",
        Ws_timeSt: "",
        Ws_timeE: "",
      });
      setIsEditing(false);
      fetchWorkshops();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  // Handle edit
  const handleEdit = (workshop) => {
    setForm({
      id: workshop.Workshop_id,
      Ws_image: null, // Reset image input when editing
      Ws_Title: workshop.Ws_Title,
      Ws_beginDay: workshop.Ws_beginDay,
      Ws_timeSt: workshop.Ws_timeSt,
      Ws_timeE: workshop.Ws_timeE,
    });
    setIsEditing(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/workshops/${id}`);
    fetchWorkshops();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setForm({
      id: "",
      Ws_image: null,
      Ws_Title: "",
      Ws_beginDay: "",
      Ws_timeSt: "",
      Ws_timeE: "",
    });
    setIsEditing(false);
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Workshop Management</h1>

      <button
        onClick={openModal}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Thêm mới
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Workshop Form"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">
            {isEditing ? "Sửa Workshop" : "Thêm Workshop"}
          </h2>
          <form onSubmit={handleSubmit} className="mb-6">
            <input
              type="hidden"
              name="id"
              value={form.id}
              onChange={handleChange}
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                type="file"
                name="Ws_image"
                onChange={handleChange}
                className="mt-1 block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="Ws_Title"
                value={form.Ws_Title}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Begin Day
              </label>
              <input
                type="date"
                name="Ws_beginDay"
                value={form.Ws_beginDay}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <input
                type="time"
                name="Ws_timeSt"
                value={form.Ws_timeSt}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                End Time
              </label>
              <input
                type="time"
                name="Ws_timeE"
                value={form.Ws_timeE}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              {isEditing ? "Update" : "Add"}
            </button>
          </form>
          <button
            onClick={closeModal}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </Modal>

      {/* Workshops List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-center">
          <thead>
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2">Begin Day</th>
              <th className="px-4 py-2">Start Time</th>
              <th className="px-4 py-2">End Time</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workshops.map((workshop) => (
              <tr key={workshop.Workshop_id}>
                <td className="border px-4 py-2">
                  <img
                    src={`http://localhost:3000/assets/${workshop.Ws_image}`}
                    alt={workshop.Ws_Title}
                    className="w-20 h-20 object-cover"
                  />
                </td>
                <td className="border px-4 py-2 text-left">
                  {workshop.Ws_Title}
                </td>
                <td className="border px-4 py-2">
                  {formatDate(workshop.Ws_beginDay)}
                </td>
                <td className="border px-4 py-2">{workshop.Ws_timeSt}</td>
                <td className="border px-4 py-2">{workshop.Ws_timeE}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(workshop)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(workshop.Workshop_id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkshopPage;
