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
        <Button className='me-auto' onClick={toggleSidebar}><List /></Button>
        <span onClick={toggleDataPicker} style={{cursor: "pointer"}}>{formattedDate.slice(0,3).toUpperCase()}</span>
                {isDatePickerOpen && 
                <DatePicker
                selected={currentDate}
                onChange={handleDatechange}
                inline
                />}

        <Button onClick={() => onNavigate("PREV")} className='border-start rounded-0'><ArrowLeft/></Button>
        <Button onClick={() => onNavigate("NEXT")} className='border-end rounded-0'><ArrowRight/></Button>

        <Button onClick={handleToday}>Oggi</Button>


        <section className='sectionToolbar '>
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