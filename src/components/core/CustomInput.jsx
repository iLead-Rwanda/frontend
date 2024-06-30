import React, { useState } from "react";
import { Icon } from "@iconify/react";

const CustomInput = ({
  type,
  placeholder,
  value,
  onChange,
  prefix,
  suffix,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative">
      {prefix && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon icon={prefix} className="text-gray-500 " />
        </span>
      )}
      <input
        type={
          type === "password" ? (isPasswordVisible ? "text" : "password") : type
        }
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`block w-full pl-10 pr-10 py-2 border-2 rounded-2xl shadow-sm border-secondary outline-none sm:text-sm ${
          prefix ? "pl-10" : "pl-3"
        } ${suffix ? "pr-10" : "pr-3"}`}
      />
      {type === "password" && (
        <span
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={handleTogglePassword}
        >
          <Icon
            icon={isPasswordVisible ? "mdi:eye-outline" : "mdi:eye-off-outline"}
          
          />
        </span>
      )}
      {suffix && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Icon icon={suffix} />
        </span>
      )}
    </div>
  );
};

export default CustomInput;
