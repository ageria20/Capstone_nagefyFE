
import { Button, Container, Form, Image} from 'react-bootstrap'
import './Login.css'
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import nagefyLogo from "../../assets/nagefyLogo200.png"

const Login = () => {
const [showPassword, setShwPassword] = useState(false)

const toggleShowPassword = () => {
    setShwPassword(!showPassword)
}

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <Image src={nagefyLogo} alt="nageft_logo" />
    <Container className="m-3 shadow-lg container-custom rounded-4 p-0 d-flex justify-content-center align-content-center flex-column">
      <h3 className='p-3 text-center'><strong>Bentornato!</strong></h3>
      
      <Form className='loginForm mx-auto'>
        <Form.Group className="mb-3 p-1" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" autoFocus required/>
        </Form.Group>
        <Form.Group className="p-1" controlId="exampleForm.ControlInput2">
          <Form.Label>Password</Form.Label>
          <div className='position-relative'>
          <Form.Control type={showPassword ? "text" : "password"} placeholder="Inserisci la password" required/>
          
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