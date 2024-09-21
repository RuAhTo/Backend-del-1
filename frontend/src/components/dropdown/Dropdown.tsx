import DropdownButton from './DropdownButton';
import DropdownContent from './DropdownContent';
import DropdownItem from './DropdownItem'; // Se till att inkludera DropdownItem
import React, { useState, useEffect, useRef } from 'react';
import './Dropdown.css';

interface DropdownProps {
  initialButtonText: string;  // Ändrat från buttonText till initialButtonText
  items: string[];  // Lista med dropdown-alternativ
}

const Dropdown: React.FC<DropdownProps> = ({ initialButtonText, items }) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>(initialButtonText);  // Använd förvalt buttonText

  const toggleDropdown = () => {
    setOpen((open) => !open);
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);  // Uppdatera valt alternativ
    setOpen(false);  // Stäng dropdown-listan
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <DropdownButton toggle={toggleDropdown} open={open}>
        {selectedItem}  {/* Visa valt alternativ */}
      </DropdownButton>
      <DropdownContent open={open}>
        {items.map((item) => (
          <DropdownItem key={item} onClick={() => handleItemClick(item)}>
            {item}
          </DropdownItem>
        ))}
      </DropdownContent>
    </div>
  );
};

export default Dropdown;
