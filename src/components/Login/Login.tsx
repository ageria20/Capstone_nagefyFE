
import { Button, Container, Form} from 'react-bootstrap'
import './Login.css'
import { Eye, EyeSlash } from 'react-bootstrap-icons'
import { useState } from 'react'

const Login = () => {
const [showPassword, setShwPassword] = useState(false)

const toggleShowPassword = () => {
    setShwPassword(!showPassword)
}

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className='mb-3'>NAGEFY</h1>
    <Container className="m-3 shadow-lg container-custom rounded-4 p-0 d-flex justify-content-center align-content-center flex-column">
      <h3 className='p-3 text-center'>Login</h3>
      
      <Form className='loginForm mx-auto'>
        <Form.Group className="mb-3 p-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" autoFocus required/>
        </Form.Group>
        <Form.Group className="p-3" controlId="exampleForm.ControlInput2">
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
          {showPassword ? <EyeSlash/> : <Eye/>}
          </span>
          </div>
        </Form.Group>
        <div className='p-3'>
        <Button type="submit" className="mt-3 mx-auto">Login</Button>
        </div>
      </Form>
    </Container>
  </div>
  )
}

export default Login