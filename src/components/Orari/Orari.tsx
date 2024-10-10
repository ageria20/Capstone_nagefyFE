import { Button, Col, Container, Row } from "react-bootstrap";
import { List, X } from "react-bootstrap-icons";
import Sidebar from "../Sidebar/Sidebar";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { ToggleSidebarAction } from "../../redux/actions/action";
import { IoTimeOutline } from "react-icons/io5";
import { toggleDay } from "../../redux/slices/orariSlice";
import { useState } from "react";
import OrariModal from "./OrariModal";

const Orari = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const orari = useAppSelector((state) => state.orari.days)
  const [showModal, setShowModal] = useState(false); 
  const [selectedDay, setSelectedDay ] = useState<DaySchedule | null>(null)

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" } as ToggleSidebarAction);
  };

  const handleToggleDay = (day: string) => {
    dispatch(toggleDay(day))
  }

  const handleShowModal = (day: DaySchedule) => {
    setShowModal(true)
    setSelectedDay(day)
};
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <Container fluid>
        <Container fluid className="d-flex align-items-center p-2 rounded-4 shadow-lg mt-2">
            
          <Button className="toggle-button" onClick={toggleSidebar}>
            {isOpen ? <X /> : <List />}
          </Button>
          <Row className="align-items-center">
            <Col xs={3}>
          <IoTimeOutline size={24} />
          </Col>
          <Col xs={9}>
          <span>ORARI</span>
          </Col>
          </Row>
          <Sidebar />
        
        </Container>
      {orari.map((day: DaySchedule) => (
        <Row key={day.day} className="px-4">
        <Col className="d-flex align-items-center justify-content-between border-top border-bottom p-2">
          <h5>{day.day}</h5>
          <Row>
            <Col className="d-flex align-items-center justify-content-between">
          <label>
            <input 
              type="checkbox" 
              checked={day.open} 
              onChange={() => handleToggleDay(day.day)} 
            />
            {" "}{day.open ? "Aperto" : "Chiuso"}
           {day.open ? ( day.hours.map((hour, _i) => (
                <p key={_i}><span>DALLE{" "}{hour.from}{" "}ALLE{" "}{hour.to}</span></p>
            ))) : ""}
          </label>
          </Col>
          </Row>
          </Col>
          {day.open && (
            <div>
              <Button onClick={() => handleShowModal(day)}>
                Aggiungi Fascia Oraria
              </Button>
            </div>
          )}
         {selectedDay && <OrariModal show={showModal} handleClose={handleCloseModal} selectedDay={selectedDay}/>}
        </Row>
      ))}
    </Container>
    </div>
  );
};

export default Orari;
