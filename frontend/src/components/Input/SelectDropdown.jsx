import React, { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

const SelectDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between mt-2 px-3 py-2.5
                   bg-slate-950 border border-slate-800 rounded-md
                   text-sm text-slate-200 outline-none
                   hover:border-slate-700 transition"
      >
        <span className={value ? "text-slate-200" : "text-slate-500"}>
          {value
            ? options.find((opt) => opt.value === value)?.label
            : placeholder}
        </span>

        <LuChevronDown
          className={`text-slate-400 transition ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute w-full mt-1 z-10
                        bg-slate-950 border border-slate-800 rounded-md
                        shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="px-3 py-2 text-sm text-slate-200 cursor-pointer
                         hover:bg-slate-800 transition"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
