import { Route, Routes } from "react-router-dom"
import Todo from "../Pages/Todo"
import EditTask from "../Components/TodoPage/EditTask"
import ViewDetails from "../Components/TodoPage/ViewDetails"

function UserRouter() {
  return (
    <>
    <Routes>
        <Route path="/" element={<Todo/>}></Route>
        <Route path="/edit/:editId" element={<EditTask/>}></Route>
        <Route path="/viewDetails/:detailsId" element={<ViewDetails/>}></Route>
    </Routes>
    </>
  )
}

export default UserRouter