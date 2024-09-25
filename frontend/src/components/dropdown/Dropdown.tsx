import DropdownButton from './DropdownButton';
import DropdownContent from './DropdownContent';
import DropdownItem from './DropdownItem'; // Se till att inkludera DropdownItem
import React, { useState, useEffect, useRef } from 'react';
import './Dropdown.css';

interface DropdownProps {
  initialButtonText: string;  // Ändrat från buttonText till initialButtonText
  items: string[];  // Lista med dropdown-alternativ
  onSelect: (status: 'TODO' | 'IN_PROGRESS' | 'DONE') => void;
}

const Dropdown: React.FC<DropdownProps> = ({ initialButtonText, items, onSelect }) => {
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
    
    // Anropa onSelect med det valda alternativet
    if (item === 'To Do') {
        onSelect('TODO');
    } else if (item === 'In Progress') {
        onSelect('IN_PROGRESS');
    } else if (item === 'Done') {
        onSelect('DONE');
    }
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
