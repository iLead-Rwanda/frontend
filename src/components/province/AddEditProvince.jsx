import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomInput from "../../components/core/CustomInput";
import Button from "../core/Button";
import { useModal } from "../../contexts/ModalContext";
import { createProvince } from "../../utils/funcs/provinces";

const AddEditProvince = ({ onClose, defaultData }) => {
  const [provinceName, setProvinceName] = useState(defaultData?.name || "");
  const [adminName, setAdminName] = useState(defaultData?.admin?.name || "");
  const [adminEmail, setAdminEmail] = useState(defaultData?.admin?.email || "");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      await createProvince(
        { name: provinceName, adminName, adminEmail },
        onClose
      );
      setLoading(false);
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
    <div className="">
      <div className="bg-white  rounded-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-primary">
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
              onChange={(e) => {
                if (errors.provinceName) {
                  setErrors((prev) => ({ ...prev, provinceName: null }));
                }
                setProvinceName(e.target.value);
              }}
              placeholder="Enter province name"
            />
            {errors.provinceName && (
              <p className="text-red-500 italic text-sm mt-1">
                {errors.provinceName}
              </p>
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
              onChange={(e) => {
                if (errors.adminName) {
                  setErrors((prev) => ({ ...prev, adminName: null }));
                }
                setAdminName(e.target.value);
              }}
              placeholder="Enter admin name"
            />
            {errors.adminName && (
              <p className="text-red-500 italic text-sm mt-1">
                {errors.adminName}
              </p>
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
              onChange={(e) => {
                if (errors.adminEmail) {
                  setErrors((prev) => ({ ...prev, adminEmail: null }));
                }
                setAdminEmail(e.target.value);
              }}
              placeholder="Enter admin email"
            />
            {errors.adminEmail && (
              <p className="text-red-500 italic text-sm mt-1">
                {errors.adminEmail}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-5">
            <Button variant="secondary" type="button" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" loading={loading}>
              {defaultData ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddEditProvince.propTypes = {
  onClose: PropTypes.func.isRequired,
  defaultData: PropTypes.shape({
    name: PropTypes.string,
    admin: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
};

export default AddEditProvince;
