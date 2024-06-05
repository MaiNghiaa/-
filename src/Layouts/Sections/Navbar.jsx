// import React, { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const { auth, setAuth } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     setAuth(null);
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
//       <Link to="/dashboard" className="text-xl">
//         Dashboard
//       </Link>
//       <div>
//         {auth ? (
//           <>
//             <span className="mr-4">{auth.username}</span>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 px-3 py-1 rounded"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <Link to="/login">Login</Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";

export default function Navbar() {
  return (
    <div className="h-[50px] text-center py-3 bg-slate-500 text-[16px] text-[#ffffff]">
      {localStorage.getItem("username")}
    </div>
  );
}
