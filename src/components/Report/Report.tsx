
import {  Button, Col, Container, Row } from 'react-bootstrap'
import { List, X } from 'react-bootstrap-icons'
import Sidebar from '../Sidebar/Sidebar'
import { useAppDispatch, useAppSelector } from '../../redux/store/store'
import { ToggleSidebarAction } from '../../redux/actions/action'
import { useEffect, useState } from 'react'
import { getCash } from '../../redux/actions/actionCash'
import { ICashed } from '../../interfaces/ICash'
import { Line } from 'react-chartjs-2';  
import { Doughnut } from 'react-chartjs-2'; 
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import dayjs from 'dayjs'
import FilterReportModal from './FilterRepostModal'


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Report = () => {

    const isOpen = useAppSelector((state) => state.sidebar.isOpen)
    const dispatch = useAppDispatch()
    const cashList = useAppSelector((state) => state.cash.cashList)
    const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

    const [filteredGeneralReport, setFilteredGeneralReport] = useState<number>(0)
    const [filteredLastMonthReport, setFilteredLastMonthReport] = useState<number>(0)
    const [filteredFicheMedia, setFilteredFicheMedia] = useState<string | undefined>("")
    const [filteredPaymentMethod, setFilteredPaymentMethod] = useState<string | undefined>("")
    const [staffRevenue, setStaffRevenue] = useState<{ [staffName: string]: number }>({});
    const [filteredCashList, setFilteredCashList] = useState<ICashed[]>([]) 
    const [isFilterActive, setIsFilterActive] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    
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



       const filterCash = async (start: Date | null, end: Date | null) => {

        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`http://localhost:8080/cash/report?startDate=${start?.toLocaleDateString("en-CA")}&endDate=${end?.toLocaleDateString("en-CA")}`, {
                headers: {
                    Authorization: "Bearer "+accessToken
                },
            })
            if(resp.ok){
                const cashFiltered = await resp.json()
                setFilteredCashList(cashFiltered)
                
                setFilteredGeneralReport(cashFiltered.reduce((acc: number, report: ICashed) => acc + report.total, 0))
                const ficheMediaFiltrata = (generalReport > 0 && cashFiltered.length > 0) 
                ? (generalReport / cashFiltered.length).toFixed(2).replace(".", ",") 
                : "0,00";
                setFilteredFicheMedia(ficheMediaFiltrata === "0" ? "0,00" : ficheMediaFiltrata)
                    
                setIsFilterActive(true)
            } else{
                throw new Error("Get clients error")
            }
        } catch (error){
            console.log(error)
        }

       }
       const filterCashWithPaymentMethod = async (start: Date | null, end: Date | null) => {

        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`http://localhost:8080/cash/report?startDate=${start?.toLocaleDateString("en-CA")}&endDate=${end?.toLocaleDateString("en-CA")}&paymentMethod=${filteredPaymentMethod}`, {
                headers: {
                    Authorization: "Bearer "+accessToken
                },
            })
            if(resp.ok){
                const cashFiltered = await resp.json()
                setFilteredCashList(cashFiltered)
                setFilteredGeneralReport(cashFiltered.reduce((acc: number, report: ICashed) => acc + report.total, 0))
                const ficheMediaFiltrata = (generalReport > 0 && cashFiltered.length > 0) 
                ? (generalReport / cashFiltered.length).toFixed(2).replace(".", ",") 
                : "0,00";
                setFilteredFicheMedia(ficheMediaFiltrata === "0" ? "0,00" : ficheMediaFiltrata)
                    
                setIsFilterActive(true)
            } else{
                throw new Error("Get clients error")
            }
        } catch (error){
            console.log(error)
        }
       }

       const applyFilters = async (start: Date | null, end: Date | null, paymentMethod: string | undefined) => {
        if (paymentMethod) {
            await filterCashWithPaymentMethod(start, end); // Use payment method filter
        } else {
            await filterCash(start, end); // Use date filter only
        }
        setShowModal(false); // Close the modal after applying filters
    };

       const filterLastMonth = async () => {
        const today = new Date()
        const startMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate() )
        const endMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate())

        try {
            const accessToken = localStorage.getItem("accessToken")
            const resp = await fetch(`http://localhost:8080/cash/report?startDate=${startMonth?.toLocaleDateString('en-CA')}&endDate=${endMonth?.toLocaleDateString('en-CA')}`, {
                headers: {
                    Authorization: "Bearer "+accessToken
                },
            })
            if(resp.ok){
                const cashFiltered = await resp.json()
                if (Array.isArray(cashFiltered)) {
               setFilteredLastMonthReport(cashFiltered.reduce((acc: number, report: ICashed) => acc + report.total, 0))
                }
            console.log("FILTER CASH", cashFiltered)
            console.log("TODAY",today)
            console.log("START MONTH",startMonth)
            console.log("END MONTH",endMonth)
            } else{
                throw new Error("Get clients error")
            }
        } catch (error){
            console.log(error)
        }
       }

       const getCurrentSemesterData = () => {
        const monthlyTotals = new Array(6).fill(0);

        cashList.forEach(item => {
            if (item.createdAt) {
                const createdAtDate = new Date(item.createdAt);
                const month = createdAtDate.getMonth(); 
    
                const today = new Date();
                const currentMonth = today.getMonth(); 
    
                
                if (currentMonth < 6) {
                    if (month >= 0 && month < 6) {
                        monthlyTotals[month] += item.total; 
                    }
                } else {
                    
                    if (month >= 6 && month <= 11) {
                        monthlyTotals[month - 6] += item.total; 
                    }
                }
            }
        });

        return monthlyTotals;
        
    };

    const getRevenueByStaff = () => {
        const staffRevenueMap: {[staffName: string]: number} = {}


        cashList.forEach((cash) => {
            const staffName = cash.appointment?.staff.name

            if(staffName && cash.appointment?.treatmentsList){
                const treatmentTotal = cash.appointment.treatmentsList.reduce((acc, treatment) => acc + treatment.price, 0)
                if(staffRevenueMap[staffName]){
                    staffRevenueMap[staffName] += treatmentTotal
                } else {
                    staffRevenueMap[staffName] = treatmentTotal
                }
            }
        })
        
        return staffRevenueMap
    }

      

    useEffect(() => {
        dispatch(getCash())
        filterLastMonth()
        
    }, [dispatch])

    useEffect(() => {
        setStaffRevenue(getRevenueByStaff())
    }, [cashList])



    const currentMonth = dayjs().month(); 
    let labelsMonth = [];


    if (currentMonth < 6) {
        labelsMonth = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno']; 
    } else {
        labelsMonth = ['Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']; 
    }

    const getTopThreeTreatments = () => {
        const treatmentRevenueMap: { [name: string]: number } = {};
    
        cashList.forEach(cashItem => {
            if (cashItem.appointment?.treatmentsList) {
                cashItem.appointment.treatmentsList.forEach(treatment => {
                    if (treatmentRevenueMap[treatment.name]) {
                        treatmentRevenueMap[treatment.name] += treatment.price;
                    } else {
                        treatmentRevenueMap[treatment.name] = treatment.price;
                    }
                });
            }
        });
    
        // Converti l'oggetto in un array, ordina in base al totale e prendi i primi 3
        const topTreatments = Object.entries(treatmentRevenueMap)
            .sort(([, a], [, b]) => b - a) // Ordina dal più alto al più basso
            .slice(0, 3); // Prendi solo i primi 3
    
        const labels = topTreatments.map(([name]) => name);
        const data = topTreatments.map(([, total]) => total);
    
        return { labels, data };
    };

    const handleClose = () => {
        setShowModal(false)
    }
    
    // Uso la funzione per ottenere i dati
    const { labels: topTreatmentLabels, data: topTreatmentData } = getTopThreeTreatments();
    


    const monthlyData = {
        labels: labelsMonth, 
        datasets: [
            {
                label: 'Entrate Mensili',
                data: getCurrentSemesterData(), 
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

   
    const treatmentData = {
        labels: topTreatmentLabels, 
        datasets: [
            {
                label: 'Entrate per Trattamenti',
                data: topTreatmentData, 
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

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

        <Container className='d-flex justify-content-between align-items-center my-5'>
        <h2 className='me-5'>Generale</h2>
        <Button onClick={()  => setShowModal(true)}>Filtri</Button>
        </Container>
        <Container className='p-5'>
        <Row className='gap-1 flex-nowrap justify-content-evenly'>
            <Col xs={12} md={2} className='rounded-3 shadow-sm mb-4'>
                <Container className='p-3'>
                    <h6>Entrate</h6>
                    <h1>€ {isFilterActive ? filteredGeneralReport : generalReport}</h1>
                </Container>
            </Col>
            <Col xs={12} md={2} className='rounded-3 shadow-sm mb-4'>
                <Container className='p-3'>
                    <h6>Ultimo mese</h6>
                    <h1>€ {filteredLastMonthReport}</h1>
                </Container>
            </Col>
            <Col xs={12} md={2} className='rounded-3 shadow-sm mb-4'>
                <Container className='p-3'>
                    <h6>Fiche Media</h6>
                    <h1>€ {isFilterActive ? filteredFicheMedia : ficheMedia}</h1>
                </Container>
            </Col>
            <Col xs={12} md={2} className='rounded-3 shadow-sm mb-4'>
                <Container className='p-3'>
                    <h6>Presenze totali</h6>
                    <h1>{isFilterActive ? filteredCashList.length : cashList.length}</h1>
                </Container>
            </Col>
        </Row>
        <Row className='gap-3 flex-nowrap p-0'>
            <Col xs={12} md={6} className='rounded-3 shadow-lg p-4'>
                <Container className='mt-3'>
                    <h6>Entrate Mensili</h6>
                    
                    <Line data={monthlyData} options={{ responsive: true,}} className='mt-5'/>
                    
                </Container>
            </Col>
            <Col xs={12} md={6} className='rounded-3 shadow-lg p-4'>
                <Container className='mt-3'>
                    <h6 >Trattamenti</h6>
                   
                    <Doughnut data={treatmentData} options={{ responsive: true }} />
                    
                </Container>
            </Col>
        </Row>
        <Container className='mt-5 rounded-4 shadow-lg mb-2'>
            {Object.entries(staffRevenue).map(([staffName, total]) => (
                
                <Row key={staffName}>
                    <Col className='py-3 px-4'>
                        <p>Nome</p>
                        <h5>{staffName}</h5>
                    </Col>
                    <Col className='p-3'> 
                        <p>Ricavi</p>
                        <h5>€ {total.toFixed(2)}</h5>
                    </Col>
                </Row>
            ))}
        </Container>
        </Container>
        <FilterReportModal 
        show={showModal} 
        handleClose={handleClose} 
        startDate={startDate} 
        setStartDate={setStartDate} 
        endDate={endDate}
        setEndDate={setEndDate}
        applyFilters={applyFilters}
        filteredPaymentMethod={filteredPaymentMethod}
        setFilteredPaymentMethod={setFilteredPaymentMethod}
        />
        </Container>
        </div>
  )
}

export default Report