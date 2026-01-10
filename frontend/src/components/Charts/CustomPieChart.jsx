import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({ data, colors }) => {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={80}
            paddingAngle={0}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                stroke="none"
              />
            ))}
          </Pie>

          
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />

          
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
