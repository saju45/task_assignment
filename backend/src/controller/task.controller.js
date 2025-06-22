import Task from "../models/taskModel.js";
export const createTask = async (req, res) => {
   
  console.log("Creating task with body:", req.body);
  
    if (!req.body.title) {
        return res.status(400).json({ message: "title is required" });
    }
    if (req.body.status && !["Pending", "InProgress", "Done"].includes(req.body.status)) {
          return res.status(400).json({ message: "Invalid status value" });
       }  

  const task = new Task({
    title: req.body.title,
    description: req.body.description || "",
    date: req.body.date || new Date(),
    status: req.body.status || "Pending",
    userId: req.user._id,
  });

  

  try {
    const newtask = await task.save();
      console.log("newtask", newtask);

    res.status(201).json({ message: "task created successfully", newtask });
  } catch (error) {
    res.status(400).json({ message: "Error in task creation" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }
    res.status(201).json({ message: "task fetch successfully", tasks });
  } catch (error) {
    res.status(500).json({ message: "Error in fetching tasks" });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "task not found" });
    }

    res.status(200).json({ message: "task fetched successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error in fetching task" });
  }
}

export const updateTask = async (req, res) => {
 
  try {

       if (!req.body.text && !req.body.status) {
        return res.status(400).json({ message: "No fields to update" });
    }

    const task = await Task.findByIdAndUpdate(req.params.id, req.body,{
      new: true,
      runValidators: true,
    });

    res.status(201).json({ message: "task update successfully", task });
  } catch (error) {
    res.status(400).json({ message: "Error in task creation" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "task not found" });
    }

    res.status(201).json({ message: "task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in deleting task" });
  }
};