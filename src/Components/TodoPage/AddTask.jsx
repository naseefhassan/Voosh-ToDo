import { useState } from "react";

function AddTask() {
  const [addTask, setAddTask] = useState(false);

  const toggleAddTask = () => {
   setAddTask( (prev) => !prev)
  };
  return (
    <>
      <div className="m-5">
        <button
          onClick={toggleAddTask}
          className="bg-blue-600 px-10 rounded-sm text-white text-sm p-1"
        >
          Add Task
        </button>
        {addTask && (
          <div className="bg-gradient-to-tr  to-blue-700 border-2 w-[300px] py-3 my-2 flex justify-around">
            <input
              type="text"
              placeholder="Enter the task"
              className="p-1 rounded-sm border-2 "
            />
            <button className="bg-blue-600 rounded-sm text-white  px-3 text-sm">
              Add
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default AddTask;
