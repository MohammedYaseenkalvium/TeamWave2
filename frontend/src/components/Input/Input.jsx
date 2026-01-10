import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggle = () => setShowPassword(!showPassword);

  return (
    <div className="text-left space-y-1">
      {/* Label */}
      <label className="text-[13px] font-medium text-slate-400">
        {label}
      </label>

      {/* Input Wrapper */}
      <div
        className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2
                   focus-within:border-blue-500/50 transition"
      >
        <input
          type={
            type === "password"
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-slate-200 text-sm
                     placeholder:text-slate-500"
          value={value}
          onChange={onChange}
        />

        {type === "password" &&
          (showPassword ? (
            <FaRegEye
              size={18}
              className="cursor-pointer text-blue-400 hover:text-blue-300 transition"
              onClick={toggle}
            />
          ) : (
            <FaRegEyeSlash
              size={18}
              className="cursor-pointer text-slate-400 hover:text-slate-300 transition"
              onClick={toggle}
            />
          ))}
      </div>
    </div>
  );
};

export default Input;
