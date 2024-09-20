import DropdownButton from './DropdownButton'
import DropdownContent from './DropdownContent'
import React, { useState, useEffect, useRef } from 'react'
import './Dropdown.css'


interface DropdownProps {
    buttonText: string;
    content: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ buttonText, content }) => {

    const [open, setOpen] = useState(false);
    
    const toggleDropdown = () => {
        setOpen((open) => !open);
    };

    const dropdownRef = useRef<HTMLDivElement | null>(null);  // Typa ref korrekt

    useEffect(() => {
        const handler = (event: MouseEvent) => {  // Typa event som MouseEvent
            if (dropdownRef.current && 
                !dropdownRef.current.contains(event.target as Node)) {  // Typa target som Node
                setOpen(false);
            }
        };
    
        // Lägg till event listener
        document.addEventListener('mousedown', handler);
    
        // Städa upp event listener när komponenten unmountas
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, [dropdownRef]);

  return (
    <div>
        <div className='dropdown' ref={dropdownRef}>
        <DropdownButton toggle={toggleDropdown} open={open}>
            {buttonText}
        </DropdownButton>
        <DropdownContent open={open}>
            {content}
        </DropdownContent>
    </div>
    </div>
  );
};


export default Dropdown