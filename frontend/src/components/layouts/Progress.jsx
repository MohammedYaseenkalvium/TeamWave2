import React from "react";

const Progress = ({ progress, status }) => {
  const getBarColor = () => {
    switch (status) {
      case "In-Progress":
        return "bg-blue-500";
      case "Completed":
        return "bg-green-500";
      default:
        return "bg-amber-500";
    }
  };

  return (
    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
      <div
        className={`${getBarColor()} h-full rounded-full transition-all duration-300`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default Progress;
