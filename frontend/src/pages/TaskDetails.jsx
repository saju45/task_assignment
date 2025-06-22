import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TaskDetailsPage() {
  const [status, setStatus] = useState("InProgress");
  const [task, setTask] = useState({
    text: "",
    description: "",
    date:"",
    status: "",
  });
const {id}=useParams();

useEffect(()=>{

  const fetchTaskDetails = async () => {
   
    try {
      const response = await axios.get(`http://localhost:3000/api/todos/fetch/${id}`,{
        withCredentials: true,
      });
      setTask(response.data.todo);
      
      setStatus(response.data.todo.status);
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  }

  fetchTaskDetails();
},[]);
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-10">
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-xl font-semibold">Task Details</h1>
          <div className="flex gap-3">
            <button className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-200">
              ✏️ Edit Task
            </button>
            <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-200">
              ← Back
            </button>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-green-100 text-green-600 p-3 rounded-full text-xl">🎨</div>
          <div>
            <h2 className="text-2xl font-bold mb-2">{task.text}</h2>
            <p className="text-gray-600 text-sm">
              {task.description}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg">📅</span>
            <div>
              <p className="text-sm text-gray-500">End Date</p>
              <p className="text-md font-medium">Friday, April 19 – 2024</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">Status:</p>
            <span className="text-yellow-500 font-semibold">• {task.status}</span>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">Change Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full md:w-1/3 p-2 border rounded-lg"
          >
            <option value="Pending">Pending</option>
            <option value="InProgress">InProgress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="flex justify-between flex-col md:flex-row gap-4 mt-8">
          <button className="bg-red-100 text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-200">
            🗑 Delete Task
          </button>
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600">
            ✅ Submit
          </button>
        </div>
      </div>
    </div>
  );
}
