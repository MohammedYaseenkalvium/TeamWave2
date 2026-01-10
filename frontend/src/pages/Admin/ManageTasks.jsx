import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuFileSpreadsheet } from "react-icons/lu";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import TaskCard from "../../components/Cards/TaskCard";
import toast from "react-hot-toast";

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const navigate = useNavigate();

  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_ALL_TASKS,
        {
          params: {
            status: filterStatus === "All" ? "" : filterStatus,
          },
        }
      );

      setAllTasks(response.data?.tasks || []);

      const statusSummary = response.data?.statusSummary || {};

      setTabs([
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pendingTasks || 0 },
        { label: "In-Progress", count: statusSummary.inProgressTasks || 0 },
        { label: "Completed", count: statusSummary.completedTasks || 0 },
      ]);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleClick = (task) => {
    navigate("/admin/create-task", { state: { taskId: task._id } });
  };

  
  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.REPORTS.EXPORT_TASKS,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "task_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to download report");
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="my-6 space-y-5">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-slate-100">
            My Tasks
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            <TaskStatusTabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
            />

            <button
              onClick={handleDownloadReport}
              className="
                flex items-center gap-2
                text-xs font-medium
                text-emerald-400
                bg-emerald-500/10
                border border-emerald-500/20
                rounded-md
                px-3 py-2
                hover:bg-emerald-500/20
                transition
              "
            >
              <LuFileSpreadsheet className="text-base" />
              Download Report
            </button>
          </div>
        </div>

        {/* TASK GRID */}
        {allTasks.length === 0 ? (
          <div className="text-sm text-slate-400 mt-10 text-center">
            No tasks found for this status.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allTasks.map((task) => (
              <TaskCard
                key={task._id}
                title={task.title}
                description={task.description}
                priority={task.priority}
                status={
                  task.todoChecklist?.length &&
                  task.completedTodoCount === task.todoChecklist.length
                    ? "Completed"
                    : task.status
                }
                progress={
                  task.todoChecklist?.length
                    ? (task.completedTodoCount /
                        task.todoChecklist.length) *
                      100
                    : 0
                }
                createdAt={task.createdAt}
                dueDate={task.dueDate}
                assignedTo={task.assignedTo?.map(
                  (user) => user.profileImage
                )}
                attachmentCount={task.attachments?.length || 0}
                completedTodoCounts={task.completedTodoCount || 0}
                todoChecklist={task.todoChecklist || []}
                onClick={() => handleClick(task)}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageTasks;
