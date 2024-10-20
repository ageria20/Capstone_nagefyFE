
import { Col, Container, Row } from 'react-bootstrap'
import ProfileNav from './ProfileNav'
import "./ProfileSection.css"

const ProfileSection = () => {
  return (
    <>
    <Container fluid className='homePage text-center m-0 pt-4 px-5'>
    <ProfileNav/>
      <h1>Gestisci il tuo salone a portata di click</h1>
      <Container className='w-75 my-5'>
      <h5 style={{fontWeight: "300"}}>Organizza facilmente gli appuntamenti del tuo salone con un'interfaccia intuitiva. Gestisci clienti, trattamenti e staff in pochi clic. Ottimizza il tempo e migliora l'efficienza del tuo business.</h5>
    </Container>
    <Container className='mx-auto mt-5'>
      <Row className='justify-content-center gap-5'> 
        <Col xs={12} md={3} className='first-card text-start rounded-4 p-4'>
          <h3 className='mb-4'>Gestione Storico Appuntamenti</h3>
          <h6 style={{fontWeight: "300"}}>Gestisci facilmente gli appuntamenti del salone, per assicurarti di non fare alcun ritardo.</h6>
        </Col>
        <Col xs={12} md={3} className='second-card text-start rounded-4 p-4'>
          <h3 className='mb-5'>Gestione Storico Clienti</h3>
          <h6 className="mt-5" style={{fontWeight: "300"}}>Gestisci facilmente i clienti e tutti i lori bisogni, per evitare di sbagliare.</h6>
        </Col>
        <Col xs={12} md={3} className='third-card text-start rounded-4 p-4'>
          <h3 className='mb-4'>Piani di gestione personalizzati</h3>
          <h6 className="mt-5" style={{fontWeight: "300"}}>Personalizza su misura il piano per ogni tuo bisogno.</h6>
        </Col>
      </Row>
    </Container>
    </Container>
    </>
  )
}

export default ProfileSection