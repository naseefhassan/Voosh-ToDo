import { useEffect, useState } from "react";
import axiosInstance from "../../Api/axios";
import { Link, useParams, useNavigate } from "react-router-dom";

function EditTask() {
  const { editId } = useParams();
  const [task, setTask] = useState({ task: "", description: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/user/editvalue/${editId}`);
        setTask(response.data.editValue);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
    setError("");
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (task.task !== "" && task.description !== "") {
      try {
        const response = await axiosInstance.put(
          `/user/editTask/${editId}`,
          task
        );
        console.log(response.data.editedTask);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    } else {
      setError("Please fill in all fields");
    }
  };

  return (
    <div className="bg-gray-600 h-screen flex justify-center items-center">
      <div className="bg-white h-[80%] w-[30%] rounded-sm p-3  ">
        <form className="h-full flex flex-col justify-between" onSubmit={handleEdit}>
          <div>
            <h1 className="font-bold">Edit Task</h1>
            <div>
              <h1 className="text-sm mt-5">Title</h1>
              <input
                className="border-b-2 w-full"
                type="text"
                name="task"
                value={task.task}
                onChange={handleChange}
              />
            </div>
            <div>
              <h1 className="text-sm mt-5">Description</h1>
              <input
                className="border-b-2 w-full"
                type="text"
                name="description"
                value={task.description}
                onChange={handleChange}
              />
            </div>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="flex justify-end gap-3 text-sm mt-5">
          <button type="submit" className="bg-gray-200 p-1 px-2 rounded-sm">
            Save
          </button>
          <Link to={"/"}>
            <button className="bg-gray-400 p-1 px-2 rounded-sm">Cancel</button>
          </Link>
        </div>
        </form>
      </div>
    </div>
  );
}

export default EditTask;
