
import { Container, Dropdown, Image, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import nagefyLogo from "../../assets/nagefyLogo250.png"
import { IoLogOut } from 'react-icons/io5'
import { useAppDispatch, useAppSelector } from '../../redux/store/store'
import { useEffect } from 'react'
import { getClientMe } from '../../redux/actions/usersAction'
import "./UserPage.css"

const ProfileNav = () => {
const navigate = useNavigate()
const loggedUser = useAppSelector((state) => state.clientsList.clientMe)
const dispatch = useAppDispatch()

console.log("LOGGED USER ", loggedUser )
useEffect(() => {
    dispatch(getClientMe())
}, [dispatch])

  return (
    <Navbar expand="lg" className="navbar nav mx-auto p-0 fixed-top my-5">
      <Container className="bg-white rounded-4 mb-5 d-flex justify-content-between">
        <Navbar.Brand onClick={() => navigate("/")}>
          <Image src={nagefyLogo} alt="nagefy_logo" width={120} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className="bg-transparent text-black border-0 px-4">
            {loggedUser && `${loggedUser.name} ${loggedUser.surname}`}
            </Dropdown.Toggle>

            <Dropdown.Menu className='custom-dropdown'>
              
              <Dropdown.Item className='text-white custom-dropdown-item' onClick={() => navigate("/edit-client")}>
                Edit
              </Dropdown.Item>

             
              <Dropdown.Item className='text-white custom-dropdown-item' onClick={() => {
                navigate("/login-client")
                localStorage.removeItem("accessToken")
                }}>
                <span><IoLogOut/></span>Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default ProfileNav