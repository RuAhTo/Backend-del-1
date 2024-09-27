import Dropdown from "../dropdown/Dropdown";
import { useEffect, useState } from 'react';
import { FaWindowClose } from "react-icons/fa";

import './AddModal.css'

interface Todo {
    id: number;
    title: string;
    content: string;
    color: number;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    authorId: number | null; // Ändra till userId för att matcha din backend
}

interface AddModalProps {
    isOpen: boolean;
    closeModal: () => void;
    addTodo: (todo: Todo) => void;
}

    export default function AddModal({ isOpen, closeModal, addTodo }: AddModalProps) {

    // States
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [color, setColor] = useState<number>(1);
    const [status, setStatus] = useState<'TODO' | 'IN_PROGRESS' | 'DONE'>('TODO');

    // useEffect som triggas när färgen ändras, för att logga den uppdaterade färgen
    useEffect(() => {
        console.log(`Current color is ${color}`);
    }, [color]); // Körs när "color" uppdateras

    // Array
    const colors = [1, 2, 3, 4, 5];

    // Om modalen inte är öppen returnera null
    if (!isOpen) return null;

    // Skapa ny todo
    async function handleAddTodo(e: React.FormEvent) {
        e.preventDefault();
        if (!title) {
            alert("Title is required!");
            return;
        }

        // Hämta userId från localStorage
        const authorId = localStorage.getItem('userId');

        const newTodo: Todo = {
            id: Date.now(), // Generera ett unikt ID (eller hantera det på annat sätt om du har en backend)
            title,
            content,
            color,
            status, // Använd status från state
            authorId: authorId ? parseInt(authorId) : null, // Konvertera userId till ett heltal om det finns
        };

        // Skicka information till backend
        try {
            const response = await fetch('http://localhost:3000/dnd_todo/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo), // Använd newTodo direkt
            });

            if (response.ok) {
                const data = await response.json();
                console.log('response ok', data);
                alert(`Todo "${data.title}" created`);
                addTodo(newTodo); // Skicka todo med korrekt status
            } else {
                throw new Error('Something went wrong ¯\\_(ツ)_/¯');
            }
        } catch (error) {
            console.log('Error', error);
        }

        // Reset form
        setTitle('');
        setContent('');
        setColor(1);
        setStatus('TODO');
        closeModal(); // Stäng modal
    }

    const handleColorClick = (selectedColor: number) => {
        setColor(selectedColor);
    };

    const handleStatusSelect = (selectedStatus: 'TODO' | 'IN_PROGRESS' | 'DONE') => {
        setStatus(selectedStatus);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Create a Todo</h2>
                    <button onClick={closeModal} className="close-modal-btn"><FaWindowClose /></button>
                </div>
                <form className="add-form" onSubmit={handleAddTodo}>
                    <div className="input-container">
                        <label htmlFor="">Title</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                    </div>
                    <div className="input-container">
                    <label htmlFor="">What needs to get done?</label>
                        <input 
                            type="text"
                            value={content} 
                            onChange={(e) => setContent(e.target.value)} 
                            placeholder="What do you need to do?"
                        />
                    </div>
                    <div>
                        <div className="input-container">
                            <label htmlFor="">Color</label>
                        </div>
                        <div className="color-selector-container">
                            {colors.map((colorValue) => (
                                <div
                                    key={colorValue}
                                    className={`color-${colorValue} color-pip ${color === colorValue ? 'color-selected' : ''}`}
                                    onClick={() => handleColorClick(colorValue)}
                                ></div>
                                
                            ))}
                        </div>
                    </div>
                    <div className="dropdown-container">
                        <Dropdown 
                            initialButtonText='Select Status' 
                            items={["To Do", "In Progress", "Done"]} 
                            onSelect={handleStatusSelect} 
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
