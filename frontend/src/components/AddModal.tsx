// AddModal.tsx
import Dropdown from "./dropdown/Dropdown";
import { useEffect, useState } from 'react';

interface Todo {
    id: number;
    title: string;
    content: string;
    color: number;
    status: 'todo' | 'in-progress' | 'done';
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
    const [id, setId] = useState<number>(0);
    const [status, setStatus] = useState<'todo' | 'in-progress' | 'done'>('todo');

    // useEffect som triggas när färgen ändras, för att logga den uppdaterade färgen
    useEffect(() => {
        console.log(`Current color is ${color}`);
    }, [color]); // Körs när "color" uppdateras

    // Array
    const colors = [1,2,3,4,5];

    // Om modalen inte är öppen returnera null
    if (!isOpen) return null;

    // Skapa ny todo
async function handleAddTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !content) {
        alert("Title and/or content are required!");
        return;
    }

    const newTodo: Todo = {
        id,
        title,
        content,
        color,
        status, // Använd status från state
    };

    // Skicka information till backend
            try {
            const response = await fetch('http://localhost:3000/API/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    title: title,
                    content: content,
                    color: color,
                    status: status,
                }),
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('response ok', data);
                alert(`todo ${data.title} created`);
            } else {
                throw new Error('Something went wrong ¯\\_(ツ)_/¯');
            }
        } catch (error) {
            console.log('Error', error);
        }

    setId(id + 1);
    setTitle('')
    setContent('')
    setColor(1)
    setStatus('todo');

    addTodo(newTodo); // Skicka todo med korrekt status
    // Reset och stäng modal
    closeModal();
}


    const handleColorClick = (selectedColor: number) => {
        setColor(selectedColor);
    };

    const handleStatusSelect = (selectedStatus: 'todo' | 'in-progress' | 'done') => {
        setStatus(selectedStatus);
    };


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
                    <div 
                    className="color-selector-container"
>
                        {colors.map((colorValue) => (
                            <div
                                key={colorValue}
                                className={`color-${colorValue} color-pip ${color === colorValue ? 'color-selected' : ''}`}
                                onClick={() => handleColorClick(colorValue)}
                            ></div>
                        ))}
                    </div>
                    <div className="dropdown-container">
                    <Dropdown 
                        initialButtonText='Select Status' 
                        items={["To Do", "In Progress", "Done"]} 
                        onSelect={handleStatusSelect} // Lägg till denna rad
                    />

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
