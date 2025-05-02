import React, { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { authorizedApi, unauthorizedApi } from "../utils/api";
import toast from "react-hot-toast";

export const UserContext = createContext(undefined);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isTokenExpired = (timestamp) => {
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    return now - timestamp > twentyFourHours;
  };

  const refreshAccessToken = async () => {
    setLoading(true);
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await authorizedApi.post("/auth/refresh-token", {
        token: refreshToken,
      });
      const { accessToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("tokenTimestamp", Date.now());
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      setLoading(false);
      return accessToken;
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      setLoading(false);
      return null;
    }
  };

  // Initialize authentication

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem("user");
      const storedAccessToken = localStorage.getItem("accessToken");
      const tokenTimestamp = localStorage.getItem("tokenTimestamp");

      if (storedUser && storedAccessToken) {
        if (tokenTimestamp && isTokenExpired(Number(tokenTimestamp))) {
          const newAccessToken = await refreshAccessToken();
          if (!newAccessToken) {
            toast.error("Session expired. Please log in again.");
            navigate("/auth/login");
          } else {
            setUser(JSON.parse(storedUser));
          }
        } else {
          setUser(JSON.parse(storedUser));
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedAccessToken}`;
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, [navigate]);
  
  useEffect(() => {
    if (!loading) {
      const path = location.pathname;

      const isCertificateView = /^\/certificate\/[^/]+$/.test(path);
      const isLoginPage = path === "/auth/login";
      const isCertificatesRoot = path === "/certificates/";

      if (!user && !isLoginPage && !isCertificatesRoot && !isCertificateView) {
        navigate("/auth/login");
      } else if (user && isLoginPage) {
        navigate("/");
      }
    }
  }, [loading, user, location, navigate]);

  const updateUser = async () => {
    setLoading(true);
    try {
      const response = await authorizedApi.get("/user/me");
      const fetchedUser = response.data;
      setUser(fetchedUser);
      localStorage.setItem("user", JSON.stringify(fetchedUser));
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials, callback) => {
    try {
      const response = await unauthorizedApi.post("/auth/login", credentials);
      const { user, accessToken, refreshToken } = response.data;

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("tokenTimestamp", Date.now());
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      if (callback) callback();
      navigate("/");
    } catch (error) {
      if (error.response?.data?.message || error.response?.data?.error) {
        toast.error(error.response.data.message || error.response?.data?.error);
      } else {
        toast.error("Error while logging in");
      }
      console.error("Failed to login:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenTimestamp");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/auth/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
