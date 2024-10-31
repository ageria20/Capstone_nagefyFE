
import { Container, Dropdown, Image, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import nagefyLogo from "../../assets/nagefyLogo250.png"
import { IoLogOut } from 'react-icons/io5'
import { useAppDispatch, useAppSelector } from '../../redux/store/store'
import { useEffect } from 'react'
import { getClientMe } from '../../redux/actions/usersAction'
import "./UserPage.css"
import { Calendar, PencilFill } from 'react-bootstrap-icons'

const ProfileNav = () => {
const navigate = useNavigate()
const loggedUser = useAppSelector((state) => state.clientsList.clientMe)
const dispatch = useAppDispatch()

useEffect(() => {
    dispatch(getClientMe())
}, [dispatch])

  return (
    <Navbar expand="lg" className="navbar nav mx-auto p-0 my-3">
      <Container className="bg-white rounded-4 mb-5 d-flex justify-content-between flex-nowrap">
        <Navbar.Brand onClick={() => navigate("/")}>
          <Image src={nagefyLogo} alt="nagefy_logo" width={120} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='toggle-btn-user'/>
        <Container>
          
          <Dropdown className='ms-auto d-flex justify-content-end'>
            <Dropdown.Toggle id="dropdown-basic" className="bg-transparent text-black border-0 px-4">
            {loggedUser && <Image src={loggedUser.avatar} width={50} className='rounded-circle'/>}
            {/* {" "}{loggedUser && `${loggedUser.name} ${loggedUser.surname}`} */}
            </Dropdown.Toggle>

            <Dropdown.Menu className='custom-dropdown p-2'>
            <Dropdown.Item className='text-white custom-dropdown-item p-2' onClick={() => navigate("/user-page")}>
              <span><Calendar className='me-2'/>{" "}</span> Appuntamenti
              </Dropdown.Item>
              <Dropdown.Item className='text-white custom-dropdown-item p-2' onClick={() => navigate("/edit-client")}>
              <span><PencilFill className='me-2'/>{" "}</span> Edit
              </Dropdown.Item>

             
              <Dropdown.Item className='text-white custom-dropdown-item p-2' onClick={() => {
                navigate("/")
                localStorage.removeItem("accessToken")
                }}>
                <span><IoLogOut className='me-2'/>{" "}</span> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Container>
    </Navbar>
  )
}

export default ProfileNav