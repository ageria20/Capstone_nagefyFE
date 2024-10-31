import { FormEvent, useState } from 'react'
import { Alert, Button, Container, Form, Image, Spinner } from 'react-bootstrap'
import { ExclamationOctagonFill, EyeFill, EyeSlashFill } from 'react-bootstrap-icons'
import nagefyLogo from "../../assets/nagefyLogo250.png"
import "./Register.css"
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { notify, notifyErr, url } from '../../redux/actions/action'

const RegisterClient = () => {
  
    const [showPassword, setShwPassword] = useState(false)
    
    const [isOk, setIsOk] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

const [client, setClient] = useState({
  name: "",
  surname: "",
  telephone: "",
  email: "",
  password: ""
})


const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
  e.preventDefault()

  try{
    setIsLoading(true)
    const resp = await fetch(`${url}/auth/client-register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(client)
    });
    if(resp.ok){
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setClient({
          name: "",
          surname: "",
          telephone: "",
          email: "",
          password: ""
        })
        setIsOk(true)
    }
  } catch (error) {
    notifyErr("Errore nella registrazione!")
    console.log(error);
    
  } finally {
    notify("Registrazione effettuata!")
    setIsLoading(false)
  }
}

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setClient({...client, [e.target.name]: e.target.value})
}
const toggleShowPassword = () => {
    setShwPassword(!showPassword)
}

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <Image src={nagefyLogo} alt="nagefy_logo" width={150}/>
    <Container className="shadow-lg container-custom rounded-4 p-0 d-flex justify-content-center align-content-center flex-column">
      <h3 className='p-3 text-center'>Registrati</h3>
      
      <Form className='registerForm mx-auto' onSubmit={handleSubmit}>
      <Form.Group className="mb-0 p-1" controlId="exampleForm.ControlInput1">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="name" name="name" placeholder="Nome" autoFocus required value={client.name} onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-0 p-1" controlId="exampleForm.ControlInput1">
          <Form.Label>Cognome</Form.Label>
          <Form.Control type="surname" name="surname" placeholder="Cognome" autoFocus required value={client.surname} onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-0 p-1" controlId="exampleForm.ControlInput1">
          <Form.Label>Telefono</Form.Label>
          <Form.Control type="telephone" name="telephone" placeholder="Telefono" autoFocus required value={client.telephone} onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-0 p-1" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="name@example.com" autoFocus required value={client.email} onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="p-1" controlId="exampleForm.ControlInput2">
          <Form.Label>Password</Form.Label>
          <div className='position-relative'>
          <Form.Control type={showPassword ? "text" : "password"} name="password" placeholder="Inserisci la password" required value={client.password} onChange={handleChange}/>
          
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
        <Button type="submit" className="mb-3 mt-3 mx-auto">{isLoading ?  <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        /> : "Crea Account"}</Button>
        </div>
        <div className='text-center'>
                Hai già un account? <Link className='nav-link' to="/login-client"><strong>Effettua il login</strong></Link>
        </div>
      </Form>
    </Container>
      {isOk ?  <Alert className='mt-5 d-flex align-items-center border-danger p-4' variant="danger"><ExclamationOctagonFill className='me-3'/> Verifica la tua Email prima di effettuare il login</Alert> : ""}
        <ToastContainer/>
  </div>
  )
}

export default RegisterClient