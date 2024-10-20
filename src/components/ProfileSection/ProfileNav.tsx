
import { Button, Container, Image, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import nagefyLogo from "../../assets/nagefyLogo250.png"
import "./ProfileSection.css"

const ProfileNav = () => {
const navigate = useNavigate()

  return (
    <Navbar expand="lg" className="navbar  mx-auto p-0">
      <Container className="bg-white rounded-4 mb-5">
        <Navbar.Brand onClick={() => navigate("/")}>
          <Image src={nagefyLogo} alt="nagefy_logo" width={120} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link
              className="navbarMenu mx-3"
              onClick={() => navigate("/")}
              style={{ fontSize: "1.2rem", fontWeight: "300" }}
            >
              Home
            </Nav.Link>
            
            <Nav.Link className="navbarMenu mx-3 " href="#" style={{ fontSize: "1.2rem", fontWeight: "300"  }}>
             Servizi
            </Nav.Link>
            <Nav.Link
              className="navbarMenu mx-3"
              onClick={() => navigate("/ourbrand")}
              style={{ fontSize: "1.2rem", fontWeight: "300"  }}
            >
              Prodotti
            </Nav.Link>
          </Nav>
          <Button className="accedi-btn rounded-4 px-4" onClick={() => navigate("/")}>
            Accedi
          </Button>
          <Button className=" registrati-btn rounded-4 px-4 ms-3" onClick={() => navigate("/register")}>
            Registrati
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default ProfileNav