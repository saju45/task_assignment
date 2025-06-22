import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/SignUp";
import TaskDetailsPage from "./pages/TaskDetails";
const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
      <Route path="/task/:id" element={<TaskDetailsPage/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
    </Routes>
    </>
  )
}

export default App