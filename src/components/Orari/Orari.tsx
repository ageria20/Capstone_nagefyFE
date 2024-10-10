import { Button, Col, Container, Row } from "react-bootstrap";
import { List, X } from "react-bootstrap-icons";
import Sidebar from "../Sidebar/Sidebar";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { ToggleSidebarAction } from "../../redux/actions/action";
import { IoTimeOutline } from "react-icons/io5";
import { toggleDay, updateOrari } from "../../redux/slices/orariSlice";

const Orari = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const orari = useAppSelector((state) => state.orari.days)

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" } as ToggleSidebarAction);
  };

  const handleToggleDay = (day: string) => {
    dispatch(toggleDay(day))
  }

  const handleUpdateOrari = (day: string, newOrari: ITimeSlot[]) => {
    dispatch(updateOrari({day, hours: newOrari}))
  }

  return (
    <div>
      <Container fluid>
        <Container fluid className="d-flex align-items-center">
          <Button className="toggle-button" onClick={toggleSidebar}>
            {isOpen ? <X /> : <List />}
          </Button>
          <IoTimeOutline size={24} /><span>ORARI</span>
          <Sidebar />
        
        </Container>
      {orari.map((day: DaySchedule) => (
        <Row key={day.day} className="px-4">
        <Col className="d-flex align-items-center justify-content-between">
          <h5>{day.day}</h5>
          <Row>
            <Col className="d-flex align-items-center justify-content-between">
          <label>
            <input 
              type="checkbox" 
              checked={day.open} 
              onChange={() => handleToggleDay(day.day)} 
            />
            Aperto
          </label>
          </Col>
          </Row>
          </Col>
          {day.open && (
            <div>
              {day.hours.map((hour, index) => (
                <div key={index}>
                  <input 
                    type="time" 
                    value={hour.from} 
                    onChange={(e) => {
                      const updatedHours = [...day.hours];
                      updatedHours[index].from = e.target.value;
                      handleUpdateOrari(day.day, updatedHours);
                    }}
                  />
                  <input 
                    type="time" 
                    value={hour.to} 
                    onChange={(e) => {
                      const updatedHours = [...day.hours];
                      updatedHours[index].to = e.target.value;
                      handleUpdateOrari(day.day, updatedHours);
                    }}
                  />
                </div>
              ))}
              <Button onClick={() => {
                const newHours = [...day.hours, { from: '08:00', to: '17:00' }];
                handleUpdateOrari(day.day, newHours);
              }}>
                Aggiungi Fascia Oraria
              </Button>
            </div>
          )}
        </Row>
      ))}
    </Container>
    </div>
  );
};

export default Orari;
