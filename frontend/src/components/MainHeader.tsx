import React, { useState } from 'react';
import AddModal from './AddModal';

export default function MainHeader() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
            <AddModal isOpen={isModalOpen} closeModal={closeModal} />
        </div>
    );
}
