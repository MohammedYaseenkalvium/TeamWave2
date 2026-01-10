import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { PRIORITY_DATA } from '../../utils/data'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import toast from 'react-hot-toast'
import {useLocation,useNavigate} from 'react-router-dom'
import moment from 'moment'
import {LuTrash2} from 'react-icons/lu'
import SelectDropdown from '../../components/Input/SelectDropdown'
import SelectUsers from '../../components/Input/SelectUsers'
import TodoListInput from '../../components/Input/todoListInput'
import AddAttachmentsInput from '../../components/Input/AddAttachmentsInput'
import Modal from '../../components/Modal'
import DeleteAlert from '../../components/DeleteAlert'

const CreateTask = () => {

  const location = useLocation();
  const {taskId} = location.state || {};
  const navigate = useNavigate();

  const [taskData,setTaskData] = useState({
    title:"",
    description:"",
    priority:"Low",
    dueDate:null,
    assignedTo:[],
    todoChecklist:[],
    attachments:[]
  });

  const [currentTask,setCurrentTask] = useState(null);

  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);

  const [openDeleteAlert,setOpenDeleteAlert] = useState(false);

  const handleValueChange=(key,value)=>{
    setTaskData((prevData)=>({
      ...prevData,
      [key]:value
    }));
  }

  const clearData=()=>{
    //reset form 
    setTaskData({
      title:"",
      description:"",
      priority:"Low",
      dueDate:null,
      assignedTo:[],
      todoChecklist:[],
      attachments:[]
    });
    setError("");
  }

  // Create Task
  const createTask = async () => {
  setLoading(true);
  try {
    const todolist = taskData.todoChecklist.map((item) => ({
      text: item.text ?? item,
      completed: item.completed ?? false,
    }));

    await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
      ...taskData,
      dueDate: moment(taskData.dueDate).format("YYYY-MM-DD"),
      todoChecklist: todolist,
    });

    toast.success("Task created successfully");
    clearData();
    navigate("/admin/tasks"); 
  } catch (error) {
    console.error("Error creating task:", error.response?.data || error);
    toast.error("Failed to create task. Please try again.");
  } finally {
    setLoading(false);
  }
};
  //Update Task
  const updateTask = async () => {
  setLoading(true);
  try {
    const todolist = taskData.todoChecklist.map((item) => ({
      text: item.text ?? item,
      completed: item.completed ?? false,
    }));

    await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), {
      ...taskData,
      dueDate: new Date(taskData.dueDate).toISOString(),
      todoChecklist: todolist,
    });

    toast.success("Task updated successfully");
    navigate("/admin/tasks");
  } catch (error) {
    console.error("Error updating task:", error.response?.data || error);
    toast.error("Failed to update task");
  } finally {
    setLoading(false);
  }
};
  
  const handleSubmit =async()=>{
    setError(null)

    // Input Validations
    if(!taskData.title.trim()){
      setError("Task Title is required");
      return;
    }
    if(!taskData.description.trim()){
      setError("Task Description is required");
      return;
    }
    if(!taskData.dueDate){
      setError("Due Date is required");
      return;
    }
    if(taskData.assignedTo.length===0){
      setError("Please assign the task to at least one user");
      return;
    }
    if(taskData.todoChecklist.length===0){
      setError("Please add at least one TODO item");
      return;
    }
    if(taskId){
       updateTask();
       return;
    }

    createTask();
  };
  
  //get Task Details by ID
  const getTaskDetailsById = async()=>{
    try{
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
      );

      if (response.data){
        const taskInfo = response.data;
        setCurrentTask(taskInfo);

        setTaskData((prevState)=>({
          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
            :null,
          assignedTo: taskInfo?.assignedTo?.map((item)=> item?._id) || [],
          todoChecklist: taskInfo?.todoChecklist || [],
          attachments: taskInfo?.attachments||[]
        }));
      }
    }catch (error){
      console.error("Error fetching users:",error);
    }  
  };
  
  //Delete Task
  const deleteTask = async()=>{
    try{
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));

      setOpenDeleteAlert(false);
      toast.success("Expense details deleted successfully");
      navigate('/admin/tasks')
    }catch(error){
      console.error("Error deleting expense:",error.response?.data?.message || error.message

      );
    }
  };

  useEffect(()=>{
    if(taskId){
      getTaskDetailsById(taskId)
    }

    return ()=>{};
  },[taskId])

  return (
    <DashboardLayout activeMenu="Create-task">
      <div className='mt-4'>
        <div className='flex justify-center mt-6'>
          <div className='form-card w-full max-w-3xl pb-10'>
            <div className='flex items-center justify-between '>
              <h2 className='text-xl md:text-2xl font-semibold'>
                {taskId?"Update Task":"Create New Task"}
              </h2>

              {taskId && (
                <button
                  className='flex items-center gap-2 text-[13px] font-medium text-red-400 rounded px-2 py-1 border border-rose-500/20 hover:bg-rose-600 bg-red-500/20'
                  onClick={()=>setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className='text-base'/>
                  <span>Delete Task</span>
                </button>
              )}
            </div>

            <div className='mt-4'>
              <label className='text-xs font-medium text-slate-600'>
                Task Title
              </label>

              <input 
                placeholder="Create App UI"
                className='form-input mt-1'
                value={taskData.title}
                onChange={({target})=>handleValueChange("title",target.value)}
                />
            </div>

          <div className='mt-4'>
            <label className='text-xs font-medium text-slate-600'>
              Description
            </label>

            <textarea
              placeholder="Task Description"
              className='form-input mt-1'
              value={taskData.description}
              onChange={({target})=>handleValueChange("description",target.value)}
            />
          </div> 

          <div className='grid grid-cols-12 gap-4 mt-2'>
            <div className='col-span-6 md:col-span-4'>
              <label className='text-xs font-medium text-slate-600'>
                Priority
              </label>
              <SelectDropdown
                options={PRIORITY_DATA}
                value={taskData.priority}
                onChange={(value)=>handleValueChange("priority",value)}
                placeholder="Select Priority"
              />
            </div>

            <div className="col-span-6  md:col-span-4">
              <label className='text-xs font-medium text-slate-600'>
                Due Date
              </label>

              <input 
                placeholder='Create App UI'
                className='form-input'
                value={taskData.dueDate}
                onChange={({target})=>handleValueChange("dueDate",target.value)}
                type="date"
              />

            </div>

            <div className='col-span-12 md:col-span-3'>
              <label className='text-xs font-medium text-slate-600'>
                Assigned To
              </label>

              <SelectUsers
                selectedUsers={taskData.assignedTo}
                setSelectedUsers={(users)=>handleValueChange("assignedTo",users)}
              />

            </div>      

            <div className="col-span-12 mt-3">
              <label className='text-xs font-medium text-slate-600'>
                TODO Checklist
              </label>
              <TodoListInput 
                todoChecklist={taskData.todoChecklist}
                setTodoChecklist={(value)=>handleValueChange("todoChecklist",value)}
              />
            </div>

            <div className='col-span-12 mt-3'>
              <label className='text-xs font-medium text-slate-600'>
                Add Attachments
              </label>
              <AddAttachmentsInput
                attachments ={taskData?.attachments}
                setAttachments={(value)=>
                  handleValueChange("attachments",value)
                }
                />

            </div>

            

            

          </div>
          {error && (
              <p className='text-xs text-rose-500 mt-5'>{error}</p>
            )}
          <div className='flex items-center justify-end mt-7'>
              <button
                className='w-full flex items-center justify-center 
             text-sm font-medium 
             text-indigo-400 bg-indigo-500/20 
             border border-indigo-500/30 
             rounded-lg px-4 py-3 
             hover:bg-indigo-500/30 transition'
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId?"UPDATE TASK":"CREATE TASK"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={openDeleteAlert}
        onClose={()=>setOpenDeleteAlert(false)}
        title="Delete Task"
      >
        <DeleteAlert
          content="Are you sure you want to delete this task?"
          onDelete={()=>deleteTask()}
        />
      </Modal>
    </DashboardLayout>
  )
}

export default CreateTask
