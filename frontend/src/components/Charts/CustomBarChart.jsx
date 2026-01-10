import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {
 
  const getBarColor = (entry) => {
    switch (entry.priority) {
      case "Low":
        return "#3B82F6";
      case "Medium":
        return "#F59E0B"; 
      case "High":
        return "#EF4444"; 
      default:
        return "#64748B"; 
    }
  };


  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2">
          <p className="text-xs font-semibold text-slate-200 mb-1">
            {payload[0].payload.priority}
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

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mt-4">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          
          <CartesianGrid
            stroke="#1E293B"
            strokeDasharray="3 3"
          />

          
          <XAxis
            dataKey="priority"
            tick={{ fontSize: 12, fill: "#94A3B8" }}
            axisLine={false}
            tickLine={false}
          />

          
          <YAxis
            tick={{ fontSize: 12, fill: "#94A3B8" }}
            axisLine={false}
            tickLine={false}
          />

          
          <Tooltip
            content={<CustomToolTip />}
            cursor={{ fill: "transparent" }}
          />

          
          <Bar
            dataKey="value"
            radius={[8, 8, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
