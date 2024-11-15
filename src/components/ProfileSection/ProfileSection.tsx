
import { Col, Container, Image, Row } from 'react-bootstrap'
import ProfileNav from './ProfileNav'
import nagefyLogo from "../../assets/nagefyLogo250.png"
import "./ProfileSection.css"
import Footer from './Footer'

const ProfileSection = () => {



  return (
    <>
    <Container fluid className='homePage text-center m-0 pt-4 px-5 main-content'>
      
    <ProfileNav/>
   
    <Container className='text-center w-50 my-5 mb-5'>
      <h1>Gestisci il tuo salone a portata di click</h1>
      </Container>
     
      <Container className='w-50 my-5 text-center'>
      <h5 style={{fontWeight: "300"}}>Organizza facilmente gli appuntamenti del tuo salone con un'interfaccia intuitiva. Gestisci clienti, trattamenti e staff in pochi clic. Ottimizza il tempo e migliora l'efficienza del tuo business.</h5>
    </Container>

    <Container className='mx-auto py-5 mt-5 px-0'>
      <Row className='justify-content-center gap-5' style={{marginTop: "3rem !important"}}> 
        <Col xs={12} md={3} className='first-card text-start rounded-4 p-4'>
          <h3 className='mb-3'>Agenda Digitale</h3>
          <h6 style={{fontWeight: "300", paddingTop: "2.5rem"}}>Gestisci storico degli appuntamenti del salone, per assicurarti di non fare alcun ritardo.</h6>
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
    <Container className='mt-5 py-5'>
    <Container className='bg-white rounded-4 mx-auto p-5 mt-5 mb-5'>
        <Row>
          <Col xs={12} md={6} className='text-start'>
            <Image src={nagefyLogo} alt='nagefy_logo'/>
            <h2 className='mb-4'style={{fontWeight: "900"}}>Immergiti nell'esperienza di Nagefy</h2>
            <h6 className="mt-5 w-75" style={{fontWeight: "300"}}>Grazie a Nagefy potrai, non solo gestire i tuoi appuntamenti, ma anche avere un overview generale e divisa per membri del tuo staff. Inoltre avrai un quadro chiaro di come sta andando la tua attività, con resoconti personalizzati.</h6>
          </Col>
          <Col xs={12} md={6}>
            <Image src='https://images.unsplash.com/photo-1562259920-47afc3030ba2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='hair-photo' className='w-100 rounded-4'/>
          </Col>
        </Row>
      </Container>
      </Container>
      <Container className='border-top py-5'>
      <Footer/>
      </Container>
    </Container>
    </>
  )
}

export default ProfileSection