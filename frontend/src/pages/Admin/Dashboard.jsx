import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import { addThousandsSeparator } from "../../utils/helper";
import InfoCard from "../../components/Cards/InfoCard";
import { LuArrowRight } from "react-icons/lu";
import TaskListTable from "../../components/TaskListTable";
import CustomPieChart from "../../components/Charts/CustomPieChart";
import CustomBarChart from "../../components/Charts/CustomBarChart";

const COLORS = ["#EC4899", "#6366F1", "#22C55E"];

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  
  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || {};
    const taskPriorityLevels = data?.taskPriorityLevels || {};

    setPieChartData([
      { status: "Pending", value: taskDistribution.Pending || 0 },
      { status: "In-Progress", value: taskDistribution["In-Progress"] || 0 },
      { status: "Completed", value: taskDistribution.Completed || 0 },
    ]);

    setBarChartData([
      { priority: "Low", value: taskPriorityLevels.Low || 0 },
      { priority: "Medium", value: taskPriorityLevels.Medium || 0 },
      { priority: "High", value: taskPriorityLevels.High || 0 },
    ]);
  };

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA
      );
      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data.charts);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 my-6">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-100">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            {user?.name}
          </span>
        </h2>

        <p className="text-xs md:text-sm text-slate-400 mt-2">
          {moment().format("dddd, Do MMM YYYY")}
        </p>

        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <InfoCard
            label="Total Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.All ?? 0
            )}
            color="bg-blue-500"
          />
          <InfoCard
            label="Pending Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Pending ?? 0
            )}
            color="bg-pink-500"
          />
          <InfoCard
            label="In Progress Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.["In-Progress"] ?? 0
            )}
            color="bg-indigo-500"
          />
          <InfoCard
            label="Completed Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Completed ?? 0
            )}
            color="bg-green-500"
          />
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
          <h5 className="text-sm font-semibold text-slate-200 mb-4">
            Task Distribution
          </h5>
          <CustomPieChart data={pieChartData} colors={COLORS} />
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
          <h5 className="text-sm font-semibold text-slate-200 mb-4">
            Task Priority Levels
          </h5>
          <CustomBarChart data={barChartData} />
        </div>
      </div>

      
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-lg font-semibold text-slate-100">
            Recent Tasks
          </h5>

          <button
            onClick={() => navigate("/admin/tasks")}
            className="flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition"
          >
            See all <LuArrowRight />
          </button>
        </div>

        <TaskListTable tableData={dashboardData?.recentTasks || []} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
