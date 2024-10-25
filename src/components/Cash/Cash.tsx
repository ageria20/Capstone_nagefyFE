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

const Cash = () => {
  const params = useParams();
  const appointmentId = params.id;
  const navigate = useNavigate();
  const [sale, setSale] = useState<number>(0); // Stato per il valore dello sconto
  const [appliedSale, setAppliedSale] = useState<number>(0); // Stato per lo sconto applicato

  const appointment = useAppSelector((state) => state.appointments.selectedAppointment);
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

  
  const totalPrice = appointment?.treatmentsList.reduce((acc, treatment) => acc + treatment.price, 0) || 0;

  
  const discountedTotal = Math.max(totalPrice - appliedSale, 0); // Assicuriamoci che non sia negativo

  useEffect(() => {
    if (appointmentId) {
      dispatch(getAppointmentsById(appointmentId));
    }
  }, [appointmentId, dispatch]);

  useEffect(() => {
    setNewCash((prevState) => ({
      ...prevState,
      appointment: appointmentId,
      total: discountedTotal, 
      paymentMethod: paymentMethod || "N/A",
    }));
  }, [appointmentId, discountedTotal, paymentMethod]);

  const handleSaveCash = () => {
    dispatch(createCash(newCash));
    navigate("/agenda");
    
  };

  const handlePaymentMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    const paymentType = e.target.value;
    setPaymentMethod(paymentType);
    
  };

  const handleDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const value = Number(e.target.value);
    setSale(value >= 0 ? value : 0); 
  };



  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" } as ToggleSidebarAction);
  };

  return (
    <>
      <Container fluid className="d-flex align-items-center rounded-4 shadow-lg mt-2 p-2">
        <Button className="toggle-button me-3" onClick={toggleSidebar}>
          {isOpen ? <X /> : <List />}
        </Button>
        <Sidebar />
      </Container>
      <Container className="mx-auto mt-5 rounded-4 shadow-sm">
        {appointment && (
          <Container>
            <h4 className="mb-4">
              {appointment.user.name} {appointment.user.surname}
            </h4>
            <p>Effettuato da</p>
            <h4>{appointment.staff.name}</h4>
            <div>
              {appointment.treatmentsList.map((treatment) => (
                <Row key={treatment.id}>
                  <Col xs={12} md={8}>
                    <p>{treatment.name}</p>
                  </Col>
                  <Col xs={12} md={4}>
                    <p>{treatment.price}€</p>
                  </Col>
                </Row>
              ))}
              <Container className="my-4">
              <p className="">Sconto</p>
              <Row>
                <Col>
              <input
                className="form-control rounded-5"
                style={{width: "100px"}}
                placeholder="Inserisci sconto"
                type="text"
                value={sale}
                onChange={handleDiscount}
                />
              </Col>
              
              <Col>
              <Button className="rounded-5" onClick={() => setAppliedSale(sale)}>Applica Sconto</Button>
              </Col>
              </Row>
              </Container>
            </div>

            <Container>
            <Row>
                <Col xs={12} md={8}>
                  <h4>Netto a pagare</h4>
                </Col>
                <Col xs={12} md={4}>
                  <p>{discountedTotal != 0 ? discountedTotal : totalPrice}€</p> 
                </Col>
              </Row>
            </Container>

            {payments.map((payment, _i) => (
              <div key={_i} className="form-check form-switch ps-0">
                <input
                  className="form-check-input ms-auto"
                  type="checkbox"
                  role="switch"
                  value={payment.type}
                  onChange={handlePaymentMethod}
                  checked={paymentMethod === payment.type}
                  required
                />
                <span className="ms-2">{payment.type}</span>
              </div>
            ))}
            <Button
              variant="primary"
              className='my-3 border-primary bg-transparent text-primary save-btn'
              onClick={handleSaveCash}
            >
              Paga
            </Button>
          </Container>
        )}
      </Container>
    </>
  );
};

export default Cash;
