import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Login, SideBar } from "./components";
import Home from "./container/Home";

const App = () => {
  const [user, setUser] = useState({});
  return (
    <Routes>
      <Route path="login" element={<Login setUser={setUser} />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;
