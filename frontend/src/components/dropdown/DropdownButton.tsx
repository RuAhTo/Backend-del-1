import React from 'react'
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import './Dropdown.css'

interface childrenProps{
    children: React.ReactNode;
    open: boolean;
    toggle: () => void ;
}


const DropdownButton: React.FC<childrenProps> = ({children, open, toggle}) => {
  return (
    <div onClick={toggle} className={`dropdown-btn ${open ? "button-open" : null}`}>
        {children}
        <span className='toggle-icon'>
            {open ? <FaChevronUp/> : <FaChevronDown/>}
        </span>
    </div>  
  )
}

export default DropdownButton