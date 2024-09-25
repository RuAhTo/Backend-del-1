import React, { useState } from 'react';
import { FaPlusCircle, FaQuestionCircle } from "react-icons/fa";
import AddModal from './Modal/AddModal';
import '../pages/MainPage.css'

interface MainHeaderProps {
    addTodo: (todo: { title: string; content: string; color: number; status: string }) => void;
}

export default function MainHeader({ addTodo }: MainHeaderProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="main-header">
            <div>
                <h4>Make it happen!</h4>
            </div>
            <div className="main-header-btn-container">
                <button className="header-btn" onClick={openModal}><FaPlusCircle className='btn-icon'/></button>
                <button className="header-btn">Account</button>
                <button className="header-btn"><FaQuestionCircle className='btn-icon'/></button>
            </div>
            <AddModal isOpen={isModalOpen} closeModal={closeModal} addTodo={addTodo} />
        </div>
    );
}
