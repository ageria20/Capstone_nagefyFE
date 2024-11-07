
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import UserNav from "./UserNav"
import "./UserPage.css"
import { useEffect, useState } from 'react'
import { getClientMe } from '../../redux/actions/usersAction'
import { useAppDispatch, useAppSelector } from '../../redux/store/store'
import { Pencil } from 'react-bootstrap-icons'
import EditPageModal from './EditPageModale'

const EditPage = () => {

    const dispatch = useAppDispatch()
    const loggedUser = useAppSelector((state) => state.clientsList.clientMe)
    const [show, setShow] = useState<boolean>(false)


    const handleShowModal = () => setShow(true);
  const handleCloseModal = () => setShow(false);

    useEffect(() => {
        dispatch(getClientMe())
    },[dispatch])

  return (
    <Container  fluid className='main-content my-0 overflow-x-hidden'>
        <UserNav/>
        {loggedUser && <Container className='p-3'>
            <h1 className='border-bottom'>Profilo</h1>
            <Container className='rounded-3 p-4 mt-3 bg-white'>
                <Row>
                    <Col xs={12} md={2}>
                        <Image src={loggedUser.avatar} alt='avatar-user' className='rounded-circle' width={150}/>
                    </Col>
                    <Col xs={12} md={10} className='my-auto'>
                        <h4>{loggedUser.name}{" "}{loggedUser.surname}</h4>
                        <p>Cliente</p>
                    </Col>
                </Row>
            </Container>
            <Container className='rounded-3 mt-3 bg-white p-4'>
                <Row className='justify-content-between align-items-center p-4'> 
                    <Col xs={8} md={8}>
                    <h2>Informazioni Personali</h2>
                    </Col>
                    <Col xs={4} md={4}>
                    <Button className="edit-btn" onClick={handleShowModal}><Pencil/> Modifica</Button>
                    </Col>
                </Row>
                <Row className='p-2 mt-4'>
                   <Col xs={12} md={4} className='p-4'>
                        <p>Nome</p>
                        <h5>{loggedUser.name}</h5>
                   </Col>
                   <Col xs={12} md={4} className='p-4'>
                        <p>Cognome</p>
                        <h5>{loggedUser.surname}</h5>
                   </Col>
                   <Col xs={12} md={4} className='p-4'>
                        <p>Telefono</p>
                        <h5>{loggedUser.telephone}</h5>
                   </Col>
                   <Col xs={12} md={4} className='p-4'>
                        <p>Email</p>
                        <h5>{loggedUser.email}</h5>
                   </Col>
                   <Col xs={12} md={4} className='p-4'>
                        <p>Password</p>
                        <h5>*******</h5>
                   </Col>

                </Row>
            </Container>
        </Container>
        }
        <EditPageModal show={show} handleClose={handleCloseModal} loggedUser={loggedUser}/>
    </Container>
  )
}

export default EditPage