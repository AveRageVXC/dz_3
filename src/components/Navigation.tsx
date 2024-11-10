import React from 'react';
import './Navigation.css';

const Navigation: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
    return (
        <nav className="navigation">
            <button onClick={toggleSidebar} className="nav-button">Toggle Sidebar</button>
            <button className="nav-button">Товары</button>
            <button className="nav-button">Склады</button>
            <button className="nav-button">О системе</button>
            <button className="nav-button">Личная страница пользователя</button>
        </nav>
    );
};

export default Navigation;