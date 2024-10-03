
import { Button, Container, Form} from 'react-bootstrap'
import './Login.css'
import { Eye, EyeSlash } from 'react-bootstrap-icons'

const Login = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <Container className="m-3 shadow-lg container-custom rounded-4 p-0 d-flex justify-content-center align-content-center flex-column">
      <h3 className='p-3 text-center'>NAGEFY</h3>
      <p className='text-center'>Login</p>
      <Form className='loginForm mx-auto'>
        <Form.Group className="mb-3 p-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>
        <Form.Group className="mb-3 p-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Inserisci la password" />
          <EyeSlash/><Eye/>
        </Form.Group>
        <Button type="submit" className="mt-3">Login</Button>
      </Form>
    </Container>
  </div>
  )
}

export default Login