import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2">
        <p className="text-xs font-semibold text-slate-200 mb-1">
          {payload[0].name}
        </p>
        <p className="text-xs text-slate-400">
          Count:{" "}
          <span className="font-semibold text-slate-100">
            {payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
