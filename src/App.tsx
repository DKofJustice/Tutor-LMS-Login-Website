import Header from './Components/Header/Header'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Courses from './Pages/Courses/Courses'
import Login from './Pages/Login/Login'
import Logo from './Components/Logo/Logo'
import Register from './Pages/Register/Register'

function App() {

  return (
    <div className='w-full overflow-x-hidden'>
      <div className='bg-primary-blue w-full h-full'>
        <Routes>
          <Route path='/' element={<Header/>}>
            <Route index element={<Courses/>} />
          </Route>
          <Route element={<Logo/>}>
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
