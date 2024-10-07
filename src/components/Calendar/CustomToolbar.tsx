import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { ArrowLeft, ArrowRight, List} from 'react-bootstrap-icons';
import { NavigateAction, View } from "react-big-calendar"; 
import "./Agenda.css"
import Sidebar from '../Sidebar/Sidebar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


interface CustomToolbarProps {
    label: string;
    onNavigate: (action: NavigateAction, date?: Date) => void;
    onView: (view: View) => void;
    handleToday: () => void;
    setSelectedStaff: (staff: string) => void;
    selectedStaff: string;
    setCurrentDate: (currentDate: Date) => void;
    currentDate: Date;
    formattedDate: string;
    staff: { id: number; name: string }[];
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ onNavigate, currentDate, setCurrentDate, formattedDate, handleToday, selectedStaff, setSelectedStaff, staff,  }) => {

    const [isOpen, setIsOpen] = useState(false); 
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

    const handleDatechange = (date: Date | null) =>{
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


  return (
    
    <div className='custom-toolbar border-start'>
        {isOpen ? <Sidebar/> : ""}
        <Button className='me-auto menuBtn' onClick={toggleSidebar}><List /></Button>
        

        <Button onClick={() => onNavigate("PREV")} className='border-start rounded-0 arrowLeft'><ArrowLeft/></Button>
        <div style={{ display: 'block', position: 'relative', marginTop: '5px' }} className='d-flex justify-content-center align-items-center'>
        <p onClick={toggleDataPicker} style={{cursor: "pointer"}} className=' text-center d-flex flex-column align-items-center p-2'>{formattedDate.split(" ")[0]}{" "}{formattedDate.split(" ")[1].slice(0,3).toUpperCase()}</p>
        
                {isDatePickerOpen && 
                <div style={{position: 'absolute', 
                    top: '100%', 
                    left: 0,
                    zIndex: 3, 
                    width: "100%"}}>
                <DatePicker
                className='datePicker'
                selected={currentDate}
                onChange={handleDatechange}
                inline
                popperMoifiers={{preventOverflow: {
                    enabled: true,
                    options: {
                        padding: 10,
                    },
                }}}
                />
                </div>}
        </div>
        <Button onClick={() => onNavigate("NEXT")} className='border-end rounded-0 arrowRight'><ArrowRight/></Button>
        <Button onClick={handleToday} className='today'>Oggi</Button>

        
        <section className='sectionToolbar  w-25'>
        <select onChange={handleStaffChange} value={selectedStaff} className='rounded-5 px-2 py-1'>
            <option value="">Tutti</option>
            {staff.map(member => (
                <option key={member.id} value={member.name}>{member.name}</option>
            ))}
        </select>
        </section>
    </div>
        
  )
}

export default CustomToolbar