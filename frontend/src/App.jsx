import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate
} from "react-router-dom";
import Dashboard from './pages/Admin/Dashboard';
import ManageTasks from './pages/Admin/ManageTasks';
import ManageUsers from './pages/Admin/ManageUsers';
import CreateTask from './pages/Admin/CreateTask';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/SignUp';
import PrivateRoute from './routes/PrivateRoute';
import UserDashboard from './pages/User/UserDashboard';
import MyTasks from './pages/User/MyTasks';
import ViewTaskDetails from './pages/User/ViewTaskDetails';
import UserProvider, { UserContext } from './context/userContext';
import { Toaster } from 'react-hot-toast';
import Settings from './pages/Settings';

const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]}/>} >
            <Route path="/admin/dashboard" element={<Dashboard/>} />
            <Route path="/admin/tasks" element={<ManageTasks/>}/>
            <Route path="/admin/create-task" element={<CreateTask/>}/>
            <Route path="/admin/users" element={<ManageUsers/>}/>

          </Route>

          {/* User Routes */}
          <Route element={<PrivateRoute allowedRoles={["member"]}/>} >
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/tasks" element={<MyTasks />} />
            <Route path="/user/task-details/:id" element={<ViewTaskDetails />} />

          </Route>
          {/* Shared (admin+user) */}
          <Route element={<PrivateRoute allowedRoles={["admin", "member"]} />}>
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </div>
    <Toaster
      toastOptions={{
        className:"",
        style: {
          fontSize:"13px",
        },
      }}
      />
    </UserProvider>
  )
}



export default App

// const Root = () => {
//   const { user, loading } = useContext(UserContext);

//   if (loading) return null;

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (user.role === "admin") {
//     return <Navigate to="/admin/dashboard" replace />;
//   }

//   return <Navigate to="/user/dashboard" replace />;
// };
