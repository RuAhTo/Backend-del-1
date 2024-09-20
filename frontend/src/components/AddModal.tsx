// AddModal.tsx
import Dropdown from "./dropdown/Dropdown";
import DropdownItem from "./dropdown/DropdownItem";
import { useState } from 'react';

interface AddModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

export default function AddModal({ isOpen, closeModal }: AddModalProps) {

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    
    const [status, setStatus] = useState<'todo' | 'in-progress' | 'done'>('todo');
    
    const items: string[] = ["To Do", "In Progress", "Done"];

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                <h2>Create a Todo</h2>
                <button onClick={closeModal} className="close-modal-btn">X</button>
                </div>
                <form className="add-form">
                    <div className="title-input-container">
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder="Title"
                        />
                    </div>
                    <div className="content-input-container">
                        <input 
                        type="text"
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        placeholder="What do you need to do?"
                        />
                    </div>
                    <div className="dropdown-container">
                    <Dropdown
                        buttonText="Status"
                        content={
                        <>
                            {items.map((item) => (
                                <DropdownItem key={item} onClick={() => setStatus(item.toLowerCase().replace(" ", "-"))}>
                                    {item}
                                </DropdownItem>
                            ))}
                        </>}  
                    />
                    </div>
                    <div className="todo-submit-btn-container">
                        <button type="submit" className="submit-btn">
                            Add Todo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
