import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../Api/axios";

function ViewDetails() {
  const { detailsId } = useParams();
  const [task, setTask] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/user/value/${detailsId}`);
        setTask(response.data.editValue);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [detailsId]);

  console.log(task);
  return (
    <div className="bg-gray-600 h-screen flex justify-center items-center">
      <div className="bg-white h-[80%] w-[30%] rounded-sm p-3 flex flex-col justify-between">
        <div>
          <h1 className="font-bold my-1">Task Details</h1>
          <h1 className="font-semibold my-1">Title :{task.task}</h1>
          <h1 className="text-[12px] my-1">Description:{task.description}</h1>
          <h1 className="text-[10px] my-1">created at :{task.createdAt}</h1>
        </div>
        <div className="flex justify-end  text-sm mt-5">
          <Link to={"/"}>
            <button className="bg-gray-400 p-1 px-2 rounded-sm">Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;
