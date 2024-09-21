import React, { useState } from 'react';
import AddModal from './AddModal';

export default function MainHeader() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Din addTodo-funktion som hanterar tillägg av todos
    const addTodo = (todo: { title: string; content: string; status: string }) => {
        console.log('New Todo:', todo);
        // Här kan du lägga till logiken för att spara todos
    };

    return (
        <div className="main-header">
            <div>
                <h4>Make it happen!</h4>
            </div>
            <div className="main-header-btn-container">
                <button onClick={openModal}>+</button>
                <button className="header-btn">Account</button>
                <button className="header-btn">?</button>
            </div>
            <AddModal isOpen={isModalOpen} closeModal={closeModal} addTodo={addTodo} />
        </div>
    );
}
