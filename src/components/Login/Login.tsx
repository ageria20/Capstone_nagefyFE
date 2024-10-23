/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Container, Form, Image} from 'react-bootstrap'
import './Login.css'
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons'
import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import nagefyLogo from "../../assets/nagefyLogo200.png"

import { getUser } from '../../redux/actions/usersAction'
import { useAppDispatch, useAppSelector } from '../../redux/store/store'

const Login = () => {
const [showPassword, setShwPassword] = useState(false)
const [token, setToken] = useState("")
const loggedUser = useAppSelector(state => state.users.user)
const navigate = useNavigate()
const dispatch = useAppDispatch()


const [user, setUser] = useState({
  email: "",
  password: ""
})

const toggleShowPassword = () => {
    setShwPassword(!showPassword)
}

const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
  e.preventDefault()

  try{
    const resp = await fetch(`http://localhost:8080/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
    if(resp.ok){
      const res = await resp.json()
      localStorage.setItem("accessToken", res.accessToken)
      setToken(res.accessToken)
    }
  } catch (error) {
    console.log(error);
    
  }
}

useEffect(() => {
  if(token){
 dispatch(getUser())
 console.log(loggedUser)
  }
 
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [token, dispatch])

 useEffect(() =>{
   if(loggedUser){
        if(loggedUser.role ==="ADMIN" || loggedUser.role ==="EMPLOYEE"){
       navigate("/agenda")
     }
     else {
       navigate("/profile")
     }
   }
 }, [loggedUser, navigate])

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setUser({...user, [e.target.name]: e.target.value})
}

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <Image src={nagefyLogo} alt="nagefy_logo" />
    <Container className="m-3 shadow-lg container-custom rounded-4 p-0 d-flex justify-content-center align-content-center flex-column">
      <h3 className='p-3 text-center'><strong>Bentornato!</strong></h3>
      
      <Form className='loginForm mx-auto' onSubmit={handleSubmit}>
      <h3 className='p-3 text-center'><strong>ADMIN</strong></h3>
        <Form.Group className="mb-3 p-1" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="name@example.com" autoFocus required onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="p-1" controlId="exampleForm.ControlInput2">
          <Form.Label>Password</Form.Label>
          <div className='position-relative'>
          <Form.Control type={showPassword ? "text" : "password"} name="password" placeholder="Inserisci la password" required onChange={handleChange}/>
          
          <span
                className="password-toggle-icon"
                onClick={toggleShowPassword}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
              >
          {showPassword ?<EyeSlashFill/> : <EyeFill/>}
          </span>
          </div>
        </Form.Group>
        <div className='p-3'>
        <Button type="submit" className="mb-3 mt-3 mx-auto">Login</Button>
        </div>
        <div className='text-center'>
                Non hai ancora un account? <Link className="nav-link" to="/register"><strong>Registrati</strong></Link>
        </div>
      </Form>
    </Container>
  </div>
  )
}

export default Login