import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../Api/axios";
import { TaskContext } from "../../Context/StoreTask";
import { Link } from "react-router-dom";

function TodoTask() {
  const { task, setTask } = useContext(TaskContext);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/user/getTask");
        setTask(response.data.tasks.sort((a, b) => a.order - b.order));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [setTask]);

  const handleDelete = async (taskId) => {
    try {
      await axiosInstance.delete(`/user/deleteTask/${taskId}`);
      setTask((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
    setDraggedItemIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, index) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData("index"), 10);
    if (draggedIndex !== null && draggedIndex !== index) {
      const updatedTasks = [...task];
      const [removed] = updatedTasks.splice(draggedIndex, 1);
      updatedTasks.splice(index, 0, removed);
      setTask(updatedTasks);

      try {
        await axiosInstance.post('/updateTaskOrder', {
          orderedTasks: updatedTasks.map((item, idx) => ({
            _id: item._id,
            order: idx,
          })),
        });
      } catch (error) {
        console.error("Failed to update task order:", error);
      }
    }
    setDraggedItemIndex(null);
  };

  return (
    <div>
      <div className="text-white">
        <h1 className="font-semibold mx-1 bg-blue-600 p-[2px] px-2 rounded-sm">TODO</h1>
        <div className="max-h-[300px] overflow-y-scroll mt-3 no-scrollbar">
          {task && task.length > 0 ? (
            task.map((item, index) => (
              <div
                key={item._id}
                className={`text-black bg-blue-200 rounded-md mx-1 p-2 my-2 ${
                  draggedItemIndex === index ? "bg-blue-100" : ""
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                <div>
                  <h1 className="font-bold">{item.task}</h1>
                  <h1 className="font-semibold">{item.description}</h1>
                </div>
                <h1 className="text-[12px] mt-5">Created at: {new Date(item.createdAt).toLocaleString()}</h1>
                <div className="text-sm flex justify-end gap-3 text-white mt-5">
                  <button onClick={() => handleDelete(item._id)} className="bg-red-600 p-1 px-2 rounded-md">
                    Delete
                  </button>
                  <Link to={`/edit/${item._id}`}>
                    <button className="bg-blue-400 p-1 px-2 rounded-md">Edit</button>
                  </Link>
                  <Link to={`/viewDetails/${item._id}`}>
                    <button className="bg-blue-700 p-1 px-2 rounded-md">View Details</button>
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
