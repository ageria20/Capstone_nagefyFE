
import { Col, Container, Row } from 'react-bootstrap'
import { Facebook, Instagram, Linkedin } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <Container>
        <Row>
            <Col>
                <Row>
                    <Col className='text-start'>
                        <h6>Product</h6>
                        <Link to="#" className='nav-link'>Conosci il prodotto</Link>
                        <Link to="#" className='nav-link'>Prezzi</Link>
                    </Col>
                    <Col className='text-start'>
                        <h6>Features</h6>
                        <Link to="#" className='nav-link'>Storico Clienti</Link>
                        <Link to="#" className='nav-link'>Agenda Digitale</Link>
                        <Link to="#" className='nav-link'>Report Attività</Link>
                    </Col>
                    <Col className='text-start'>
                    <h6>Company</h6>
                    <Link to="#" className='nav-link'>About</Link>
                    <Link to="#" className='nav-link'>Lavoro</Link>
                    </Col>
                </Row>
            </Col>
            <Col>
                <Row>
                    <Col>
                        <Instagram/>
                    </Col>
                    <Col>
                        <Linkedin/>
                    </Col>
                    <Col>
                        <Facebook/>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Container className='p-4 mt-5 text-start'>
            <h6>©Andrea Geria 2024 | Nagefy </h6>
        </Container>
    </Container>
  )
}

export default Footer