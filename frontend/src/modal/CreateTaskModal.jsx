
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTaskContext } from '../hooks/contextHook';

const CreateTaskModal = ({ isOpen, setIsModalOpen, selectedTask, mode = 'create',setSelectedTask,setMode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
setMode
  const { addTask, updateTask } = useTaskContext();

  useEffect(() => {
    if (mode === 'edit' && selectedTask && isOpen) {
      setTitle(selectedTask.title || '');
      setDescription(selectedTask.description || '');
      setStatus(selectedTask.status || 'Pending');
    } else if (mode === 'create' && isOpen) {
      setTitle('');
      setDescription('');
      setStatus('Pending');
    }
  }, [selectedTask, mode, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    try {
      if (mode === 'edit') {
        const response = await axios.put(
          `http://localhost:3000/api/tasks/update/${selectedTask._id}`,
          { title, description, status },
          { withCredentials: true }
        );        

        updateTask(response.data.task);
        setSelectedTask(null);
        setTitle('');
        setDescription('');
        setStatus('Pending');
        setMode('create');
        toast.success(response.data.message || 'Task updated successfully!');
      } else {
        const response = await axios.post(
          'http://localhost:3000/api/tasks/create',
          { title, description, status },
          { withCredentials: true }
        );

        addTask(response.data.newtask);
        toast.success(response.data.message || 'Task created successfully!');
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting task:', error);
      toast.error(error.response?.data?.message || 'An error occurred.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50  bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">
          {mode === 'edit' ? 'Edit Task' : 'Create New Task'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            className="w-full border rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Task Description"
            className="w-full border rounded p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <select
            className="w-full border rounded p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="InProgress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedTask(null);
                setTitle('');
                setDescription('');
                setStatus('Pending');

              }}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              {mode === 'edit' ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;

