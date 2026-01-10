import React from "react";

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-4">
      {payload.map((entry, index) => (
        <div
          key={`item-${index}`}
          className="flex items-center gap-2"
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs font-medium text-slate-300">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
