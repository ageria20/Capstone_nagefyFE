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
import Staff from './components/Staff/Staff'
import Orari from './components/Orari/Orari'
import Cash from './components/Cash/Cash'
import ResetPassword from './components/Register/ResetPassword'
import ResetPasswordStaff from './components/Register/ResetPasswordStaff'
import LoginStaff from './components/Login/LoginStaff'
import LoginClient from './components/Login/LoginClient'
import UserPage from './components/UserSection/UserPage'
import EditPage from './components/UserSection/EditPage'
import Report from './components/Report/Report'
import Verification from './components/Verification/Verification'



function App() {


  return (
    <BrowserRouter>
    <Routes>
     <Route path='/login' element={<Login/>}/>
     <Route path='/login-staff' element={<LoginStaff/>}/>
     <Route path='/login-client' element={<LoginClient/>}/>
     <Route path='/verify-client/:email' element={<Verification/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/' element={<ProfileSection/>}/>
     <Route path='/agenda' element={<Agenda/>}/>
     <Route path='/rubrica' element={<Rubrica/>}/>
     <Route path='/trattamenti' element={<Treatments/>}/>
     <Route path='/staff' element={<Staff/>}/>
     <Route path='/orari' element={<Orari/>}/>
     <Route path='/cash/:id' element={<Cash/>}/>
     <Route path='/reset-password/:email' element={<ResetPassword/>}/>
     <Route path='/reset-password-staff/:email' element={<ResetPasswordStaff/>}/>
     <Route path='/user-page' element={<UserPage/>}/>
     <Route path='/edit-client' element={<EditPage/>}/>
     <Route path='/report' element={<Report/>}/>
    
     </Routes>
     
     </BrowserRouter>
    
  )
}

export default App
