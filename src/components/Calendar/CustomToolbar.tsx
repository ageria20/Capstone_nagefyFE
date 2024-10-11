import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { ArrowLeft, ArrowRight, List, X} from 'react-bootstrap-icons';
import { NavigateAction, View } from "react-big-calendar"; 
import "./Agenda.css"
import Sidebar from '../Sidebar/Sidebar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToggleSidebarAction } from '../../redux/actions/action';


import { useAppDispatch, useAppSelector } from '../../redux/store/store';


interface CustomToolbarProps {
    label: string;
    onNavigate: (action: NavigateAction, date?: Date) => void;
    onView: (view: View) => void;
    handleToday: () => void;
    setSelectedStaff: (staff: IStaff) => void;
    selectedStaff: IStaff;
    setCurrentDate: (currentDate: Date) => void;
    currentDate: Date;
    formattedDate: string;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ onNavigate, currentDate, setCurrentDate, formattedDate, handleToday, selectedStaff, setSelectedStaff  }) => {

    const dispatch = useAppDispatch()
    const isOpen = useAppSelector((state) => state.sidebar.isOpen)
    const staffs = useAppSelector((state) => state.staffList.staffs)

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const toggleSidebar = () => {
        dispatch({ type: 'TOGGLE_SIDEBAR' } as ToggleSidebarAction);
    };

    const handleDateChange = (date: Date | null) =>{
        if(date){
        setCurrentDate(date)
    }
        setIsDatePickerOpen(false)
     }
  
    const handleStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStaff(e.target.value);
      };
      const toggleDataPicker = () =>{
        setIsDatePickerOpen(!isDatePickerOpen)
     }
     const getTime = () =>{
        const today = new Date()
        const time = today.toLocaleString("it", { hour: '2-digit', minute: '2-digit'});
        return time
      }


  return (
    <>
    <div className='custom-toolbar flex-1 border-start  rounded-4 shadow-lg mt-2 p-2'>
        <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? <X/>:<List />} 
      </button>
        <Sidebar/> 
        <p className='mb-0 px-2'>{getTime()}</p>
        

        <Button onClick={() => onNavigate("PREV")} className='border-start rounded-0 arrowLeft'><ArrowLeft/></Button>
        <div style={{ marginTop: '5px' }} className='d-flex justify-content-center align-items-center position-relative'>
        <p onClick={toggleDataPicker} style={{cursor: "pointer"}} className=' text-center d-flex flex-column justify-content-center mb-0 align-items-center p-2'>{formattedDate.split(" ")[0]}{" "}{formattedDate.split(" ")[1].slice(0,3).toUpperCase()}</p>
        
                {isDatePickerOpen && 
                <div style={{position: 'absolute', 
                    top: '100%', 
                    left: 0,
                    zIndex: 3, 
                    width: "100%", 
                    transform: "translate(-100%)"
                    }}>
                <DatePicker
                className='datePicker'
                selected={currentDate}
                onChange={handleDateChange}
                inline
                />
                </div>}
        </div>
        <Button onClick={() => onNavigate("NEXT")} className='border-end rounded-0 arrowRight'><ArrowRight/></Button>
        <Button onClick={handleToday} className='today'>Oggi</Button>

        
    </div>
        <section className='sectionToolbar my-2'>
        <select onChange={handleStaffChange} value={selectedStaff} className='rounded-5 px-2 py-1 w-sm-100 me-auto'>
            <option value="">Tutti</option>
            {staffs.map(member => (
                <option key={member.id} value={member.name}>{member.name}</option>
            ))}
        </select>
        </section>
        </>
  )
}

export default CustomToolbar