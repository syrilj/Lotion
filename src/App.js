import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";


function App() {
  const [isLoggedInUser, setIsLoggedInUser] = useState(
    window.localStorage.getItem("isLoggedInUser")
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage setIsLoggedInUser={setIsLoggedInUser} />} />
        {/* Add a conditional check to prevent unauthorized access */}
        {isLoggedInUser ? (
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/notes" />} />
            <Route path="/notes" element={<Home />} />
            <Route path="/notes/:id" element={<Home />} />
            <Route path="/notes/:id/edit" element={<Edit />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

