import { Route, Routes } from "react-router-dom"
import Todo from "../Pages/Todo"
import EditTask from "../Components/TodoPage/EditTask"

function UserRouter() {
  return (
    <>
    <Routes>
        <Route path="/" element={<Todo/>}></Route>
        <Route path="/edit/:editId" element={<EditTask/>}></Route>
    </Routes>
    </>
  )
}

export default UserRouter