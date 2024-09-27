import React, { useState } from 'react';
import { FaPlusCircle } from "react-icons/fa";
import AddModal from './Modal/AddModal';
import AccountModal from './Modal/AccountModal';
import '../pages/MainPage.css'

interface MainHeaderProps {
    addTodo: (todo: { title: string; content: string; color: number; status: string }) => void;
    accountProps: (account: { title: string }) => void;
}


export default function MainHeader({ addTodo, accountProps }: MainHeaderProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isAccountModalOpen, setIsAccountModalOpen] = useState<boolean>(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openAccountModal = () => setIsAccountModalOpen(true);
    const closeAccountModal = () => setIsAccountModalOpen(false);

    return (
        <div className="main-header">
            <div>
                <h4></h4>
            </div>
            <div className="main-header-btn-container">
                <button className="header-btn" onClick={openModal}><FaPlusCircle className='btn-icon'/></button>
                <button className="header-btn" onClick={openAccountModal}>Account</button>
                {/* <button className="header-btn"><FaQuestionCircle className='btn-icon'/></button> */}
            </div>
            <AddModal isOpen={isModalOpen} closeModal={closeModal} addTodo={addTodo} />
            <AccountModal isOpen={isAccountModalOpen} closeModal={closeAccountModal} accountProps={accountProps} />
        </div>
    );
}
