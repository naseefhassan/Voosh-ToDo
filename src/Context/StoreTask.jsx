import React, { createContext, useState } from "react";

export const TaskContext = createContext();

export const StoreTaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProcess: [],
    done: []
  });

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
