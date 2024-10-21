import { useEffect, useState } from 'react'
import { Badge,  Button,  Card, Container, Row } from 'react-bootstrap'
import UserNav from "./UserNav"
import { useAppDispatch } from '../../redux/store/store'
import { IAppointments } from '../../interfaces/IAppointment'
import dayjs from 'dayjs'
import { Trash } from 'react-bootstrap-icons'
import { getClientMe } from '../../redux/actions/usersAction'
import "./UserPage.css"

const UserPage = () => {

    const dispatch = useAppDispatch()
    const [appointments, setAppointments] = useState<IAppointments[]>([])

    const totalPrice = (appointment: IAppointments) => appointment.treatmentsList.reduce((acc, treatment) => acc + treatment.price, 0 || 0)
    
    console.log(appointments)

    useEffect(() => {
        dispatch(getClientMe())
    },[dispatch])

    const getAppointmentsClient = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`http://localhost:8080/clients/me/appointments`, {
                headers: {
                    Authorization: "Bearer "+accessToken
                },
            })
            if(resp.ok){
                const appointmentsClient = await resp.json()
                console.log("Appuntamenti ricevuti dal backend:", appointmentsClient.content);
                setAppointments(appointmentsClient.content)
            } else{
                throw new Error("Get clients error")
            }
        } catch (error){
            console.log(error)
        }
    }


    useEffect(() => {
        getAppointmentsClient()
    }, [])

  return (
    <Container className='main-content mx-0 p-3 my-0'>
        <UserNav/>
        <Container className='p-3'>
            <h1>I tuoi Appuntamenti</h1>
            <Row>
                {appointments.reverse().map((appointment: IAppointments) => 
                    
                        <Card>
                        <Card.Body>
                          <Card.Title>{dayjs(appointment.startTime).format('ddd D - HH:mm').toLocaleUpperCase()}</Card.Title>
                          <Card.Text className='d-flex justify-content-between align-items-center'>
                            {appointment.treatmentsList.map(treatment => 
                                <>
                                    <p>{treatment.name}</p>
                                    <Badge className='badge'>{treatment.price}</Badge>
                                </>
                            )}
                          </Card.Text>
                          <Badge bg="primary">{totalPrice(appointment)}</Badge>
                          <Button 
                  className='my-3 rounded-4 border-danger bg-transparent text-danger'>
                  <Trash className='my-1 d-flex w-100'/>
                </Button>
                        </Card.Body>
                      </Card>
                    
                )}
            </Row>
        </Container>
    </Container>
  )
}

export default UserPage