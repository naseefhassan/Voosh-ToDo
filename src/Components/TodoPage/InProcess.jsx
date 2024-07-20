import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../Api/axios";
import { TaskContext } from "../../Context/StoreTask";
import { DragDropContext } from "../../Context/DragDropContext";
import { SearchContext } from "../../Context/SearchContext"; 
import { Link } from "react-router-dom";

function InProcess() {
  const { tasks, setTasks } = useContext(TaskContext);
  const { draggedItem, setDraggedItem } = useContext(DragDropContext);
  const { searchTerm } = useContext(SearchContext); 
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/user/getTask");
        const filteredTasks = response.data.tasks
          .filter((task) => task.state === "in-process")
          .sort((a, b) => a.order - b.order);
        setTasks((prev) => ({ ...prev, inProcess: filteredTasks }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [setTasks, setDraggedItem, draggedItem]);

  const filteredTasks = tasks.inProcess.filter((task) =>
    task.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (taskId) => {
    try {
      await axiosInstance.delete(`/user/deleteTask/${taskId}`);
      setTasks((prev) => ({
        ...prev,
        inProcess: prev.inProcess.filter((task) => task._id !== taskId),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
    setDraggedItemIndex(index);
    setDraggedItem(tasks.inProcess[index]);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    if (draggedItem) {
      const updatedTasks = tasks.inProcess.filter((t) => t._id !== draggedItem._id);
      setTasks((prev) => ({
        ...prev,
        inProcess: [{ ...draggedItem, state: "in-process" }, ...updatedTasks],
      }));

      try {
        await axiosInstance.post("/user/updateTaskState", {
          ...draggedItem,
          state: "in-process",
        });
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
        <h1 className="font-semibold mx-1 bg-blue-600 p-[2px] px-2 rounded-sm">
          IN PROCESS
        </h1>
        <div className="max-h-[300px] overflow-y-scroll mt-3 no-scrollbar">
          {filteredTasks.length > 0 ? (
            filteredTasks.slice().map((item, index) => (
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
            <p className="text-sm text-black text-center">No tasks available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default InProcess;
