import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl px-4">
        {/* Modal Container */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
            <h3 className="text-base md:text-lg font-semibold text-slate-100">
              {title}
            </h3>

            <button
              type="button"
              onClick={onClose}
              className="
                w-8 h-8
                flex items-center justify-center
                rounded-lg
                text-slate-400
                hover:text-slate-100
                hover:bg-slate-800
                transition
              "
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-6 space-y-6 text-slate-200">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
