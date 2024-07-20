import { useContext, useEffect } from "react";
import { TaskContext } from "../../Context/StoreTask";
import axiosInstance from "../../Api/axios";

function TodoTask() {
  const { task, setTask } = useContext(TaskContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/user/getTask");
        setTask(response.data.Task);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [setTask]);

  const reversedTasks = [...task].reverse();

  const handleDelete = async (taskId) => {
    console.log(taskId);
    try {
      await axiosInstance.delete(`/user/deleteTask/${taskId}`);
      setTask((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <div className="text-white">
          <h1 className="font-semibold mx-1 bg-blue-600 p-[2px] px-2 rounded-sm">
            TODO
          </h1>
          <div className="max-h-[300px] overflow-y-scroll mt-3 no-scrollbar">
            {task && task.length > 0 ? (
              reversedTasks.map((item) => (
                <div key={item._id} className="text-black bg-blue-200 rounded-md mx-1 p-2 my-2">
                  <div>
                    <h1 className="font-bold">{item.task}</h1>
                    <h1 className="font-semibold">{item.description}</h1>
                  </div>
                  <h1 className="text-[12px] mt-5">Created at: {new Date(item.createdAt).toLocaleString()}</h1>
                  <div className="text-sm flex justify-end gap-3 text-white mt-5">
                    <button onClick={() => handleDelete(item._id)} className="bg-red-600 p-1 px-2 rounded-md">
                      Delete
                    </button>
                    {/* <Link to={`/edit/${item._id}`}> */}
                      <button className="bg-blue-400 p-1 px-2 rounded-md">Edit</button>
                    {/* </Link> */}
                    <button className="bg-blue-700 p-1 px-2 rounded-md">View Details</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No tasks available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoTask;
