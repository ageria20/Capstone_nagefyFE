import { Button, Image } from "react-bootstrap";
import "./Sidebar.css";
import nagefyLogo from "../../assets/nagefyLogo250.png";
import { SlPeople } from "react-icons/sl";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { BsClipboardData } from "react-icons/bs";
import { PiScissors } from "react-icons/pi";

import { Link } from "react-router-dom";
import { BoxArrowRight, List, Person, X } from "react-bootstrap-icons";

import { ToggleSidebarAction } from "../../redux/actions/action";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const loggedUser = useAppSelector((state) => state.users.user);

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" } as ToggleSidebarAction);
  };

  return (
    <div>
      <aside
        className={`sidebar ${
          isOpen ? "open" : "collapsed"
        } d-flex flex-column justify-content-between `}
      >
        <nav className="menu ">
          <Button className="toggle-button" onClick={toggleSidebar}>
            {isOpen ? <X /> : <List />}
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
            className="nav-link menu__item my-3"
            onClick={toggleSidebar}
          >
            <IoTimeOutline size={isOpen ? 24 : 24} />
            {isOpen && <span className="ms-2 menu__text">ORARI</span>}
          </Link>
          <Link
            to="#"
            className="nav-link menu__item my-3"
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
          <Link
            to=""
            className="nav-link menu__item my-3"
            onClick={toggleSidebar}
          >
            {loggedUser ? (
              <>
                <BoxArrowRight size={24} />
                {isOpen && <span className="ms-2 menu__text">Logout</span>}
              </>
            ) : (
              <>
                <Person size={isOpen ? 24 : 24} />
                {isOpen && <span className="ms-2 menu__text">Profilo</span>}
              </>
            )}
          </Link>
          <div className="copyright mb-3">
            {isOpen ? "©Andrea Geria 2024" : ""}
          </div>
        </section>
      </aside>
    </div>
  );
};

export default Sidebar;
