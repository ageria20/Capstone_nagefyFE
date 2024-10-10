import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Login from './components/Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register/Register'
import ProfileSection from './components/ProfileSection/ProfileSection'
import Agenda from './components/Calendar/Agenda'
import Rubrica from './components/Navbar/Rubrica'
import 'react-toastify/dist/ReactToastify.css';
import Treatments from './components/Treatments/Treatments'



function App() {


  return (
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<Login/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/profile' element={<ProfileSection/>}/>
     <Route path='/agenda' element={<Agenda/>}/>
     <Route path='/rubrica' element={<Rubrica/>}/>
     <Route path='/trattamenti' element={<Treatments/>}/>
    
     </Routes>
     
     </BrowserRouter>
    
  )
}

export default App
