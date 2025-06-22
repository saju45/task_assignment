
import axios from "axios";
import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { useTaskContext } from "../hooks/contextHook";
import CreateTaskModal from "../modal/CreateTaskModal";

export default function DashboardPage() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedTask, setSelectedTask] = useState(null);
  const {tasks,setTasks}=useTaskContext([]);


  const handleEdit = (task) => {
    setModalMode('edit');
    setSelectedTask(task);
    setIsModalOpen(true);
  };

 

      useEffect(() => {
        const fetchTasks = async () => {
          try {
            const response = await axios.get("http://localhost:3000/api/tasks/fetch", {
              withCredentials: true,
            });
             setTasks(response.data.tasks);
          } catch (error) {
            console.error("Error fetching tasks:", error);
          }
        }
        fetchTasks();
      }, []);
      
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-10">

      <div className="bg-gradient-to-r from-gray-900 to-green-900 text-white pt-4 pb-8 px-4 rounded-2xl shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold">🌀 Tasko</h1>
            <nav className="hidden md:flex space-x-6 text-green-300 font-semibold">
              <a href="#" className="hover:text-white">Task List</a>
              <a href="#" className="hover:text-white">Spin</a>
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <img src="https://via.placeholder.com/32" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
            <span className="font-medium">Thomas M.</span>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg text-green-300">Hi Thomas</h2>
          <h1 className="text-3xl font-bold mt-1">Welcome to Dashboard</h1>
        </div>
      
      </div>

      <div className="bg-white mt-[-60px] p-4 rounded-xl shadow  h-screen">

    <div className="bg-white mt-6 p-4  flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-lg font-semibold">All Task List</h2>
        <div className="flex flex-wrap gap-4">
          <select className="border rounded-lg p-2 text-sm">
            <option>Select Task Category</option>
          </select>
          <select className="border rounded-lg p-2 text-sm">
            <option>All Task</option>
          </select>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold" onClick={() => setIsModalOpen(true)}>
            ➕ Add New Task
          </button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {tasks?.map((task,index) => (
          <TaskCard key={index} task={task} onHandleEdit={handleEdit} />
        ))}
      </div>

       <CreateTaskModal
        isOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen}
        mode={modalMode}
        setMode={setModalMode}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}        
          />
      </div>
   
    </div>
  );
}

