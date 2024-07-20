import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../Api/axios";

function ViewDetails() {
  const [task, setTask] = useState(null);
  const { detailsId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/user/value/${detailsId}`);
        if (response.data && response.data.task) {
          setTask(response.data.task);
        } else {
          console.error("Unexpected API response structure");
        }
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };
    fetchData();
  }, [detailsId]);

  return (
    <div className="bg-gray-600 h-screen flex justify-center items-center">
      <div className="bg-white h-[80%] w-[30%] rounded-sm p-3 flex flex-col justify-between">
        {task && (
          <div>
            <h1 className="font-bold my-1">Task Details</h1>
            <h1 className="font-semibold my-1">Title: {task.task}</h1>
            <h1 className="text-[12px] my-1">Description: {task.description}</h1>
            <h1 className="text-[10px] my-1">Created at: {new Date(task.createdAt).toLocaleString()}</h1>
          </div>
        )}
        <div className="flex justify-end text-sm mt-5">
          <Link to="/">
            <button className="bg-gray-400 p-1 px-2 rounded-sm">Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;
