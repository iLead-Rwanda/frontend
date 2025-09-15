import React from "react";
import PropTypes from "prop-types";

const Button = ({
  variant,
  className,
  onClick,
  children,
  type = "button",
  disabled = false,
  loading = false,
  size = "md",
}) => {
  let baseStyles = "rounded-2xl focus:outline-none disabled:opacity-50 ";
  
  if (size === "sm") {
    baseStyles += "px-2 py-1 text-sm ";
  } else if (size === "md") {
    baseStyles += "px-4 py-2.5 ";
  } else if (size === "lg") {
    baseStyles += "px-6 py-3 text-lg ";
  }
  let variantStyles = "";

  if (variant === "primary") {
    variantStyles = "bg-primary text-white";
  } else if (variant === "secondary") {
    variantStyles = "border border-primary text-primary";
  } else if (variant === "blue") {
    variantStyles = "bg-myBlue border-blue-900 border text-white";
  } else if (variant === "red") {
    variantStyles = "bg-myRed border-red-900 border text-white";
  } else if (variant === "danger") {
    variantStyles = "bg-red-600 hover:bg-red-700 text-white";
  }

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles} ${className} !disabled:cursor-not-allowed`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "red", "blue", "danger"]).isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default Button;
