import Header from "../Components/Header/Header";
import AddTask from "../Components/TodoPage/AddTask";
import Done from "../Components/TodoPage/Done";
import InProcess from "../Components/TodoPage/InProcess";
import Search from "../Components/TodoPage/Search";
import TodoTask from "../Components/TodoPage/TodoTask";
import { SearchProvider } from "../Context/SearchContext";

function Todo() {
  return (
    <>
      <Header />
      <AddTask />
      <SearchProvider>
        <Search />
        <div className="sm:flex justify-evenly gap-4 mx-3 ">
          <div className="sm:w-1/3 w-full p-2 rounded-md m-2 border-2 max-h-[250px] sm:max-h-[350px] overflow-y-scroll no-scrollbar">
            <TodoTask />
          </div>
          <div className="sm:w-1/3 w-full p-2 rounded-md m-2 border-2 max-h-[250px] sm:max-h-[350px] overflow-y-scroll no-scrollbar">
            <InProcess />
          </div>
          <div className="sm:w-1/3 w-full p-2 rounded-md m-2 border-2 max-h-[250px] sm:max-h-[350px] overflow-y-scroll no-scrollbar">
            <Done />
          </div>
        </div>
      </SearchProvider>
    </>
  );
}

export default Todo;
