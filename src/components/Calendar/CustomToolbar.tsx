import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { ArrowLeft, ArrowRight, List} from 'react-bootstrap-icons';
import { NavigateAction, View } from "react-big-calendar"; 
import "./Agenda.css"
import Sidebar from '../Sidebar/Sidebar';


interface CustomToolbarProps {
    label: string;
    onNavigate: (action: NavigateAction, date?: Date) => void;
    onView: (view: View) => void;
    handleToday: () => void;
    
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ onNavigate, onView, handleToday  }) => {

    const [isOpen, setIsOpen] = useState(false);  // Stato per gestire apertura/chiusura sidebar

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  
   ;


  return (
    <>
    <div className='custom-toolbar'>
        {isOpen ? <Sidebar/> : ""}
        <Button className='me-auto' onClick={toggleSidebar}><List /></Button>

        <Button onClick={() => onNavigate("PREV")} ><ArrowLeft/></Button>
        <Button onClick={() => onNavigate("NEXT")} ><ArrowRight/></Button>

        <Button onClick={handleToday}>Oggi</Button>


      <Button onClick={() => onView("week")}>Settimana</Button>
      <Button onClick={() => onView("day")}>Giorno</Button>
    </div>
       
        </>
  )
}

export default CustomToolbar