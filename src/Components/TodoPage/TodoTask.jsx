import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../Api/axios";
import { TaskContext } from "../../Context/StoreTask";
import { DragDropContext } from "../../Context/DragDropContext";
import { Link } from "react-router-dom";

function TodoTask() {
  const { tasks, setTasks } = useContext(TaskContext);
  const { draggedItem, setDraggedItem } = useContext(DragDropContext);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/user/getTask");
        const filteredTasks = response.data.tasks
          .filter((task) => task.state === "task")
          .sort((a, b) => a.order - b.order);
        setTasks((prev) => ({ ...prev, todo: filteredTasks }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [setTasks, setDraggedItem, draggedItem]);

  const handleDelete = async (taskId) => {
    try {
      await axiosInstance.delete(`/user/deleteTask/${taskId}`);
      setTasks((prev) => ({
        ...prev,
        todo: prev.todo.filter((task) => task._id !== taskId),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
    setDraggedItemIndex(index);
    setDraggedItem(tasks.todo[index]);
  };

 

  const handleDrop = async (e) => {
    e.preventDefault();
    if (draggedItem) {
      const updatedTasks = tasks.todo.filter((t) => t._id !== draggedItem._id);
      setTasks((prev) => ({
        ...prev,
        todo: [...updatedTasks, { ...draggedItem, state: "task" }],
      }));

      try {
        await axiosInstance.post("/user/updateTaskState", { ...draggedItem, state: "task" });
        setDraggedItem(null);
      } catch (error) {
        console.error("Failed to update task state:", error);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className="text-white">
        <h1 className="font-semibold mx-1 bg-blue-600 p-[2px] px-2 rounded-sm">TODO</h1>
        <div className="max-h-[300px] overflow-y-scroll mt-3 no-scrollbar">
          {tasks.todo.length > 0 ? (
            tasks.todo.map((item, index) => (
              <div
                key={index}
                className={`text-black bg-blue-200 rounded-md mx-1 p-2 my-2 ${
                  draggedItemIndex === index ? "bg-blue-100" : ""
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
              >
                <div>
                  <h1 className="font-bold">{item.task}</h1>
                  <h1 className="font-semibold">{item.description}</h1>
                </div>
                <h1 className="text-[12px] mt-5">
                  Created at: {new Date(item.createdAt).toLocaleString()}
                </h1>
                <div className="text-sm flex justify-end gap-3 text-white mt-5">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600 p-1 px-2 rounded-md"
                  >
                    Delete
                  </button>
                  <Link to={`/edit/${item._id}`}>
                    <button className="bg-blue-400 p-1 px-2 rounded-md">
                      Edit
                    </button>
                  </Link>
                  <Link to={`/viewDetails/${item._id}`}>
                    <button className="bg-blue-700 p-1 px-2 rounded-md">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No tasks available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoTask;
