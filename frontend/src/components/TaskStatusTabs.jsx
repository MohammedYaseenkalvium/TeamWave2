import React from "react";

const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="my-2">
      <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.label;

          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`
                relative flex items-center gap-2
                px-3 py-1.5 rounded-md
                text-xs font-medium
                transition
                ${
                  isActive
                    ? "bg-slate-800 text-slate-100"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }
              `}
            >
              <span>{tab.label}</span>

              <span
                className={`
                  text-[11px] px-2 py-0.5 rounded-full
                  ${
                    isActive
                      ? "bg-indigo-500/20 text-indigo-400"
                      : "bg-slate-700 text-slate-300"
                  }
                `}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TaskStatusTabs;
