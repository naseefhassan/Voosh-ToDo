import { Route, Routes } from 'react-router-dom'
import UserRouter from './Router/UserRouter'
import CommonRouter from './Router/CommonRouter'

function App() {
  return (
    <>
    <Routes>
      <Route path='/auth/*' element={<CommonRouter/>}></Route>
      <Route path='/*' element={<UserRouter/>}></Route>
    </Routes>
    </>
  )
}

export default App