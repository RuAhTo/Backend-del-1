// AddModal.tsx
import Dropdown from "./dropdown/Dropdown";
import DropdownItem from "./dropdown/DropdownItem";
import { useState } from 'react';

interface Todo {
    title: string;
    content: string;
    status: 'todo' | 'in-progress' | 'done';
}

interface AddModalProps {
    isOpen: boolean;
    closeModal: () => void;
    addTodo: (todo:Todo) => void;
}

export default function AddModal({ isOpen, closeModal, addTodo }: AddModalProps) {

    // States
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [status, setStatus] = useState<'todo' | 'in-progress' | 'done'>('todo');

    // Array
    const items: string[] = ["To Do", "In Progress", "Done"];

    // Om modalen inte är öppen returnera null
    if (!isOpen) return null;

    // Skapa ny todo
    function handleAddTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !content){
        alert("Title and/or content are required!")
        return;
    }

    const newTodo:Todo = {
        title,
        content,
        status,
    };

    addTodo(newTodo);

    setTitle('')
    setContent('')
    setStatus('todo');
    closeModal();

    }

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
                    <div className="color-selector-container">
                        <div className="color-1 color-pip"></div>
                        <div className="color-2 color-pip color-selected"></div>
                        <div className="color-3 color-pip"></div>
                        <div className="color-4 color-pip"></div>
                        <div className="color-5 color-pip"></div>
                    </div>
                    <div className="dropdown-container">
                        <Dropdown initialButtonText="Select Status" items={["To Do", "In Progress", "Done"]} />
                    </div>
                    <div className="todo-submit-btn-container">
                        <button type="submit" className="submit-btn" onClick={handleAddTodo}>
                            Add Todo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
