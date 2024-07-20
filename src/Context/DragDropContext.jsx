import React, { createContext, useState } from 'react';

export const DragDropContext = createContext();

export const DragDropProvider = ({ children }) => {
  const [draggedItem, setDraggedItem] = useState(null);

  return (
    <DragDropContext.Provider value={{ draggedItem, setDraggedItem }}>
      {children}
    </DragDropContext.Provider>
  );
};
