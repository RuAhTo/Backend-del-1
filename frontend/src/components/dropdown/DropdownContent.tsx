import React from 'react'

interface childrenProps{
    children: React.ReactNode;
    open: boolean;
}

const DropdownContent: React.FC<childrenProps> = ({children, open}) => {
  return (
    <div className={`dropdown-content ${open ? "content-open" : null}`}>{children}</div>
  )
}

export default DropdownContent