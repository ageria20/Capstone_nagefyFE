import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { List, Plus, Trash, X } from "react-bootstrap-icons";
import Sidebar from "../Sidebar/Sidebar";
import "./Treatment.css";
import { ToggleSidebarAction } from "../../redux/actions/action";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import NewUserModal from "./NewTreatmentModal";
import { ToastContainer } from "react-toastify";
import {
  deleteTreatment,
  getTreatments,
  searchTreatments,
  updateTreatment,
} from "../../redux/actions/actionTreatment";
import { ITreatment } from "../../interfaces/ITreatment";

const Treatments = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const [query, setQuery] = useState("");
  const treatments: ITreatment[] = useAppSelector(
    (state) => state.treatments.treatments
  );
  const [selectedTreatment, setSelectedTreatment] = useState<ITreatment>({} as ITreatment);
  const [showModal, setShowModal] = useState(false);

  const handleCustomerClick = (treatment: ITreatment) => {
    setSelectedTreatment(treatment);
  };

  const getTime = () => {
    const today = new Date();
    const time = today.toLocaleString("it", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return time;
  };
  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" } as ToggleSidebarAction);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (query.length > 0) {
      dispatch(searchTreatments(e.target.value));
    } else {
      dispatch(getTreatments());
    }
  };

  const handleUpdateTreatment = (selectedTreatmentId: string | undefined) => {
    if (selectedTreatmentId) {
      dispatch(updateTreatment(selectedTreatmentId, selectedTreatment));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedTreatment((prevTreatment: ITreatment) => ({
      ...prevTreatment,
      [name]: value,
    }));
  };

  const clearSearch = () => {
    setQuery("");
    dispatch(getTreatments());
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    dispatch(getTreatments());
    console.log("SELECTED TREATMENT: ", selectedTreatment)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Container fluid>
        <Container
          fluid
          className="d-flex align-items-center  rounded-4 shadow-lg mt-4 p-3"
        >
          <Button className="toggle-button" onClick={toggleSidebar}>
            {isOpen ? <X /> : <List />}
          </Button>
          <Sidebar />
          <p className="mb-0">{getTime()}</p>
        </Container>
        <Row className="min-vh-100 mt-3 p-3">
          <Col xs={12} md={5} lg={3} className="border-end">
            <h4 className="my-3">Trattamenti</h4>
            <Row className="align-items-center">
              <Col xs={10}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control rounded-4 position-relative d-flex align-items-center"
                    value={query}
                    onChange={handleChange}
                    placeholder="Cerca"
                  />
                  <X
                    className="my-1 position-absolute"
                    onClick={clearSearch}
                    style={{
                      right: "10px",
                      top: "39%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </Col>
              <Col xs={2} className="text-center px-0 mx-0">
                <Button
                  className="my-3 rounded-circle bg-transparent text-primary"
                  onClick={handleShowModal}
                >
                  <Plus className="my-1 d-flex w-100" />
                </Button>
              </Col>
            </Row>
            <ListGroup>
              {treatments?.map((treatment) => (
                <ListGroup.Item
                  key={treatment.id}
                  action
                  className="border-0 bg-transparent text-secondary"
                  onClick={() => handleCustomerClick(treatment)}
                  active={selectedTreatment?.id === treatment.id}
                >
                  {treatment.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          <Col xs={12} md={7} lg={9} className="p-4">
            {selectedTreatment ? (
              <>
                <Card>
                  <Card.Body>
                    <Row>
                      <Col xs={12} md={9}>
                        <Card.Title>{selectedTreatment.name}</Card.Title>
                        <Card.Text>
                          <strong>Prezzo:</strong> {selectedTreatment.price} €
                        </Card.Text>
                        <Card.Text>
                          <strong>Durata:</strong> {selectedTreatment.duration}{" "}
                          min
                        </Card.Text>
                      </Col>
                      <Col className="d-flex justify-content-end align-items-center">
                        <Button
                          className="my-3 rounded-circle border-danger bg-transparent text-danger"
                          onClick={() => {
                            dispatch(deleteTreatment(selectedTreatment.id));
                            console.log(selectedTreatment.id);
                          }}
                        >
                          <Trash className="my-1 d-flex w-100" />
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
                <Container className="mt-5">
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Trattamento</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Trattamento"
                      required
                      name="name"
                      value={selectedTreatment.name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Prezzo</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Prezzo"
                      required
                      name="price"
                      value={selectedTreatment.price}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Durata</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Durata"
                      required
                      name="duration"
                      value={selectedTreatment.duration}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    className="my-3 border-primary bg-transparent text-primary save-btn"
                    onClick={() => handleUpdateTreatment(selectedTreatment.id)}
                  >
                    Salva
                  </Button>
                </Container>
              </>
            ) : (
              <p>Seleziona un trattamento per vedere i dettagli.</p>
            )}
          </Col>
        </Row>
        <NewUserModal show={showModal} handleClose={handleCloseModal} />
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Treatments;
