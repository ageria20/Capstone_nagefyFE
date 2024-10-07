import { Button, Image } from "react-bootstrap"
import "./Sidebar.css"
import nagefyLogo from "../../assets/nagefyLogo250.png"
import { SlPeople } from "react-icons/sl";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { BsClipboardData } from "react-icons/bs";
import { PiScissors } from "react-icons/pi";

import { Link } from "react-router-dom";
import { useState } from "react";
import { List, Person } from "react-bootstrap-icons";

const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(false);  // Stato per gestire apertura/chiusura sidebar

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  

  return (
    <div>
        
      <aside className={`sidebar ${isOpen ? "open" : "collapsed"} d-flex flex-column justify-content-between `}>
        <nav className="menu ">
        <Button className={isOpen ? `d-none` : `d-block`} onClick={toggleSidebar}><List /></Button>
        <Image src={nagefyLogo} alt="nagefy_logo" width="150" className={isOpen ? `logo mx-auto`: `logo mx-auto d-none`} />
        
          <Link to="/agenda" className="nav-link menu__item my-3" onClick={toggleSidebar}>
            <MdOutlineCalendarMonth size={isOpen ? 24 :24} />
            {isOpen && <span className="ms-2 menu__text">AGENDA</span>}
          </Link>
          
          <Link to="#" className="nav-link menu__item my-3" onClick={toggleSidebar}>
            <IoTimeOutline size={isOpen ? 24 :24} />
            {isOpen && <span className="ms-2 menu__text">ORARI</span>}
          </Link>
          <Link to="#" className="nav-link menu__item my-3" onClick={toggleSidebar}>
            <BsClipboardData size={isOpen ? 24 :24} />
            {isOpen && <span className="ms-2 menu__text">STATISTICHE</span>}
          </Link>
          <Link to="" className="nav-link menu__item my-3"  onClick={toggleSidebar}>
            <SlPeople size={isOpen ? 24 :24} />
            {isOpen && <span className="ms-2 menu__text">STAFF</span>}
          </Link>
          <Link to="" className="nav-link menu__item my-3"  onClick={toggleSidebar}>
            <PiScissors size={isOpen ? 24 :24} />
            {isOpen && <span className="ms-2 menu__text">TRATAMENTI</span>}
          </Link>
        </nav>
        <section>
        <Link to="" className="nav-link menu__item my-3"  onClick={toggleSidebar}>
            <Person size={isOpen ? 24 :24} />
            {isOpen && <span className="ms-2 menu__text">Profilo</span>}
          </Link>
        <div className="copyright mb-3">{isOpen ? '©Andrea Geria 2024' : ''}</div>
        </section>
      </aside>
    </div>
  )
}

export default Sidebar