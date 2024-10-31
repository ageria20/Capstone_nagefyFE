
import { useState } from "react";
import {  IUser } from "../../interfaces/IUser";
import { useAppDispatch } from "../../redux/store/store";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { getClientMe } from "../../redux/actions/usersAction";
import { url } from "../../redux/actions/action";



interface EditPageModalProps {
    show: boolean;
    handleClose: () => void;
    loggedUser: IUser
    
}

const EditPageModal: React.FC<EditPageModalProps> = ({show, handleClose, loggedUser}) => {
    const dispatch = useAppDispatch()
    const [client, setClient] = useState<IUser>({
        name: "",
        surname: "",
        telephone: "",
        email: "",
        password: "",
    })




    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setClient((prev: IUser) => ({...prev, [e.target.name]: e.target.value}))
    }


    const updateProfile = async (client: IUser) =>{
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`${url}/clients/me/`, {
                method: "PUT",
                headers: {
                    Authorization: "Bearer "+accessToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(client)
                },
            )
            if(resp.ok){
               dispatch(getClientMe())
                
            } else{
                throw new Error("Get clients error")
            }
        
        } catch (error){
            console.log(error)
        }
    }


  return (
    <Container>
        <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton className="modalEdit border-bottom-0">
      <Modal.Title className="modalEdit">Modifica Profilo</Modal.Title>
    </Modal.Header>
    <Modal.Body className="modalEdit">
    {loggedUser &&
          <Form>
          <Form.Group controlId="formClientName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
            
              name="name"
              value={loggedUser.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formClientName">
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              type="text"
              
              name="surname"
              value={loggedUser.surname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formClientName">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              
              name="telephone"
              value={loggedUser.telephone}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formClientName">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="text"
              
              name="email"
              value={loggedUser.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formClientName">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              
              name="password"
              value={loggedUser.password}
              onChange={handleChange}
            />
          </Form.Group>
          </Form>
        }
    </Modal.Body>
    <Modal.Footer className="modalEdit border-top-0">
      <Button variant="secondary" onClick={handleClose}>
        Annulla
      </Button>
      <Button variant="primary" onClick={() => updateProfile(client)}>
          Salva Modifiche
        </Button>
    </Modal.Footer>
  </Modal>
    </Container>
  )
}

export default EditPageModal