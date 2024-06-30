import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomInput from "../../components/core/CustomInput";
import Button from "../../components/core/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!validateEmail(email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!validatePassword(password)) {
      validationErrors.password =
        "Password must be at least 8 characters long and include lowercase, uppercase, numbers, and symbols";
    }

    if (Object.keys(validationErrors).length === 0) {
      console.log({ email, password });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pl-20 ">
      <div className="bg-white backdrop-blur-xl bg-opacity-10 p-8 rounded-lg  border border-primary w-full">
        <p className="text-3xl font-bold mb-2  text-primary">
          Welcome to Ilead MIS
        </p>
        <p className="text-sm  mb-6  text-secondary">
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
                if (errors.email) {
                  setErrors((prev) => ({ ...prev, email: null }));
                }
                setEmail(e.target.value);
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
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: null }));
                }
                setPassword(e.target.value);
              }}
              prefix="mdi:lock"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <Button variant="primary" type="submit" className={"w-full"}>
            <p className="w-full">Login</p>
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
