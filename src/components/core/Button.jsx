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
}) => {
  const baseStyles = "px-4 py-2.5 rounded-2xl focus:outline-none";
  let variantStyles = "";

  if (variant === "primary") {
    variantStyles = "bg-primary text-white";
  } else if (variant === "secondary") {
    variantStyles = "border border-myBlue text-white";
  } else if (variant === "blue") {
    variantStyles = "bg-myBlue border-blue-900 border text-white";
  } else if (variant === "red") {
    variantStyles = "bg-myRed border-red-900 border text-white";
  }

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "red", "blue"]).isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

export default Button;
