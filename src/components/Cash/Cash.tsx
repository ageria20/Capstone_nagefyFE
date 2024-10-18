import { Button, Col, Container, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { List, X } from "react-bootstrap-icons";
import Sidebar from "../Sidebar/Sidebar";
import { ToggleSidebarAction } from "../../redux/actions/action";
import { useEffect, useState } from "react";
import { ICash } from "../../interfaces/ICash";

import { useNavigate, useParams } from "react-router-dom";

import { getAppointmentsById } from "../../redux/actions/actionAppointment";
import { createCash } from "../../redux/actions/actionCash";
import { setIsPayed } from "../../redux/slices/cashSlice";

const Cash = () => {
  const params = useParams();
  const appointmentId = params.id
  const navigate = useNavigate()
  const appointment = useAppSelector(
    (state) => state.appointments.selectedAppointment
  );
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const dispatch = useAppDispatch();
  const payments = [
    { type: "CARTA" },
    { type: "CONTANTI" },
    { type: "BONIFICO" },
  ];

  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const [newCash, setNewCash] = useState<ICash>({
    paymentMethod: paymentMethod || "N/A",
    appointment: "",
    total: 0,
  });

  const totalPrice = appointment?.treatmentsList.reduce((acc, treatment) => acc + treatment.price, 0 || 0)

  useEffect(() => {
    if(appointmentId){
    dispatch(getAppointmentsById(appointmentId));
    setNewCash({
        ...newCash, 
        appointment: appointmentId, 
        total: totalPrice
    })
    }
    console.log("APPOINTMENT", appointment);
  }, [appointmentId]);


  const handleSaveCash = () => {
    dispatch(createCash(newCash))
    navigate("/agenda")
    setIsPayed(true)
    console.log("NEW CASH: ", newCash)
  }

  const handlePaymentMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    const paymentType = e.target.value;
    switch (paymentType) {
      case "CARTA":
        setPaymentMethod("CARTA");
        break;
      case "CONTATI":
        setPaymentMethod("CONTANTI");
        break;
      case "BONIFICO":
        setPaymentMethod("BONIFICO");
        break;
    }
    console.log("PAYMENT TYPE: ", paymentType)
  };

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" } as ToggleSidebarAction);
  };

  return (
    <>
    <Container
      fluid
      className="d-flex align-items-center rounded-4 shadow-lg mt-2 p-2"
    >
      <Button className="toggle-button me-3" onClick={toggleSidebar}>
        {isOpen ? <X /> : <List />}
      </Button>
      <Sidebar />
      </Container>
      <Container className="mx-auto mt-5 rounded-4 shadow-sm">
        {appointment && (
          <Container>
            <h4>
              {appointment?.user.name} {appointment?.user.surname}
            </h4>
            <h4>{appointment?.staff.name} </h4>
            <div>
              {appointment?.treatmentsList.map((treatment) => {
                return (
                  <Row key={treatment.id}>
                    <Col xs={12} md={8}>
                      <p>{treatment.name}</p>
                    </Col>
                    <Col xs={12} md={4}>
                      <p>{treatment.price}€</p>
                    </Col>
                  </Row>
                );
              })}
              <Row>
                <Col xs={12} md={8}>
                  <h4>Netto a pagare</h4>
                </Col>
                <Col xs={12} md={4}>
                  <p>
                   {totalPrice}
                    €
                  </p>
                </Col>
              </Row>
            </div>

            {payments.map((payment, _i) => {
              return (
                <div key={_i} className="form-check form-switch ps-0">
                  <input
                    className="form-check-input ms-auto"
                    type="checkbox"
                    role="switch"
                    value={payment.type}
                    onChange={handlePaymentMethod}
                    required
                  />
                  <span className="ms-2">{payment.type}</span>
                </div>
              );
            })}
            <Button variant="primary" 
            className='my-3 border-primary bg-transparent text-primary save-btn' 
            onClick={handleSaveCash}>
          Paga
        </Button>
          </Container>
        )}
      </Container>
      
    </>
  );
};

export default Cash;
