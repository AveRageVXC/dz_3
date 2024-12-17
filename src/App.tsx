import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import { Box } from '@mui/material';
import productsData from './data/products.json';

const App: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [filters, setFilters] = useState({ searchText: '', nonZeroQuantity: false, category: '' });
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const uniqueCategories = Array.from(new Set(productsData.map(product => product.category)));
        setCategories(uniqueCategories);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleFilter = (newFilters: { searchText: string, nonZeroQuantity: boolean, category: string }) => {
        setFilters(newFilters);
    };

    return (
        <Box className="app">
            <Navigation toggleSidebar={toggleSidebar} />
            <Box sx={{ display: 'flex'}}>
                <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} onFilter={handleFilter} categories={categories} />
                <Box className="container" sx={{marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s', flexGrow: 1 }}>
                    <ProductList filters={filters} />
                </Box>
            </Box>
        </Box>
    );
};

export default App;