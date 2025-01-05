import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import SinglePost from "./pages/SinglePost"; // Import SinglePost
import axios from "axios"; // Import only axios

interface User {
  _id: string;
  username: string;
  email: string;
  firstName: string;
}

interface TokenValidationResponse {
  valid: boolean;
  user: User;
}

// Custom type guard to check if error is an Axios error
function isAxiosError(error: any): error is { response: { status: number } } {
  return error && error.response && typeof error.response.status === "number";
}

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const validateToken = async () => {
        try {
          // Attempt to validate the token with the backend
          const response = await axios.post<TokenValidationResponse>(
            `${process.env.REACT_APP_BACKEND_URL}/auth/validate-token`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.data.valid) {
            setIsAuthenticated(true);
            const user = response.data.user;
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
          } else {
            handleLogout();
          }
        } catch (error) {
          console.error("Token validation failed:", error);
          if (isAxiosError(error) && error.response.status === 401) {
            handleLogout();
          }
        }
      };

      validateToken();
    }
  }, []);

  const handleLogin = (
    username: string,
    email: string,
    firstName: string,
    token: string
  ) => {
    const user = { _id: "", username, email, firstName }; // Updated to include _id
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    setIsAuthenticated(true);
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="bg-background min-h-screen text-primaryText flex flex-col">
        <Header isAuthenticated={isAuthenticated} />{" "}
        {/* Pass isAuthenticated */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/edit-profile"
              element={
                isAuthenticated ? <EditProfile /> : <Navigate to="/login" />
              }
            />
            <Route path="/post/:id" element={<SinglePost />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
