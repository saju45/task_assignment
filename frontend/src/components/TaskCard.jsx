import axios from "axios";
import { toast } from "react-hot-toast";
import { useTaskContext } from "../hooks/contextHook";
import StatusBadge from "./StatusBadge";

const TaskCard = ({ task:{_id,title,description,date,status},onHandleEdit }) =>  {
    
    const { deleteTask } = useTaskContext();
     const handleDelete=async(taskId)=>{
        try {
          const response = await axios.delete(`http://localhost:3000/api/tasks/delete/${taskId}`, {
            withCredentials: true,
          });
          deleteTask(taskId);
          console.log("response ",response);
         toast.success(response.data.message || 'Task deleted successfully!');
        } catch (error) {
          console.error("Error deleting task:", error);
        }
      }

return (

  <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
          🎨
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <button className="text-gray-400 hover:text-red-500 text-xl" onClick={()=>onHandleEdit({_id,title,description,date,status})}>✎</button>

        <button className="text-gray-400 hover:text-red-500 text-xl" onClick={()=>handleDelete(_id)}>🗑</button>
    </div>
    <p className="text-sm text-gray-500 mt-2">{description}</p>
    <div className="flex justify-between items-center mt-4">
      <span className="text-sm text-gray-400">{date}</span>
      <StatusBadge status={status} />
    </div>
  </div>
)
}
export default TaskCard;