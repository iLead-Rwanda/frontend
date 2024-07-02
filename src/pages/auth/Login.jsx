import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomInput from "../../components/core/CustomInput";
import Button from "../../components/core/Button";
import { unauthorizedApi } from "../../utils/api";
import toast from "react-hot-toast";
import { useUser } from "../../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let validationErrors = {};

    if (!email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      validationErrors.email = "Invalid email format.";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required.";
    } else if (!validatePassword(password)) {
      validationErrors.password =
        "Password must be at least 8 characters long and include lowercase, uppercase, numbers, and symbols.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const { login } = useUser();

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }
    setLoading(true);
    await login({ email, password });
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen pl-20">
      <div className="bg-white backdrop-blur-xl bg-opacity-10 p-8 rounded-lg border border-primary w-full">
        <p className="text-3xl font-bold mb-2 text-primary">
          Welcome to Ilead Certification System
        </p>
        <p className="text-sm mb-6 text-secondary">
          Log in to mis, your work is done for you!!!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <CustomInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }
              }}
              prefix="mdi:email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <CustomInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: undefined }));
                }
              }}
              prefix="mdi:lock"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <Button
            variant="primary"
            type="submit"
            className="w-full"
            loading={loading}
          >
            <p>Login</p>
          </Button>
        </form>
        <div className="mt-6 text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
