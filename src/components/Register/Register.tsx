import { useState } from 'react'
import { Button, Container, Form, Image } from 'react-bootstrap'
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons'
import nagefyLogo from "../../assets/nagefyLogo250.png"
import "./Register.css"
import { Link } from 'react-router-dom'

const Register = () => {
  
    const [showPassword, setShwPassword] = useState(false)

const toggleShowPassword = () => {
    setShwPassword(!showPassword)
}

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <Image src={nagefyLogo} alt="nageft_logo" width={150}/>
    <Container className="shadow-lg container-custom rounded-4 p-0 d-flex justify-content-center align-content-center flex-column">
      <h3 className='p-3 text-center'>Registrati</h3>
      
      <Form className='registerForm mx-auto'>
      <Form.Group className="mb-0 p-1" controlId="exampleForm.ControlInput1">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="name" name="name" placeholder="Nome" autoFocus required/>
        </Form.Group>
        <Form.Group className="mb-0 p-1" controlId="exampleForm.ControlInput1">
          <Form.Label>Cognome</Form.Label>
          <Form.Control type="surname" name="surname" placeholder="Cognome" autoFocus required/>
        </Form.Group>
        <Form.Group className="mb-0 p-1" controlId="exampleForm.ControlInput1">
          <Form.Label>Telefono</Form.Label>
          <Form.Control type="telephone" name="telephone" placeholder="Cognome" autoFocus required/>
        </Form.Group>
        <Form.Group className="mb-0 p-1" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="name@example.com" autoFocus required/>
        </Form.Group>
        <Form.Group className="p-1" controlId="exampleForm.ControlInput2">
          <Form.Label>Password</Form.Label>
          <div className='position-relative'>
          <Form.Control type={showPassword ? "text" : "password"} name="password" placeholder="Inserisci la password" required/>
          
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
          {showPassword ? <EyeSlashFill/> : <EyeFill/>}
          </span>
          </div>
        </Form.Group>
        <div className='p-3'>
        <Button type="submit" className="mb-3 mt-3 mx-auto">Crea Account</Button>
        </div>
        <div className='text-center'>
                Hai già un account? <Link className='nav-link' to="/"><strong>Effettua il login</strong></Link>
        </div>
      </Form>
    </Container>
  </div>
  )
}

export default Register