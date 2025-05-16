import './App.css'
import {Routes, Route} from 'react-router-dom'
import Login from './component/Login'
import Dashboard from './component/Dashboard'
import Register from './component/Register'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="*" element={<div> 404 - Not Found</div>} />
      </Routes>
    </>
  )
}

export default App
