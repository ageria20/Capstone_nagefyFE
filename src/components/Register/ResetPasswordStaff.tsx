import { FormEvent, useEffect, useState } from "react"
import { Button, Container, Form, Image } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
// import { getUser } from "../../redux/actions/usersAction"
import nagefyLogo from "../../assets/nagefyLogo250.png"
import { EyeFill, EyeSlashFill} from "react-bootstrap-icons"
import { notify, notifyErr, url } from "../../redux/actions/action"



const ResetPasswordStaff = () => {


    const [showPassword, setShwPassword] = useState(false)
const navigate = useNavigate()
const params = useParams<string>()
const email = params.email

const [password, setPassword] = useState<string>("")
const [confirmedPassword, setConfirmedPassword] = useState<string>("")

const toggleShowPassword = () => {
    setShwPassword(!showPassword)
}

useEffect(() => {
    
})
const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
  e.preventDefault()
  if(password !== confirmedPassword){
    notifyErr("Le password non corrispondono")
  }
  else{
    if (!email) {
        notifyErr("Utente non loggato, impossibile reimpostare la password");
        return;
    }
    else{
        
    try{
        const resp = await fetch(`${url}/staffs/reset?email=${email}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            password: password
          })
        });
        if(resp.ok){
            console.log("PASSWORD", confirmedPassword)
          notify("Password impostata con successo")
         navigate("/login-staff")
        }
        else {
            notifyErr("Errore nel reset della password");
        }
      } catch (error) {
        console.log(error);
        
      }
    }
  }

  
}



  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <Image src={nagefyLogo} alt="nagefy_logo" />
    <Container className="m-3 shadow-lg container-custom rounded-4 p-0 d-flex justify-content-center align-content-center flex-column">
      <h3 className='p-3 text-center'><strong>Imposta la tua password</strong></h3>
      
      <Form className='loginForm mx-auto' onSubmit={handleSubmit}>
      <h3 className='p-3 text-center'><strong>STAFF</strong></h3>
        <Form.Group className="mb-3 p-1" controlId="exampleForm.ControlInput1">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="password" autoFocus required onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <Form.Group className="p-1" controlId="exampleForm.ControlInput2">
          <Form.Label>Conferma Password</Form.Label>
          <div className='position-relative'>
          <Form.Control type={showPassword ? "text" : "password"} name="password" placeholder="Conferma password" required onChange={(e) => setConfirmedPassword(e.target.value)}/>
          
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
        <Button type="submit" className="mb-3 mt-3 mx-auto">Salva</Button>
        </div>
       
      </Form>
    </Container>
  </div>
  )
}

export default ResetPasswordStaff