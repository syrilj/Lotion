import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";

function App() {
  const [isLoggedInUser, setIsLoggedInUser] = useState(
    window.localStorage.getItem("isLoggedInUser") || false
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage setIsLoggedInUser={setIsLoggedInUser} />} />
        <Route element={<Layout />}>
          {isLoggedInUser ? (
            <>
              <Route path="/" element={<Navigate to="/notes" />} />
              <Route path="/notes" element={<Home />} />
              <Route path="/notes/:id" element={<Home />} />
              <Route path="/notes/:id/edit" element={<Edit />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


