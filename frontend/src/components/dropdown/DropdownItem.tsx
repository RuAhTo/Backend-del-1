import React from 'react'
import "./Dropdown.css"

interface childrenProps{
    children: React.ReactNode;
    onClick: () => void;
}

const DropdownItem: React.FC<childrenProps> = ({children, onClick}) => {
  return (
    <div className={`dropdown-item`} onClick={onClick}>{children}</div>
  )
}

export default DropdownItem