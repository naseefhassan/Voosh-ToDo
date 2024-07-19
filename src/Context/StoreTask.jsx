import { createContext, useState } from "react";

const TaskContext = createContext();

const StoreTask = ({ children }) => {
  const [task, setTask] = useState([]);

  return (
    <TaskContext.Provider value={{ task, setTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, StoreTask };
