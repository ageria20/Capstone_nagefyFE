import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";

interface FilterReportModalProps {
  show: boolean;
  handleClose: () => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  endDate: Date | null;
  applyFilters: (
    startDate: Date | null,
    endDate: Date | null,
    paymentMethod: string
  ) => void;
  filteredPaymentMethod: string | undefined;
  setFilteredPaymentMethod: (method: string) => void;
}

const FilterReportModal: React.FC<FilterReportModalProps> = ({
  show,
  handleClose,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  applyFilters,
  filteredPaymentMethod,
  setFilteredPaymentMethod,
}) => {
  const handleApplyFilters = () => {
    applyFilters(startDate, endDate, filteredPaymentMethod || "");
    handleClose();
  };

 
  return (
    <Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica orari</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <h4>Seleziona Periodo </h4>
          <Row>
            <Col xs={12} md={6}>
              <label  className="p-3">Da </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  date && setStartDate(date);
                }}
                selectsStart
                startDate={startDate ? startDate : new Date()}
                endDate={endDate ? endDate : new Date()}
                dateFormat="dd-MM-yyyy"
                className="form-control rounded-5 px-3"
              />
            </Col>
            <Col xs={12} md={6}>
              <label className="p-3"> A {" "}</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => {
                  date && setEndDate(date);
                }}
                selectsEnd
                startDate={startDate ? startDate : new Date()}
                endDate={endDate ? endDate : new Date()}
                dateFormat="dd-MM-yyyy"
                className="form-control rounded-5 px-3"
              />
            </Col>
            <Col xs={12} md={3}></Col>
          </Row>
          <Row className="mt-3">
            <Col xs={12}>
              <label>Metodo di pagamento</label>
              <div className="d-flex flex-column mt-2 form-check form-switch">
                <label>
                  <input
                    type="checkbox"
                    role="switch"
                    value={"CARTA"}
                    checked={filteredPaymentMethod === "CARTA"}
                    onChange={(e) => setFilteredPaymentMethod(e.target.value)}
                    className="form-check-input ms-auto me-2"
                  />
                  Carta
                </label>
                <label>
                  <input
                    type="checkbox"
                    role="switch"
                    value={"CONTANTI"}
                    checked={filteredPaymentMethod === "CONTANTI"}
                    onChange={(e) => setFilteredPaymentMethod(e.target.value)}
                    className="form-check-input ms-auto me-2"
                  />
                  Contanti
                </label>
                <label>
                  <input
                    type="checkbox"
                    role="switch"
                    value={"BONIFICO"}
                    checked={filteredPaymentMethod === "BONIFICO"}
                    onChange={(e) => setFilteredPaymentMethod(e.target.value)}
                    className="form-check-input ms-auto me-2"
                  />
                  Bonifico
                </label>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annulla
          </Button>
          <Button onClick={handleApplyFilters} >
            Applica Filtri
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FilterReportModal;
