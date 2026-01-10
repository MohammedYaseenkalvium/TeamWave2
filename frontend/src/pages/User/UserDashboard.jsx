import React, { useContext, useState,useEffect } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import { UserContext } from '../../context/userContext';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from "moment"
import { addThousandsSeparator } from '../../utils/helper';
import InfoCard from '../../components/Cards/InfoCard';
import { LuArrowRight } from 'react-icons/lu';
import TaskListTable from '../../components/TaskListTable';
import CustomPieChart from '../../components/Charts/CustomPieChart';
import CustomBarChart from '../../components/Charts/CustomBarChart';

const COLORS = ['#EC4899', '#6366F1', '#22C55E'];

const UserDashboard = () => {
  

  const {user} = useContext(UserContext);

  const navigate = useNavigate();

  const [dashboardData,setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData,setBarChartData] = useState([]);

  //Prepare Chart Data
  const prepareChartData=(data)=>{
    const taskDistribution = data?.taskDistribution || null;
    const taskPriorityLevels = data?.taskPriorityLevels || null;

    const taskDistributionData =[
      {status:"Pending", value: taskDistribution?.Pending || 0},
      {status:"In-Progress", value: taskDistribution?.["In-Progress"] || 0},
      {status:"Completed", value: taskDistribution?.Completed || 0},
    ];

    setPieChartData(taskDistributionData);

    const PriorityLevelData = [
      {priority:"Low", value: taskPriorityLevels?.Low || 0},
      {priority:"Medium", value: taskPriorityLevels?.Medium || 0},
      {priority:"High", value: taskPriorityLevels?.High || 0},
    ];

    setBarChartData(PriorityLevelData)
  }

  const getDashboardData = async()=>{
    try{
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_USER_DASHBOARD_DATA
      );
      if (response.data){
        setDashboardData(response.data);
        prepareChartData(response.data?.chart || null);
      }
    }catch(error){
      console.error("Error fetching users:",error)
    }
  };

  const onSeeMore=()=>{
    navigate('/user/tasks')
  }

  useEffect(()=>{
    getDashboardData()

    return ()=>{}
  },[])
  return (
    <DashboardLayout activeMenu="Dashboard">
       <div className="card my-5">
          <div>
            <div className='col-span-3'>
            <h2 className='text-xl md:text-2xl font-semibold'>Welcome back! <span className="font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">{user?.name}</span></h2>
            <p className='text-xs md:text-[13px] text-gray-400 mt-2.5'>
              {moment().format("dddd Do MMM YYYY")}
            </p>
            </div>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5'>
            <InfoCard
              label="Total Tasks"
              value={addThousandsSeparator(
                dashboardData?.chart?.taskDistribution?.All ?? 0
              )}
              color= "bg-blue-500"
              />
              <InfoCard
              label="Pending Tasks"
              value={addThousandsSeparator(
                dashboardData?.chart?.taskDistribution?.Pending || 0
              )}
              color="bg-pink-500"
              />
              <InfoCard
              label="In Progress Tasks"
              value={addThousandsSeparator(
                dashboardData?.chart?.taskDistribution?.["In-Progress"] || 0
              )}
              color="bg-indigo-500"
              />
              <InfoCard
              label="Completed Tasks"
              value={addThousandsSeparator(
                dashboardData?.chart?.taskDistribution?.Completed || 0
              )}
              color="bg-green-500"
              />
          </div>       
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6 '>

          <div>
            <div className='card'>
              <div className='flex flex items-center justify-between'>
                <h5 className='font-medium'>Task Distribution</h5>
              </div>
              
              <CustomPieChart 
                data={pieChartData}
                colors={COLORS} 
              />
            </div>
          </div>
           <div>
            <div className='card'>
              <div className='flex flex items-center justify-between'>
                <h5 className='font-medium'>Task Priority Levels</h5>
              </div>
              
              <CustomBarChart 
                data={barChartData}
                colors={COLORS} 
              />
            </div>
          </div>
          <div className='md:col-span-2'>
            <div className='card'>
              <div className='flex items-center justify-between'>
                <h5 className='text-lg font-semibold'>Recent Tasks</h5>

                <button className='card-btn' onClick={onSeeMore}>
                  See All <LuArrowRight className='text-base font-semibold'/>
                </button>
              </div>

              <TaskListTable tableData={dashboardData?.recentTasks || []}/>
            </div>
          </div>
        </div>
    </DashboardLayout>
  )
}

export default UserDashboard