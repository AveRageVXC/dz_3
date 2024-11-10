import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import './App.css';

const App: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="app">
            <Navigation toggleSidebar={toggleSidebar} />
            <div className="container">
                <Sidebar isOpen={isSidebarOpen} />
                <ProductList />
            </div>
        </div>
    );
};

export default App;
