import React from "react";
import Route from "./routes/route";
import { useNavigate } from "react-router-dom";
import Welcome from "./Pages/Welcome";
import ProductForm from "./Components/Products/ProductForm";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./Components/Login";
// import Dashboard from "./Components/Dashboard";
// import Navbar from "./Components/Navbar";
// import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    //
    <div>
      {/* <Welcome /> */}
      <Route />
    </div>
  );
}

export default App;
