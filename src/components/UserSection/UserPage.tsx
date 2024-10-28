import { useEffect, useState } from 'react'
import { Badge,  Button,  Card, Col, Container, Row } from 'react-bootstrap'
import UserNav from "./UserNav"
import { useAppDispatch } from '../../redux/store/store'
import { IAppointments } from '../../interfaces/IAppointment'
import dayjs from 'dayjs'
import { Trash } from 'react-bootstrap-icons'
import { getClientMe } from '../../redux/actions/usersAction'
import "./UserPage.css"
import { deleteMyAppointment } from '../../redux/actions/actionAppointment'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'

const UserPage = () => {

    const dispatch = useAppDispatch()
    const [appointments, setAppointments] = useState<IAppointments[]>([])
    const [page, setPage] = useState<number>(0)
 
    const totalPrice = (appointment: IAppointments) => appointment.treatmentsList.reduce((acc, treatment) => acc + treatment.price, 0 || 0)
    

    useEffect(() => {
        dispatch(getClientMe())
    },[dispatch])

    const getAppointmentsClient = async (page: number) => {
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`http://localhost:8080/clients/me/appointments?page=${page}`, {
                headers: {
                    Authorization: "Bearer "+accessToken
                },
            })
            if(resp.ok){
                const appointmentsClient = await resp.json()
                setAppointments(appointmentsClient.content)
                
            } else{
                throw new Error("Get clients error")
            }
        } catch (error){
            console.log(error)
        }
    }


    useEffect(() => {
        getAppointmentsClient(page)
    }, [dispatch])

  return (
    <Container  fluid className='main-content p-3 my-0'>
        <UserNav/>
        <Container className='p-3'>
            <h1 className='mb-5'>I tuoi Appuntamenti</h1>
            <Row>
                {appointments.reverse().map((appointment: IAppointments) => 
                    <Col xs={12} md={3}>
                        <Card style={{minHeight: "300px"}}>
                        <Card.Body className='d-flex flex-column justify-content-between align-items-center'>
                          <Card.Title>{dayjs(appointment.startTime).format('ddd D MMM - HH:mm').toLocaleUpperCase()}</Card.Title>
                          <Card.Text>
                            {appointment.treatmentsList.map(treatment =>
                            <Container>
                                <Row>
                                    <Col xs={6} md={6} className='text-start'>
                                        <p>{treatment.name}</p>
                                    </Col>
                                    <Col xs={6} md={6} className='d-flex align-items-center'>
                                       {treatment.price}{" "}€
                                    </Col>
                                </Row>
                                </Container> 
                            )}
                            <p>Staff: {appointment.staff.name}</p>
                          </Card.Text>
                          <Container className='d-flex justify-content-between align-items-end px-1'>
                          <Container className='mt-auto'>
                          <Button 
                  className='rounded-3 border-danger bg-transparent text-danger' onClick={async () => {
                    await dispatch(deleteMyAppointment(appointment.id))
                    await getAppointmentsClient(page)
                    }}>
                  <Trash className='my-1 d-flex w-100'/>
                </Button>
                </Container>
                <Container className='mt-auto'>
                          <span className='mb-auto'>Totale </span><Badge className='badge'>{totalPrice(appointment)}{" "}€</Badge>
                          </Container>
                          </Container>
                        </Card.Body>
                      </Card>
                      </Col>
                )}
            </Row>
            { appointments.length > 0 && <Container className='d-flex justify-content-between align-items-center mx-auto' style={{width: "150px"}}>
            <Button className='bg-transparent border-0' onClick={() => setPage(page - 1)}><BiLeftArrow/> Indietro</Button>
            <Button className='bg-transparent border-0'onClick={() => setPage(page + 1)}><BiRightArrow/> Avanti</Button>
            </Container>}
        </Container>
    </Container>
  )
}

export default UserPage