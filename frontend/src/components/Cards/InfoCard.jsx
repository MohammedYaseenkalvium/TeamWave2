import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3">
      <div className={`w-1.5 h-6 rounded-full ${color}`} />

      <div className="flex flex-col leading-tight">
        <span className="text-sm md:text-[15px] font-semibold text-slate-100">
          {value}
        </span>
        <span className="text-xs md:text-[13px] text-slate-400">
          {label}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
