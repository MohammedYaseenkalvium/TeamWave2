import React from "react";
import moment from "moment";

const TaskListTable = ({ tableData }) => {
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-400 bg-green-500/10 border border-green-500/20";
      case "Pending":
        return "text-amber-400 bg-amber-500/10 border border-amber-500/20";
      case "In-Progress":
        return "text-blue-400 bg-blue-500/10 border border-blue-500/20";
      default:
        return "text-slate-400 bg-slate-500/10 border border-slate-500/20";
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-400 bg-red-500/10 border border-red-500/20";
      case "Medium":
        return "text-amber-400 bg-amber-500/10 border border-amber-500/20";
      case "Low":
        return "text-green-400 bg-green-500/10 border border-green-500/20";
      default:
        return "text-slate-400 bg-slate-500/10 border border-slate-500/20";
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-800 mt-3">
      <table className="min-w-full text-sm">
        
        <thead className="bg-slate-950 border-b border-slate-800">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">
              Priority
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 hidden md:table-cell">
              Created On
            </th>
          </tr>
        </thead>

        
        <tbody>
          {tableData.map((task) => (
            <tr
              key={task._id}
              className="border-b border-slate-800 hover:bg-slate-900 transition"
            >
              <td className="px-4 py-3 text-slate-200 font-medium truncate max-w-[220px]">
                {task.title}
              </td>

              <td className="px-4 py-3">
                <span
                  className={`inline-block px-2.5 py-1 text-xs font-medium rounded ${getStatusBadgeColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </td>

              <td className="px-4 py-3">
                <span
                  className={`inline-block px-2.5 py-1 text-xs font-medium rounded ${getPriorityBadgeColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </td>

              <td className="px-4 py-3 text-slate-400 text-xs hidden md:table-cell whitespace-nowrap">
                {task.createdAt
                  ? moment(task.createdAt).format("Do MMM YYYY")
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListTable;
