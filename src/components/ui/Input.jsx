import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = forwardRef(
  ({ label, type = "text", error, className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType =
      isPassword && showPassword ? "text" : type;

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label className="block mb-1 text-sm">
            {label}
          </label>
        )}

        {/* Input */}
        <div
          className={`flex items-center border px-3 py-2
          ${error ? "border-red-500" : "border-gray-300"}`}
        >
          <input
            ref={ref}
            type={inputType}
            className={`w-full outline-none ${className}`}
            {...props}
          />

          {/* Password Toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

export default Input;
