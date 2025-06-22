
import { useState } from "react";
import { TaskContext } from "./taskContext";
   
export const TaskProvider = ({ children }) => {
            const [tasks, setTasks] = useState([]);
            const [selectedCategory, setSelectedCategory] = useState("All Task");
            const [selectedStatus, setSelectedStatus] = useState("All Task");
            const [searchQuery, setSearchQuery] = useState("");

            const handleCategoryChange = (e) => {
                setSelectedCategory(e.target.value);
            }
            const handleStatusChange = (e) => {
                setSelectedStatus(e.target.value);
            }
            const handleSearchChange = (e) => {
                setSearchQuery(e.target.value);
            }
            const addTask = (task) => {
                setTasks((prevTasks) => [...prevTasks, task]);
            };
            const updateTask = (updatedTask) => {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task._id === updatedTask._id ? updatedTask : task
                    )
                );
            };
            const deleteTask = (taskId) => {
                setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
            };
            return (
                <TaskContext.Provider
                    value={{
                        tasks,
                        setTasks,
                        selectedCategory,
                        setSelectedCategory,
                        selectedStatus,
                        setSelectedStatus,
                        searchQuery,
                        setSearchQuery,
                        handleCategoryChange,
                        handleStatusChange,
                        handleSearchChange,
                        addTask,
                        updateTask,
                        deleteTask
                    }}
                >
                    {children}
                </TaskContext.Provider>
            );
                  
        }