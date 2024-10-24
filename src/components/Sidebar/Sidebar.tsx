import { Button, Image } from "react-bootstrap";
import "./Sidebar.css";
import nagefyLogo from "../../assets/nagefyLogo250.png";
import { SlPeople } from "react-icons/sl";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { BsClipboardData } from "react-icons/bs";
import { PiScissors } from "react-icons/pi";

import { Link, useNavigate} from "react-router-dom";
import { BoxArrowRight, List,  X } from "react-bootstrap-icons";

import { ToggleSidebarAction } from "../../redux/actions/action";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { useEffect, useState } from "react";
import { IUser } from "../../interfaces/IUser";
import { getUser } from "../../redux/actions/usersAction";


const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const loggedUser: IUser = useAppSelector((state) => state.users.user)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const navigate = useNavigate()
 

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" } as ToggleSidebarAction);
  };



  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])


  useEffect(() => {    
    if(loggedUser){
    if(loggedUser.role === "ADMIN"){
      setIsAdmin(true)
    }

    else {
      setIsAdmin(false)
    }}
  }, [loggedUser])

  

  return (
    <div>
      <aside
        className={`sidebar ${
          isOpen ? "open" : "collapsed"
        } d-flex flex-column justify-content-between`}
      >
        <nav className="menu ">
          <Button className="toggle-button" onClick={toggleSidebar}>
            {isOpen ? <X /> : <List width={100}/>}
          </Button>
          
          <Image
            src={nagefyLogo}
            alt="nagefy_logo"
            width="150"
            className={isOpen ? `logo mx-auto` : `logo mx-auto d-none`}
          />
          
          <Link
            to="/agenda"
            className="nav-link menu__item my-3"
            onClick={toggleSidebar}
          >
            <MdOutlineCalendarMonth size={isOpen ? 24 : 24} />
            {isOpen && <span className="ms-2 menu__text">AGENDA</span>}
          </Link>
          <Link
            to="/rubrica"
            className="nav-link menu__item my-3"
            onClick={toggleSidebar}
          >
            <SlPeople size={isOpen ? 24 : 24} />
            {isOpen && <span className="ms-2 menu__text">RUBRICA</span>}
          </Link>
          <Link
            to="/orari"
            className={isAdmin ? `nav-link menu__item my-3` : `d-none`}
            onClick={toggleSidebar}
          >
            <IoTimeOutline size={isOpen ? 24 : 24} />
            {isOpen && <span className="ms-2 menu__text">ORARI</span>}
          </Link>
          <Link
            to="/report"
            className={isAdmin ? `nav-link menu__item my-3` : `d-none`}
            onClick={toggleSidebar}
          >
            <BsClipboardData size={isOpen ? 24 : 24} />
            {isOpen && <span className="ms-2 menu__text">STATISTICHE</span>}
          </Link>
          <Link
            to="/staff"
            className="nav-link menu__item my-3"
            onClick={toggleSidebar}
          >
            <SlPeople size={isOpen ? 24 : 24} />
            {isOpen && <span className="ms-2 menu__text">STAFF</span>}
          </Link>
          <Link
            to="/trattamenti"
            className="nav-link menu__item my-3"
            onClick={toggleSidebar}
          >
            <PiScissors size={isOpen ? 24 : 24} />
            {isOpen && <span className="ms-2 menu__text">TRATTAMENTI</span>}
          </Link>
        </nav>
        <section>
          {/* <Link
            to=""
            className="nav-link menu__item my-3"
            onClick={toggleSidebar}
          >
                <Person size={isOpen ? 24 : 24} />
                {isOpen && <span className="ms-2 menu__text">Profilo</span>}
          </Link> */}
          <button
          
            className="menu__item my-3 border-0 bg-transparent"
            onClick={ () =>{
              navigate("/")
              localStorage.removeItem("accessToken")
            }}
          >
          <BoxArrowRight size={24} />
          {isOpen && <span className="ms-2 menu__text">Logout</span>}
          </button>
          <div className="copyright mb-3">
            {isOpen ? "©Andrea Geria 2024" : ""}
          </div>
        </section>
      </aside>
    </div>
  );
};

export default Sidebar;
