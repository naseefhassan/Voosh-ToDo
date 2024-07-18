import { Route, Routes } from "react-router-dom"
import Login from "../Components/Account/Login"
import Signup from "../Components/Account/Signup"

function CommonRouter() {
  return (
    <>
    <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
    </Routes>
    </>
  )
}

export default CommonRouter