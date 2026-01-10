import React from "react";
import Progress from "../layouts/Progress";
import AvatarGroup from "../layouts/AvatarGroup";
import { LuPaperclip } from "react-icons/lu";
import moment from "moment";

const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attachmentCount,
  completedTodoCounts,
  todoChecklist,
  onClick,
}) => {
  const normalizedStatus =
    status === "In Progress" ? "In-Progress" : status;

  const getStatusTagColor = () => {
    switch (normalizedStatus) {
      case "In-Progress":
        return "text-blue-400 bg-blue-500/10 border border-blue-500/20";
      case "Completed":
        return "text-green-400 bg-green-500/10 border border-green-500/20";
      default:
        return "text-amber-400 bg-amber-500/10 border border-amber-500/20";
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case "High":
        return "text-red-400 bg-red-500/10 border border-red-500/20";
      case "Medium":
        return "text-amber-400 bg-amber-500/10 border border-amber-500/20";
      default:
        return "text-slate-400 bg-slate-500/10 border border-slate-500/20";
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-slate-950 border border-slate-800 rounded-xl p-4 cursor-pointer transition
                 hover:border-slate-700 hover:bg-slate-900/60"
    >
      
      <div className="flex items-center gap-3">
        <span
          className={`text-[11px] font-medium px-3 py-0.5 rounded ${getStatusTagColor()}`}
        >
          {status}
        </span>
        <span
          className={`text-[11px] font-medium px-3 py-0.5 rounded ${getPriorityTagColor()}`}
        >
          {priority} Priority
        </span>
      </div>

      
      <div className="border-l-2 border-slate-800 pl-3 mt-4">
        <p className="text-sm font-semibold text-slate-100 line-clamp-2">
          {title}
        </p>

        <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <p className="text-xs text-slate-300 font-medium mt-3 mb-2">
          Task Done:{" "}
          <span className="font-semibold text-slate-100">
            {completedTodoCounts}/{todoChecklist.length || 0}
          </span>
        </p>

        <Progress progress={progress} status={status} />
      </div>

      
      <div className="flex items-center justify-between mt-4 text-xs">
        <div>
          <p className="text-slate-400">Start Date</p>
          <p className="text-slate-200 font-medium">
            {moment(createdAt).format("Do MMM YYYY")}
          </p>
        </div>

        <div>
          <p className="text-slate-400">Due Date</p>
          <p className="text-slate-200 font-medium">
            {moment(dueDate).format("Do MMM YYYY")}
          </p>
        </div>
      </div>

      
      <div className="flex items-center justify-between mt-4">
        <AvatarGroup avatars={assignedTo || []} />

        {attachmentCount > 0 && (
          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md">
            <LuPaperclip className="text-slate-300" />
            <span className="text-xs text-slate-200">
              {attachmentCount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
