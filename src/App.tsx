import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Login from './components/Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register/Register'
import ProfileSection from './components/ProfileSection/ProfileSection'


function App() {


  return (
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<Login/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/profile' element={<ProfileSection/>}/>
     </Routes>
     </BrowserRouter>
    
  )
}

export default App
