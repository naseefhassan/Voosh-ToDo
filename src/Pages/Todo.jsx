import Header from "../Components/Header/Header";
import AddTask from "../Components/TodoPage/AddTask";
import Done from "../Components/TodoPage/Done";
import InProcess from "../Components/TodoPage/InProcess";
import Search from "../Components/TodoPage/Search";
import TodoTask from "../Components/TodoPage/TodoTask";

function Todo() {
  return (
    <>
      <Header />
      <AddTask />
      <Search />
      <div className="sm:flex justify-evenly gap-4 mx-3">
        <div className="sm:w-1/3 w-full p-2 rounded-md m-2 border-2">
          <TodoTask />
        </div>
        <div className="sm:w-1/3 w-full p-2 rounded-md m-2 border-2">
          <InProcess />
        </div>
        <div className="sm:w-1/3 w-full p-2 rounded-md m-2 border-2">
          <Done />
        </div>
      </div>
    </>
  );
}

export default Todo;
