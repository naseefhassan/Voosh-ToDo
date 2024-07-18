import { Route, Routes } from "react-router-dom"
import Todo from "../Pages/Todo"

function UserRouter() {
  return (
    <>
    <Routes>
        <Route path="/" element={<Todo/>}></Route>
    </Routes>
    </>
  )
}

export default UserRouter