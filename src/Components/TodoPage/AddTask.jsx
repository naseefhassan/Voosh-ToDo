import { useContext, useState } from "react";
import axiosInstance from "../../Api/axios";
import { TaskContext } from "../../Context/StoreTask";

function AddTask() {
  const [addTask, setAddTask] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const { task, setTask } = useContext(TaskContext);

  const toggleAddTask = () => {
    setAddTask((prev) => !prev);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (taskInput !== "" && description !== "") {
      try {
        const createdAt = new Date().toISOString();
        const newTask = { task: taskInput, description, createdAt, order: 0 };
        await axiosInstance.post("/user/task", newTask);
        setTask((prevTasks) => [...prevTasks, newTask]);
        setDescription("");
        setAddTask(false);
        setTaskInput('');
      } catch (error) {
        console.error(error);
      }
    } else {
      setError("Please fill in the inputs");
    }
  };

  return (
    <div className="m-5">
      <button
        onClick={toggleAddTask}
        className="bg-blue-600 px-10 rounded-sm text-white text-sm p-1"
      >
        Add Task
      </button>
      {addTask && (
        <div className="bg-gradient-to-tr to-blue-700 border-2 sm:w-[300px] py-2 p-1 my-2 flex-1 justify-around">
          <form onSubmit={handleAdd}>
            <input
              type="text"
              placeholder="Enter the task"
              className="px-2 rounded-sm border-2 w-full my-2"
              value={taskInput}
              onChange={(e) => {
                setTaskInput(e.target.value);
                setError("");
              }}
            />
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              className="px-2 rounded-sm border-2 w-full"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setError("");
              }}
            />
            <p className="text-[11px] text-red-600 text-center">{error}</p>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 cursor-pointer rounded-sm text-white my-2 py-[2px] px-3 text-sm"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddTask;
