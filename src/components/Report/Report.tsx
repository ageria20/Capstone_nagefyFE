
import {  Button, Col, Container, Row } from 'react-bootstrap'
import { List, X } from 'react-bootstrap-icons'
import Sidebar from '../Sidebar/Sidebar'
import { useAppDispatch, useAppSelector } from '../../redux/store/store'
import { ToggleSidebarAction } from '../../redux/actions/action'

const Report = () => {

    const isOpen = useAppSelector((state) => state.sidebar.isOpen)
    const dispatch = useAppDispatch()


    const toggleSidebar = () => {
        dispatch({ type: 'TOGGLE_SIDEBAR' } as ToggleSidebarAction);
    };

    const getTime = () =>{
        const today = new Date()
        const time = today.toLocaleString("it", { hour: '2-digit', minute: '2-digit'});
        return time
      }

  return (
    <div>
    <Container fluid>
    <Container fluid className='d-flex align-items-center rounded-4 shadow-lg mt-2 p-2'>
      <Button className="toggle-button me-3" onClick={toggleSidebar}>
        {isOpen ? <X/>:<List />}
      </Button>
       <Sidebar/>
       
        <p className='mb-0'>{getTime()}</p>
        </Container>

        <Container className='d-flex justify-content-between align-items-center'>
        <h2>Generale</h2>
        </Container>
        <Row>
            <Col xs={12} md={3}>
                <Container>
                    <h6>Entrate</h6>
                    <h1>€ 100,000</h1>
                </Container>
            </Col>
            <Col xs={12} md={3}>
                <Container>
                    <h6>Ultimo mese</h6>
                    <h1>€ 100,000</h1>
                </Container>
            </Col>
            <Col xs={12} md={3}>
                <Container>
                    <h6>Fiche Media</h6>
                    <h1>€ 100,000</h1>
                </Container>
            </Col>
            <Col xs={12} md={3}>
                <Container>
                    <h6>Presenze totali</h6>
                    <h1>€ 100,000</h1>
                </Container>
            </Col>
        </Row>
        <Row>
            <Col xs={12} md={6}>
                <Container>
                    grafico
                </Container>
            </Col>
            <Col xs={12} md={6}>
                <Container>
                    grafico2
                </Container>
            </Col>
        </Row>
        </Container>
        </div>
  )
}

export default Report