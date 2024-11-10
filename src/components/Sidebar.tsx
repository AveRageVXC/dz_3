import React from 'react';
import './Sidebar.css';

const Sidebar: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
    return (
        <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <input type="text" placeholder="Search..." />
            <label>
                <input type="checkbox" />
                Только с ненулевым количеством
            </label>
            <select>
                <option value="">Выберите категорию</option>
                <option value="category1">Категория 1</option>
                <option value="category2">Категория 2</option>
            </select>
        </aside>
    );
};

export default Sidebar;