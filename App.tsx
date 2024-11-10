import React from 'react';
import ProductList from './src/components/ProductList';
import Navigation from './src/components/Navigation';
import Sidebar from './src/components/Sidebar';

const App: React.FC = () => {
    return (
        <div className="app">
            <Navigation />
            <div className="container">
                <Sidebar />
                <ProductList />
            </div>
        </div>
    );
};

export default App;