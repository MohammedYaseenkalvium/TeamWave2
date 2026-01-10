import React from "react";

const UserCard = ({ userInfo }) => {
  const roleClass =
    userInfo?.role === "admin"
      ? "text-blue-400 bg-blue-500/10 border-blue-500/20"
      : "text-green-400 bg-green-500/10 border-green-500/20";

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 transition hover:border-slate-700">
      
      <div className="flex items-center gap-3">
        <img
          src={userInfo?.profileImage}
          alt="Avatar"
          className="w-12 h-12 rounded-full object-cover border-2 border-slate-800"
        />

        <div>
          <p className="text-sm font-medium text-slate-100">
            {userInfo?.name}
          </p>
          <p className="text-xs text-slate-400">
            {userInfo?.email}
          </p>
        </div>
      </div>

      
      <div className="mt-4">
        <span
          className={`inline-block text-[11px] font-medium px-3 py-1 rounded-full border ${roleClass}`}
        >
          {userInfo?.role === "admin" ? "Admin" : "Member"}
        </span>
      </div>

      
      <div className="flex gap-3 mt-4">
        <StatCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="Pending"
        />
        <StatCard
          label="In-Progress"
          count={userInfo?.inProgressTasks || 0}
          status="In-Progress"
        />
        <StatCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="Completed"
        />
      </div>
    </div>
  );
};

export default UserCard;



const StatCard = ({ label, count, status }) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In-Progress":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "Completed":
        return "text-green-400 bg-green-500/10 border-green-500/20";
      default:
        return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    }
  };

  return (
    <div
      className={`flex-1 border rounded-lg px-3 py-2 ${getStatusTagColor()}`}
    >
      <p className="text-[11px] text-slate-400">{label}</p>
      <p className="text-[14px] font-semibold text-slate-100">
        {count}
      </p>
    </div>
  );
};
