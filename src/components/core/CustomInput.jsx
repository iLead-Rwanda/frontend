import React, { useState } from "react";
import CustomInput from "../../components/core/CustomInput";

const AddEditProvince = ({ onClose, defaultData }) => {
  const [provinceName, setProvinceName] = useState(defaultData?.name || "");
  const [adminName, setAdminName] = useState(defaultData?.admin?.name || "");
  const [adminEmail, setAdminEmail] = useState(defaultData?.admin?.email || "");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log(
        `Submitting province data: ${provinceName}, ${adminName}, ${adminEmail}`
      );
      onClose();
    } else {
      setErrors(errors);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!provinceName.trim()) {
      errors.provinceName = "Province Name is required";
    }
    if (!adminName.trim()) {
      errors.adminName = "Admin Name is required";
    }
    if (!adminEmail.trim()) {
      errors.adminEmail = "Admin Email is required";
    } else if (!isValidEmail(adminEmail)) {
      errors.adminEmail = "Invalid email format";
    }
    return errors;
  };

  const isValidEmail = (email) => {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">
          {defaultData ? "Edit Province" : "Add Province"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="provinceName"
              className="block text-sm font-medium text-gray-700"
            >
              Province Name
            </label>
            <CustomInput
              type="text"
              id="provinceName"
              value={provinceName}
              onChange={(e) => setProvinceName(e.target.value)}
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                errors.provinceName ? "border-red-500" : ""
              }`}
              placeholder="Enter province name"
            />
            {errors.provinceName && (
              <p className="text-red-500 text-sm mt-1">{errors.provinceName}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="adminName"
              className="block text-sm font-medium text-gray-700"
            >
              Admin Name
            </label>
            <CustomInput
              type="text"
              id="adminName"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                errors.adminName ? "border-red-500" : ""
              }`}
              placeholder="Enter admin name"
            />
            {errors.adminName && (
              <p className="text-red-500 text-sm mt-1">{errors.adminName}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="adminEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Admin Email
            </label>
            <CustomInput
              type="email"
              id="adminEmail"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                errors.adminEmail ? "border-red-500" : ""
              }`}
              placeholder="Enter admin email"
            />
            {errors.adminEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.adminEmail}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {defaultData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditProvince;
