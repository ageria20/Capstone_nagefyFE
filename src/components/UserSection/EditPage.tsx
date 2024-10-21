
import { Col, Container, Row } from 'react-bootstrap'
import UserNav from "./UserNav"
import "./UserPage.css"
import { useEffect } from 'react'
import { getClientMe } from '../../redux/actions/usersAction'
import { useAppDispatch, useAppSelector } from '../../redux/store/store'

const EditPage = () => {

    const dispatch = useAppDispatch()
    const loggedUser = useAppSelector((state) => state.clientsList.clientMe)

    useEffect(() => {
        dispatch(getClientMe())
    },[dispatch])

  return (
    <Container  fluid className='main-content p-3 my-0'>
        <UserNav/>
        {loggedUser && <Container className='p-3'>
            <h1>Ciao, {loggedUser.name}</h1>
            <Row>
                <Col>
                    
                </Col>
            </Row>
        </Container>}
    </Container>
  )
}

export default EditPage