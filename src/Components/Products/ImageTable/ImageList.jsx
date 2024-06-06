import axios from "axios";
import React, { useEffect, useState } from "react";

const ImageList = ({ productId, onClose }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/images/${productId}`)
      .then((response) => {
        setImages(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  const handleAddImage = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);

    const formData = new FormData();
    formData.append("image", file);

    axios
      .post(`http://localhost:3000/images/${productId}`, formData)
      .then((response) => {
        console.log("Image uploaded successfully:", response.data);
        // Sau khi upload thành công, hiển thị loading và sau 3 giây ẩn đi và tải lại danh sách ảnh
        setLoading(true);
        setTimeout(() => {
          axios
            .get(`http://localhost:3000/images/${productId}`)
            .then((response) => {
              setImages(response.data);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching images:", error);
            });
        }, 3000);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const handleDeleteImage = (idImg, Img) => {
    // console.log(idImg, Img);
    axios
      .delete(`http://localhost:3000/images/${idImg}`, {
        data: { imageName: Img },
      })
      .then((response) => {
        console.log("Image deleted successfully:", response.data);
        setImages(images.filter((image) => image.ImgID !== idImg));
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-4 rounded shadow-lg max-h-full overflow-auto">
        <button onClick={onClose} className="text-2xl px-4 py-2">
          Close
        </button>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {loading ? ( // Kiểm tra loading để hiển thị hoặc ẩn quay tròn
            <div className="flex items-center justify-center p-4">
              {/* <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div> */}
              <img
                src="https://cdn.dribbble.com/users/2973561/screenshots/5757826/loading__.gif"
                alt=""
                className="w-[100px] h-[100px] object-contain"
              />
            </div>
          ) : (
            images.map((image, index) => (
              <div key={index} className="relative p-2 bg-slate-50">
                <button
                  onClick={() => handleDeleteImage(image.ImgID, image.ImageURL)}
                  className="absolute top-0 left-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  x
                </button>
                <img
                  src={`http://localhost:3000/assets/${image.ImageURL}`}
                  alt=""
                  className="w-[200px] h-full"
                />
              </div>
            ))
          )}
          <div
            className="flex items-center justify-center p-4 bg-gray-200 border-dashed border-[2px] border-[#000000]"
            onClick={handleAddImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[200px] w-[200px] text-gray-400 cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 0 0-1 1v5H4a1 1 0 0 0 0 2h5v5a1 1 0 0 0 2 0v-5h5a1 1 0 0 0 0-2h-5V4a1 1 0 0 0-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageList;
