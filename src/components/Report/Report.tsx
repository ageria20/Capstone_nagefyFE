
import {  Button, Col, Container, Row } from 'react-bootstrap'
import { List, X } from 'react-bootstrap-icons'
import Sidebar from '../Sidebar/Sidebar'
import { useAppDispatch, useAppSelector } from '../../redux/store/store'
import { ToggleSidebarAction } from '../../redux/actions/action'
import { useEffect, useState } from 'react'
import { getCash } from '../../redux/actions/actionCash'
import { ICashed } from '../../interfaces/ICash'
import DatePicker from 'react-datepicker'

const Report = () => {

    const isOpen = useAppSelector((state) => state.sidebar.isOpen)
    const dispatch = useAppDispatch()
    const cashList = useAppSelector((state) => state.cash.cashList)
    const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

    const [filteredGeneralReport, setFilteredGeneralReport] = useState<number>(0)
    const [filteredFicheMedia, setFilteredFicheMedia] = useState<string | undefined>("")
    const [filteredCashList, setFilteredCashList] = useState<ICashed[]>([]) 
    const [isFilterActive, setIsFilterActive] = useState<boolean>(false)
    
    const generalReport = cashList.reduce((acc, report) => acc + report.total, 0)
    
    const ficheMedia = (generalReport / cashList.length).toFixed(2).replace(".", ",")
    

    const toggleSidebar = () => {
        dispatch({ type: 'TOGGLE_SIDEBAR' } as ToggleSidebarAction);
    };

    const getTime = () =>{
        const today = new Date()
        const time = today.toLocaleString("it", { hour: '2-digit', minute: '2-digit'});
        return time
      }



       const filterCash = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`http://localhost:8080/cash/report?startDate=${startDate?.toLocaleDateString("en-CA")}&endDate=${endDate?.toLocaleDateString("en-CA")}`, {
                headers: {
                    Authorization: "Bearer "+accessToken
                },
            })
            if(resp.ok){
                const filteredCash = await resp.json()
                const ficheMediaFiltrata = (filteredGeneralReport / filteredCash.length).toFixed(2).replace(".", ",")
                setFilteredCashList(filteredCash)
                setFilteredFicheMedia(() =>{ if(filteredCash.length === 0){
                    return "0"
                }
                else{
                    ficheMediaFiltrata}})
                setFilteredGeneralReport(filteredCash.reduce((acc: number, report: ICashed) => acc + report.total, 0))
                    
                setIsFilterActive(true)
               console.log("FILTER GENERAL REPORT ", filteredGeneralReport)
        console.log("FILTER FICHE MEDIA ", filteredFicheMedia)
        console.log("FILTER CASH LIST ", filteredCashList.length)
            } else{
                throw new Error("Get clients error")
            }
        } catch (error){
            console.log(error)
        }
       }

      console.log("CASH LIST: ", cashList)

    useEffect(() => {
        dispatch(getCash())
    }, [dispatch])

  return (
    <div>
    <Container fluid className='mt-4'>
    <Container fluid className='d-flex align-items-center rounded-4 shadow-lg mt-2 p-2'>
      <Button className="toggle-button me-3" onClick={toggleSidebar}>
        {isOpen ? <X/>:<List />}
      </Button>
       <Sidebar/>
       
        <p className='mb-0'>{getTime()}</p>
        </Container>

        <Container className='d-flex justify-content-between align-items-center mt-5'>
        <h2 className='me-5'>Generale</h2>
        <Row>
    <Col xs={12} md={3}>
      <h4>Seleziona Periodo {" "}</h4>
      </Col>

      <Col xs={12} md={3}>
        <label>Da {" "}</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => {date && setStartDate(date)}}
          selectsStart
          startDate={startDate ? startDate : new Date()}
          endDate={endDate ? endDate : new Date()}
          dateFormat="dd-MM-yyyy"
          className="form-control"
        />
      </Col>
      <Col xs={12} md={3}>
        <label>{" "}A{" "}</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => {date && setEndDate(date)}}
          selectsEnd
          startDate={startDate ? startDate : new Date()}
          endDate={endDate ? endDate : new Date()}
          dateFormat="dd-MM-yyyy"
          className="form-control"
        />
      </Col>
      <Col xs={12} md={3}>
      <Button onClick={() => filterCash()} className="mt-3">Applica</Button>
      </Col>
    </Row>
        </Container>
        <Container>
        <Row className='p-5 gap-1 flex-nowrap'>
            <Col xs={12} md={3} className='rounded-3 shadow-sm p-4'>
                <Container>
                    <h6>Entrate</h6>
                    <h1>€ {isFilterActive ? filteredGeneralReport : generalReport}</h1>
                </Container>
            </Col>
            <Col xs={12} md={3} className='rounded-3 shadow-sm p-4'>
                <Container>
                    <h6>Ultimo mese</h6>
                    <h1>€ 100,000</h1>
                </Container>
            </Col>
            <Col xs={12} md={3} className='rounded-3 shadow-sm p-4'>
                <Container>
                    <h6>Fiche Media</h6>
                    <h1>€ {isFilterActive ? filteredFicheMedia : ficheMedia}</h1>
                </Container>
            </Col>
            <Col xs={12} md={3} className='rounded-3 shadow-sm p-4'>
                <Container>
                    <h6>Presenze totali</h6>
                    <h1>{isFilterActive ? filteredCashList.length : cashList.length}</h1>
                </Container>
            </Col>
        </Row>
        <Row className='p-5 gap-3 flex-nowrap'>
            <Col xs={12} md={6} className='rounded-3 shadow-lg p-4'>
                <Container>
                    grafico
                </Container>
            </Col>
            <Col xs={12} md={6} className='rounded-3 shadow-lg p-4'>
                <Container>
                    grafico2
                </Container>
            </Col>
        </Row>
        </Container>
        </Container>
        </div>
  )
}

export default Report